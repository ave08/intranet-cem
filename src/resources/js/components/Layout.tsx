import { useState } from "react";
import { Header } from "./Header";
import { LeftNavigation } from "./LeftNavigation";
import { RightSidebar } from "./RightSidebar";
import { MobileNavigation } from "./MobileNavigation";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
      <MobileNavigation isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <div className="w-full px-2 sm:px-4 lg:px-8 py-3 sm:py-6 max-w-[1440px] mx-auto">
        <div className="flex gap-4 sm:gap-6">
          {/* Left Navigation - Hidden on mobile */}
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <LeftNavigation />
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>

          {/* Right Sidebar - Hidden on mobile and tablet */}
          <div className="hidden xl:block">
            <div className="sticky top-20">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
