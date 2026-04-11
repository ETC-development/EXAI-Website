"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/components/ui/utils";

type Props = {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  className?: string;
};

export function PaginationBar({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  disabled,
  className,
}: Props) {
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-400",
        className,
      )}
    >
      <p>
        Showing <span className="font-bold text-slate-200">{from}</span>–
        <span className="font-bold text-slate-200">{to}</span> of{" "}
        <span className="font-bold text-slate-200">{totalItems}</span>
      </p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="adminMuted"
          size="sm"
          disabled={disabled || page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <span className="min-w-[5rem] text-center font-mono text-slate-300">
          {page} / {Math.max(1, totalPages)}
        </span>
        <Button
          type="button"
          variant="adminMuted"
          size="sm"
          disabled={disabled || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
