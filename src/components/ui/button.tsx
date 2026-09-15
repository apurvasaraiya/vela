import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,box-shadow,color,opacity] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-paper hover:bg-ink-soft shadow-[var(--shadow-border)]",
        lagoon: "bg-lagoon text-lagoon-fg hover:opacity-90",
        ghost: "bg-transparent text-ink hover:bg-paper-deep",
        outline:
          "bg-surface text-ink shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
      },
      size: {
        sm: "h-9 px-3.5 text-sm rounded-[10px]",
        md: "h-11 px-4 text-sm rounded-md",
        lg: "h-12 px-5 text-[15px] rounded-[14px]",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
