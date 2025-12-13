'use client';

import { Sidebar } from '@/components/shared/Sidebar';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLanguageStore } from '@/lib/store';
import { Menu } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const language = useLanguageStore((state) => state.language);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth protection
  useEffect(() => {
    // Check localStorage manually for immediate feedback or rely on store
    const token = typeof window !== 'undefined' ? localStorage.getItem('nafeza_token') : null;
    if (!token && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [router, isAuthenticated]);

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      {/* 1. The Sidebar (Fixed) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 2. Main Content Wrapper */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${language === 'ar' ? 'md:mr-64' : 'md:ml-64'}`}>
        
        {/* Mobile Header (Hamburger Menu) */}
        <div className="md:hidden bg-nafeza-700 text-white p-4 flex items-center justify-between shadow-md">
          <button onClick={() => setSidebarOpen(true)} className="p-1 hover:bg-nafeza-600 rounded">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold">NAFEZA.NEXT</span>
          <div className="w-6"></div> {/* Spacer for centering */}
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}