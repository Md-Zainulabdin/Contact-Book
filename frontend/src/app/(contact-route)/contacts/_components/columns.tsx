"use client";

import { Contact } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {} from "date-fns";
import { relativeDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CreatedAt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{relativeDate(row.original.created_at)}</div>,
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
