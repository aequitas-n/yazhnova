import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const variants = cva("button", {
  variants: {
    variant: {
      default: "button-ink",
      paper: "button-paper",
      outline: "button-outline",
      text: "button-text",
    },
    size: { default: "", small: "button-small" },
  },
  defaultVariants: { variant: "default", size: "default" },
});
export function Button({
  asChild = false,
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof variants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp data-slot="button" className={cn(variants({ variant, size, className }))} {...props} />
  );
}
