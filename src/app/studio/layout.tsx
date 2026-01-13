import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio | Christian Cecoro",
  description: "Content Management System",
};

// This layout wraps the entire /studio route
// It renders ONLY the children without any site UI
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
