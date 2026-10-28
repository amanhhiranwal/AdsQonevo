"use client";

import React from "react";
import Link from "next/link";

interface ScrollLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
  scrollToId?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const ScrollLink: React.FC<ScrollLinkProps> = ({
  to,
  href,
  children,
  className,
  scrollToId,
  onClick,
  ...props
}) => {
  const target = href || to || "/";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (scrollToId) {
      const element = document.getElementById(scrollToId);

      if (element) {
        e.preventDefault();
        const navbar = document.querySelector(".navbar.fixed-top") as HTMLElement | null;
        const navbarHeight = navbar?.offsetHeight || 0;

        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: elementPosition - navbarHeight,
          left: 0,
          behavior: "smooth",
        });
        return;
      }

      sessionStorage.setItem("scrollToId", scrollToId);
      return;
    }

    if (target === "/" && typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      return;
    }
  };

  return (
    <Link
      href={target}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ScrollLink;
