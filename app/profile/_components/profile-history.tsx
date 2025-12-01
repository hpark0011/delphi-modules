"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format, isSameYear, isToday, isYesterday } from "date-fns";
import { atom, useAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useTransitionRouter } from "next-view-transitions";
import {
  type Dispatch,
  type SetStateAction,
  type SVGAttributes,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/lib/utils";
import type {
  ConversationMedium,
  HistoricalConversation,
} from "@delphi/schemas";
import { trpcRaw } from "@delphi/trpc/client";
import {
  ArrowFillIcon,
  Bars3Icon,
  BubbleAnnotateIcon,
  CallIcon,
  ChainLinkIcon,
  ChatIcon as ChatAltIcon,
  ChatIcon,
  CircleHalfFill,
  CirclePlusIcon,
  CrossLargeIcon,
  EmailIcon,
  EyeClosedIcon,
  PencilIcon,
  PlaceholderIcon,
  ThreeDotsIcon,
  TrashIcon,
  VideoOnIcon,
  WindowAppIcon,
} from "@icons";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  LoadingSpinner,
  useResponsiveDrawer,
} from "@delphi/ui";
import { LogoIcon } from "@/icons";
import { LogoWithText } from "@delphi/views";

import {
  fetchConversationHistory,
  setConversationCookie,
  updateConversationTitle,
} from "@/lib/api/conversation";
import {
  shareConversation,
  unshareConversation,
} from "@/lib/api/conversation/share";
import { useUser } from "@/lib/utils/useUser";

const focusAtom = atom(false);

interface ProfileHistoryProps {
  className?: string;
  slug: string;
}

