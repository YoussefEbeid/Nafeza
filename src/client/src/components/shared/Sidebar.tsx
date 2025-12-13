'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, FileText, Ship, FileSearch, Settings, LogOut, X } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { useLanguageStore } from '@/lib/store';

const menuItems = [
  { nameKey: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { nameKey: 'aciRequests', href: '/dashboard/aci', icon: FileText },
  { nameKey: 'declarations46KM', href: '/dashboard/declarations', icon: Ship },
  { nameKey: 'tariffSearch', href: '/dashboard/tariff', icon: FileSearch },
  { nameKey: 'companyProfile', href: '/dashboard/profile', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const { t, language } = useTranslation();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Determine transform class based on language and open state
  // English: Slide from left. Arabic: Slide from right.
  // MD screens: Always translate-0 (visible)
  const transformClass = isOpen 
    ? 'translate-x-0' 
    : language === 'ar' ? 'translate-x-full' : '-translate-x-full';

  const positionClass = language === 'ar' ? 'right-0 border-l' : 'left-0 border-r';

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <div className={cn(
        `h-screen w-64 bg-nafeza-700 text-white flex flex-col fixed top-0 z-50 shadow-xl transition-transform duration-300 ease-in-out md:translate-x-0`,
        positionClass,
        transformClass
      )}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-nafeza-600">
          <div className="flex-1 flex justify-center">
            <h1 className="text-2xl font-bold tracking-wider">NAFEZA<span className="text-nafeza-accent">.NEXT</span></h1>
          </div>
          {/* Close button for mobile */}
          <button onClick={onClose} className="md:hidden text-nafeza-100 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose} // Close sidebar on mobile when link clicked
                className={cn(
                  'flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 group',
                  isActive 
                    ? `bg-nafeza-600 text-white shadow-lg ${language === 'ar' ? '-translate-x-1' : 'translate-x-1'}` 
                    : 'text-nafeza-100 hover:bg-nafeza-600 hover:text-white'
                )}
              >
                <item.icon className={cn(`${language === 'ar' ? 'ml-3' : 'mr-3'} h-5 w-5`, isActive ? "text-nafeza-accent" : "text-gray-400 group-hover:text-white")} />
                {t(`dashboard.${item.nameKey}`)}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-nafeza-600">
          <button 
            onClick={handleLogout} 
            className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-200 hover:text-red-100 hover:bg-red-900/20 rounded-md transition-colors"
          >
            <LogOut className={`${language === 'ar' ? 'ml-3' : 'mr-3'} h-5 w-5`} />
            {t('common.signOut')}
          </button>
        </div>
      </div>
    </>
  );
}