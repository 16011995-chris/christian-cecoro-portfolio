export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout bypasses the root layout completely for the studio route
  // No header, no navigation, no custom cursor - just Sanity Studio
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