export function ProfileHistory({ className, slug }: ProfileHistoryProps) {
  const [_focus, setFocus] = useAtom(focusAtom);
  const [history, setHistory] = useAtom(historyAtom);

  const { data: user, isLoading } = useUser();

  const [open, setOpen] = useState(false);

  // Fetch history when user is available
  useEffect(() => {
    if (user && !history) {
      fetchConversationHistory({ slug }).then((h) => {
        setHistory(h);
      });
    }
  }, [user, slug, history, setHistory]);

  const conversationCount = history?.length ?? 0;

  // Don't render anything while loading to avoid jarring transitions
  if (isLoading) {
    return null;
  }

  return (
    <Drawer
      direction='left'
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        setFocus(false);
      }}
    >
      <AnimatePresence mode='wait'>
        {conversationCount > 0 && user ? (
          <motion.div
            key='drawer-trigger-wrapper'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <DrawerTrigger
              className={cn(
                "delphi-header-logo 🔒 w-fit focus-visible:outline-none",
                className
              )}
            >
              <div className='relative'>
                <ChatAltIcon className='text-orange-8 hover:text-orange-10 block size-5 transition-colors' />

                <AnimatePresence>
                  {conversationCount > 0 && (
                    <motion.span
                      key={conversationCount}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className='absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-10 px-1 text-[10px] font-medium text-white'
                    >
                      {conversationCount > 99 ? "99+" : conversationCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </DrawerTrigger>
          </motion.div>
        ) : (
          <motion.div
            key='create-button-wrapper'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Link
              href={user ? "/" : "/login"}
              className={cn(
                "transition-colors items-center gap-1.5 cursor-none",
                className
              )}
            >
              <Button
                variant='ghost'
                className='transition-colors text-base font-normal tracking-[-0.015em] text-sand-10 hover:text-sand-12 hover:bg-sand-10/5  hidden md:flex '
              >
                Create your Delphi
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <DrawerContent className='bottom-0 left-0 top-0 mt-0 rounded-none pt-6 sm:mr-24 sm:max-w-sm [&>div]:flex [&>div]:flex-col [&_#nub]:hidden'>
        <header className='mx-4 mb-3 mt-1 flex items-center justify-between pl-1.5 pr-3.5 sm:-my-1 sm:h-8'>
          <LogoWithText
            className='delphi-header-logo 🔒'
            enableDelphiLogo
            clone={{ slug, orgs: [] } as any}
          />

          <DrawerClose className='ml-auto'>
            <CrossLargeIcon className='text-sand-9 hover:text-sand-11 size-4 transition-colors' />
          </DrawerClose>
        </header>

        <ActionHistory slug={slug} />
      </DrawerContent>
    </Drawer>
  );
}

const historyAtom = atom<HistoricalConversation[] | null>(null);

function ActionHistory({ slug }: { slug: string }) {
  const [history, setHistory] = useAtom(historyAtom);

  const refreshHistory = async () => {
    const history = await fetchConversationHistory({
      slug,
    });

    setHistory(history);
  };

  const start = async () => {
    const conversation = await trpcRaw.conversation.setupNewConversation.mutate(
      {
        slug,
        medium: "WEB",
      }
    );

    if (conversation) {
      await setConversationCookie({
        conversationId: conversation.id,
        slug,
      });
    }

    const params = new URLSearchParams(window.location.search);
    window.location.href = `/${slug}/talk?${params.toString()}`;
  };

  const { data: user } = useUser();

  useEffect(() => {
    if (user) {
      refreshHistory();
    }
  }, [user]);

  const groupedHistory = useMemo(() => {
    if (!history) return null;

    return history
      .toSorted((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);

        return dateB.getTime() - dateA.getTime();
      })
      .reduce(
        (acc, item) => {
          const date = new Date(item.updatedAt);
          let dateString = format(date, "MMMM d, yyyy");

          if (isToday(date)) {
            dateString = "Today";
          } else if (isYesterday(date)) {
            dateString = "Yesterday";
          } else if (isSameYear(date, new Date())) {
            dateString = format(date, "MMMM d");
          }

          if (!acc[dateString]) {
            acc[dateString] = [];
          }
          acc[dateString]?.push(item);
          return acc;
        },
        {} as Record<string, HistoricalConversation[]>
      );
  }, [history]);

  if (!user) {
    return null;
  }

  if (!groupedHistory) {
    return (
      <div className='flex h-full items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='relative mt-3 flex-1 overflow-y-auto overflow-x-visible px-6 pt-3'>
      <button
        type='button'
        onClick={() => {
          toast.promise(start, {
            loading: "Starting new conversation...",
            success: "Conversation created!",
            error: (e) => `Failed to create conversation: ${e.message}`,
          });
        }}
        className='text-sand-12 hover:bg-sand-4 -mx-3 box-content flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm font-medium transition-colors focus:outline-none focus-visible:ring focus-visible:ring-offset-4'
      >
        <CirclePlusIcon className='text-sand-9 size-4 flex-none' />
        <span>New Conversation</span>
      </button>

      <div className='mt-6 space-y-6 pb-12'>
        {Object.entries(groupedHistory).map(([date, items]) => (
          <div key={date}>
            <h4 className='text-sand-11 mb-1.5 text-xs font-medium'>{date}</h4>
            {items.map((props) => (
              <HistoryItem slug={slug} key={props.id} {...props} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoryItem({
  id,
  title,
  medium,
  shareId,
  slug,
}: HistoricalConversation & {
  slug: string;
}) {
  const [open, setOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);

  const [menu, setMenu] = useState(false);
  const [, setFocus] = useAtom(focusAtom);

  const modify = updateConversationTitle;
  const unshare = unshareConversation;
  const share = shareConversation;

  const router = useTransitionRouter();

  const icons: Partial<
    Record<
      ConversationMedium,
      React.ComponentType<SVGAttributes<SVGSVGElement>>
    >
  > = {
    WEB: BubbleAnnotateIcon,
    API: CircleHalfFill,
    EMAIL: EmailIcon,
    SMS: ChatIcon,
    WHATSAPP: ChatIcon,
    EMBED: WindowAppIcon,
    BROWSER_VOICE: CallIcon,
    PHONE_VOICE: CallIcon,
    VIDEO: VideoOnIcon,
  };

  async function archive({
    id,
    title,
  }: Pick<HistoricalConversation, "id" | "title">) {
    const t = toast.loading("Archiving conversation...");

    try {
      await modify({
        id,
        title,
        updatedAt: new Date().toISOString(),
        hidden: true,
      });

      toast.success("Conversation archived!", {
        id: t,
      });

      router.refresh();
    } catch (e) {
      toast.error(`Failed to archive conversation`, {
        id: t,
      });

      throw e;
    }
  }

  const getShareUrl = (shareId: string) => {
    if (medium === "BROWSER_VOICE") {
      return `https://www.delphi.ai/${slug}/call/shared/${shareId}`;
    }

    return `https://www.delphi.ai/${slug}/talk/conversation/shared/${shareId}`;
  };

  async function shareUserConversation() {
    try {
      const { shared } = await share({ id });

      const shareUrl = getShareUrl(shared.id);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl);
        toast.success("Copied Share Link");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("Copied Share Link");
      }

      router.refresh();
    } catch (e) {
      toast.error("Failed to share conversation");

      throw e;
    }
  }

  async function unshareUserConversation() {
    if (!shareId) return;

    try {
      await unshare(shareId);
      router.refresh();
    } catch (e) {
      toast.error("Failed to unshare conversation");

      throw e;
    }
  }

  const Icon = icons[medium] ?? PlaceholderIcon;

  const Name = title?.trim() ? (
    <>&ldquo;{title.trim()}&rdquo;</>
  ) : (
    "Conversation"
  );

  return (
    <div className='flex items-center justify-between gap-1'>
      <motion.button
        className='text-sand-11 hover:text-sand-12 hover:bg-sand-4 group -ml-3 box-content flex w-full min-w-0 items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm font-medium transition-colors focus:outline-none focus-visible:ring focus-visible:ring-offset-4'
        onClick={() => {
          router.push(`/${slug}/talk/conversation/${id}`);
        }}
      >
        <Icon className='text-sand-8 group-hover:text-sand-9 size-4 flex-none transition-colors' />

        <h3 className='truncate font-medium'>
          {title?.trim() || "Conversation"}
        </h3>
      </motion.button>

      <RenameDialog
        onSuccess={() => router.refresh()}
        setOpen={setOpen}
        title={title}
        open={open}
        id={id}
      />

      <ArchiveConfirmDialog
        open={archiveDialogOpen}
        onOpenChange={setArchiveDialogOpen}
        onConfirm={() => archive({ id, title })}
      />

      <DropdownMenu
        open={menu}
        onOpenChange={(o) => {
          setMenu(o);
          setFocus(o);
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button
            className='delphi-history-menu-item-trigger 🔒 hover:bg-sand-4 hover:text-sand-12 text-sand-9 !rounded-md p-2'
            variant='ghost'
            size='none'
          >
            <ThreeDotsIcon className='size-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end' className='w-60 py-1.5'>
          <DropdownMenuItem
            className='delphi-rename-trigger 🔒 flex items-center gap-2'
            onClick={() => setOpen(true)}
          >
            <PencilIcon className='size-4 flex-none' />
            <span className='truncate'>Rename {Name}</span>
          </DropdownMenuItem>

          {shareId ? <DropdownMenuSeparator /> : null}

          <DropdownMenuItem
            onClick={shareUserConversation}
            className='delphi-share-trigger 🔒 flex items-center gap-2'
          >
            <ChainLinkIcon className='size-4 flex-none' />
            {shareId ? "Copy Link" : "Share..."}
          </DropdownMenuItem>

          {shareId ? (
            <DropdownMenuItem
              onClick={unshareUserConversation}
              className='delphi-unshare-trigger 🔒 flex items-center gap-2'
            >
              <EyeClosedIcon className='size-4 flex-none' />
              Unshare
            </DropdownMenuItem>
          ) : null}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className='delphi-archive-trigger 🔒 flex items-center gap-2'
            onClick={() => setArchiveDialogOpen(true)}
          >
            <TrashIcon className='size-4' />
            <span>Archive</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function RenameDialog({
  id,
  title,
  open,
  setOpen,
  onSuccess,
}: Pick<HistoricalConversation, "id" | "title"> & {
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
  open: boolean;
}) {
  const Components = useResponsiveDrawer();

  return (
    <Components.Root
      setBackgroundColorOnScale={false}
      repositionInputs={false}
      onOpenChange={setOpen}
      open={open}
    >
      <Components.Content>
        <Components.Header>
          <Components.Title>Rename &ldquo;{title}&rdquo;</Components.Title>
        </Components.Header>

        <div className='m-4'>
          <div className='space-y-3'>
            <RenameForm
              id={id}
              title={title}
              onSuccess={() => {
                setOpen(false);
                onSuccess();
              }}
            />
          </div>
        </div>
      </Components.Content>
    </Components.Root>
  );
}

type RenameFormSchema = {
  title: string;
};

function RenameForm({
  id,
  title,
  onSuccess,
}: Pick<HistoricalConversation, "id" | "title"> & {
  onSuccess: () => void;
}) {
  const modify = updateConversationTitle;
  const [pending, startTransition] = useTransition();

  const form = useForm<RenameFormSchema>({
    resolver: zodResolver(
      z.object({
        title: z.string().min(1).max(100),
      })
    ),
    defaultValues: {
      title: title?.trim() ?? "Conversation",
    },
  });

  function onSubmit({ title }: RenameFormSchema) {
    startTransition(async () => {
      try {
        await modify({
          id,
          title,
          updatedAt: new Date().toISOString(),
        });

        onSuccess();
      } catch (error) {
        toast.error("Failed to rename conversation");

        throw error;
      }
    });
  }

  return (
    <Form {...form}>
      <form
        noValidate
        className='border-sand-5 bg-sand-2 focus-within:border-sand-7 flex rounded-full border transition'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input
                  className='w-full px-4 py-3 focus:ring-0'
                  autoComplete='off'
                  placeholder={title?.trim() ?? "Conversation"}
                  dimensions='unset'
                  shape='rounded'
                  variant='ghost'
                  focus={false}
                  type='text'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          disabled={pending}
          className='text-sand-9 enabled:hover:text-sand-11 mx-3 my-2.5 transition-colors'
          variant='ghost'
          type='submit'
          size='none'
        >
          <ArrowFillIcon direction='right' className='size-5' />
        </Button>
      </form>

      {form.formState.errors.title ? (
        <FormMessage className='text-tomato-9'>
          {form.formState.errors.title.message}
        </FormMessage>
      ) : null}
    </Form>
  );
}

function ArchiveConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  const Components = useResponsiveDrawer();

  return (
    <Components.Root
      setBackgroundColorOnScale={false}
      repositionInputs={false}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Components.Content>
        <Components.Header>
          <Components.Title>Archive Conversation?</Components.Title>
        </Components.Header>

        <div className='m-4 space-y-4'>
          <p className='text-sand-11 text-sm'>
            This conversation will be hidden from your history. You can't undo
            this action.
          </p>

          <div className='flex gap-2'>
            <Button
              variant='ghost'
              onClick={() => onOpenChange(false)}
              className='flex-1'
            >
              Cancel
            </Button>
            <Button
              variant='solid'
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              className='flex-1'
            >
              Archive
            </Button>
          </div>
        </div>
      </Components.Content>
    </Components.Root>
  );
}
