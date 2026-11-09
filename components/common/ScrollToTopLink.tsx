
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

export default function ScrollToTopLink({
  href,
  onClick,
  ...props
}: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);

        if (pathname === href) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }}
    />
  );
}
