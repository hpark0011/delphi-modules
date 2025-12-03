import { MindDialog } from "@/components/mind-dialog/mind-dialog";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MindDialog>{children}</MindDialog>;
}
