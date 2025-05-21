import { ReplitExplorerClient } from "@/components/replit-explorer-client";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-6 bg-background">
      <ReplitExplorerClient />
    </main>
  );
}
