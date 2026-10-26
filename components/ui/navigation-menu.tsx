"use client";
import * as React from "react";
import * as Primitive from "@radix-ui/react-navigation-menu";
export function NavigationMenu({
  children,
  ...props
}: React.ComponentProps<typeof Primitive.Root>) {
  return (
    <Primitive.Root data-slot="navigation-menu" {...props}>
      {children}
    </Primitive.Root>
  );
}
export const NavigationMenuList = Primitive.List;
export const NavigationMenuItem = Primitive.Item;
export const NavigationMenuLink = Primitive.Link;
