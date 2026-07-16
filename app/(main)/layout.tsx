import { BottomNav } from "@/components/BottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="relative mx-auto min-h-screen max-w-md bg-background shadow-2xl">
        {children}
        <BottomNav />
      </div>
    </div>
  );
}
