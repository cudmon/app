import "@/styles/index.css";

import { cn } from "@/utils/cn";
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Default } from "@/layouts/Default";
import { Jost as Font } from "next/font/google";

export const metadata: Metadata = {
  title: "App"
};

const font = Font({
  subsets: ["latin"]
});

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html className={cn("antialiased", font.className)} lang="en">
      <body className="bg-neutral-900 text-neutral-100">
        <Default>{children}</Default>
      </body>
    </html>
  );
}
