"use client";
import * as React from "react";
import * as Primitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
export function Accordion(props: React.ComponentProps<typeof Primitive.Root>) {
  return <Primitive.Root data-slot="accordion" {...props} />;
}
export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item
      data-slot="accordion-item"
      className={cn("accordion-item", className)}
      {...props}
    />
  );
}
export function AccordionTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Trigger>) {
  return (
    <Primitive.Header>
      <Primitive.Trigger
        data-slot="accordion-trigger"
        className={cn("accordion-trigger", className)}
        {...props}
      >
        {children}
        <Plus className="accordion-plus" size={18} aria-hidden="true" />
      </Primitive.Trigger>
    </Primitive.Header>
  );
}
export function AccordionContent({
  children,
  ...props
}: React.ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Content data-slot="accordion-content" className="accordion-content" {...props}>
      <div>{children}</div>
    </Primitive.Content>
  );
}
