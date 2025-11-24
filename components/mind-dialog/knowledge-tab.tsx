"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon, type IconName } from "@/components/ui/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { useMemo, useState } from "react";

export interface KnowledgeItem {
  id: string;
  name: string;
  type: string;
  updatedAt: string; // ISO date string
  category: string;
}

type ContentCategory =
  | "Popular"
  | "Websites"
  | "YouTube"
  | "Socials"
  | "Files"
  | "Podcasts"
  | "Snippets"
  | "Notes Apps"
  | "Messaging Apps";

// Mock data - filter completed items from training status and convert to knowledge items
const mockKnowledgeItems: KnowledgeItem[] = [
  {
    id: "1",
    name: "Product Documentation.pdf",
    type: "PDF",
    updatedAt: new Date().toISOString(),
    category: "Files",
  },
  {
    id: "4",
    name: "Onboarding Guide.md",
    type: "Markdown",
    updatedAt: new Date().toISOString(),
    category: "Files",
  },
  {
    id: "6",
    name: "User Guide.pdf",
    type: "PDF",
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    category: "Files",
  },
  {
    id: "7",
    name: "Technical Specifications.docx",
    type: "Document",
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    category: "Files",
  },
  {
    id: "8",
    name: "Customer Support FAQ.txt",
    type: "Text",
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    category: "Files",
  },
  {
    id: "10",
    name: "Knowledge Base.txt",
    type: "Text",
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    category: "Files",
  },
  {
    id: "11",
    name: "Developer Guide.pdf",
    type: "PDF",
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    category: "Files",
  },
  {
    id: "13",
    name: "Security Policy.pdf",
    type: "PDF",
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
    category: "Files",
  },
  {
    id: "14",
    name: "Code of Conduct.docx",
    type: "Document",
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
    category: "Files",
  },
  {
    id: "15",
    name: "Best Practices Guide.md",
    type: "Markdown",
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
    category: "Files",
  },
  {
    id: "16",
    name: "Architecture Diagrams.zip",
    type: "Archive",
    updatedAt: new Date(Date.now() - 345600000).toISOString(),
    category: "Files",
  },
  {
    id: "18",
    name: "Integration Guide.pdf",
    type: "PDF",
    updatedAt: new Date(Date.now() - 345600000).toISOString(),
    category: "Files",
  },
  {
    id: "19",
    name: "Company Website",
    type: "Website",
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    category: "Websites",
  },
  {
    id: "20",
    name: "Product Landing Page",
    type: "Website",
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    category: "Websites",
  },
];

const categories: ContentCategory[] = [
  "Popular",
  "Websites",
  "YouTube",
  "Socials",
  "Files",
  "Podcasts",
  "Snippets",
  "Notes Apps",
  "Messaging Apps",
];

function getIconForType(type: string): IconName {
  const typeLower = type.toLowerCase();
  if (typeLower === "website") {
    return "GlobeIcon";
  }
  if (
    typeLower === "pdf" ||
    typeLower === "document" ||
    typeLower === "markdown" ||
    typeLower === "text" ||
    typeLower === "archive"
  ) {
    return "DocFillIcon";
  }
  return "DocFillIcon";
}

function KnowledgeItemRow({
  item,
  onEdit,
  onDelete,
}: {
  item: KnowledgeItem;
  onEdit: (item: KnowledgeItem) => void;
  onDelete: (id: string) => void;
}) {
  const iconName = getIconForType(item.type);
  const formattedDate = format(parseISO(item.updatedAt), "MMMM dd, yyyy");

  return (
    <TableRow className='hover:bg-[#F6F6F5] dark:hover:bg-[#2C2C2A]'>
      <TableCell className='px-2 py-3 align-middle w-[40%]'>
        <div className='flex items-center gap-2'>
          <Icon
            name={iconName}
            className='w-5 h-5 text-[#8D8D86] dark:text-neutral-500'
          />
          <span className='font-medium text-text-primary text-sm truncate'>
            {item.name}
          </span>
        </div>
      </TableCell>
      <TableCell className='px-2 py-3 align-middle w-[30%]'>
        <span className='text-sm text-[#8D8D86] dark:text-neutral-500'>
          {formattedDate}
        </span>
      </TableCell>
      <TableCell className='px-2 py-3 align-middle w-[10%] text-right'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='h-8 w-8 p-0 hover:bg-[#F6F6F5] dark:hover:bg-[#2C2C2A]'
            >
              <Icon name='EllipsisIcon' className='w-4 h-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => onEdit(item)}>
              <Icon name='PencilIcon' className='w-4 h-4 mr-2' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant='destructive'
              onClick={() => onDelete(item.id)}
            >
              <Icon name='TrashIcon' className='w-4 h-4 mr-2' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export function KnowledgeTab() {
  const [selectedCategory, setSelectedCategory] =
    useState<ContentCategory>("Popular");
  const [knowledgeItems, setKnowledgeItems] =
    useState<KnowledgeItem[]>(mockKnowledgeItems);

  // Filter items by selected category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "Popular") {
      // Show all items sorted by most recent
      return [...knowledgeItems].sort(
        (a, b) =>
          parseISO(b.updatedAt).getTime() - parseISO(a.updatedAt).getTime()
      );
    }
    return knowledgeItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, knowledgeItems]);

  const handleEdit = (item: KnowledgeItem) => {
    // Placeholder for edit functionality
    console.log("Edit item:", item);
  };

  const handleDelete = (id: string) => {
    setKnowledgeItems((items) => items.filter((item) => item.id !== id));
  };

  const handleAddContent = () => {
    // Placeholder for add content functionality
    console.log("Add content for category:", selectedCategory);
  };

  return (
    <div className='flex gap-4 h-full min-h-0'>
      {/* Sidebar */}
      <div className='flex-shrink-0 w-48 flex flex-col'>
        <div className='flex flex-col gap-1'>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "text-left px-3 py-2 rounded-md text-sm transition-colors",
                selectedCategory === category
                  ? "bg-[#F6F6F5] dark:bg-[#2C2C2A] text-text-primary font-medium"
                  : "text-[#8D8D86] dark:text-neutral-500 hover:bg-[#F6F6F5] dark:hover:bg-[#2C2C2A]"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col min-w-0 min-h-0'>
        {/* Header */}
        <div className='flex-shrink-0 flex items-center justify-between mb-4'>
          <h2 className='text-lg font-medium text-text-primary'>
            {selectedCategory}
          </h2>
          <Button
            size='sm'
            onClick={handleAddContent}
            className='h-8 px-3 text-sm'
          >
            <Icon name='PlusIcon' className='w-4 h-4 mr-2' />
            Add content
          </Button>
        </div>

        {/* Table */}
        <div className='flex-1 overflow-y-auto min-h-0'>
          <Table className='table-fixed w-full'>
            <TableHeader>
              <TableRow>
                <TableHead className='h-10 px-2 text-left align-middle font-medium text-sm text-[#8D8D86] dark:text-neutral-500 w-[40%]'>
                  Name
                </TableHead>
                <TableHead className='h-10 px-2 text-left align-middle font-medium text-sm text-[#8D8D86] dark:text-neutral-500 w-[30%]'>
                  Updated
                </TableHead>
                <TableHead className='h-10 px-2 text-right align-middle font-medium text-sm text-[#8D8D86] dark:text-neutral-500 w-[10%]'>
                  {/* Actions column */}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className='h-24 text-center text-[#8D8D86] dark:text-neutral-500'
                  >
                    No content found
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <KnowledgeItemRow
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
