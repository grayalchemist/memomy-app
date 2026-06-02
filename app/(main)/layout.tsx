import { BottomNav } from "@/components/BottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-bg-base">
      <div className="mx-auto max-w-md bg-bg-base min-h-screen shadow-2xl relative">
        {children}
        <BottomNav />
      </div>
    </div>
  );
}