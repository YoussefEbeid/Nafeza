'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter
import { cn } from '@/lib/utils';
import { LayoutDashboard, FileText, Ship, FileSearch, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'ACI Requests', href: '/dashboard/aci', icon: FileText },
  { name: 'Declarations (46KM)', href: '/dashboard/declarations', icon: Ship },
  { name: 'Tariff Search', href: '/dashboard/tariff', icon: FileSearch },
  { name: 'Company Profile', href: '/dashboard/profile', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter(); // Initialize Router
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout(); // Clear state
    router.push('/'); // Force navigate to Home
  };

  return (
    <div className="h-screen w-64 bg-nafeza-700 text-white flex flex-col fixed left-0 top-0 z-50 shadow-xl">
      <div className="h-16 flex items-center justify-center border-b border-nafeza-600">
        <h1 className="text-2xl font-bold tracking-wider">NAFEZA<span className="text-nafeza-accent">.NEXT</span></h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 group',
                isActive 
                  ? 'bg-nafeza-600 text-white shadow-lg translate-x-1' 
                  : 'text-nafeza-100 hover:bg-nafeza-600 hover:text-white'
              )}
            >
              <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-nafeza-accent" : "text-gray-400 group-hover:text-white")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-nafeza-600">
        <button 
          onClick={handleLogout} // Use the new handler
          className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-200 hover:text-red-100 hover:bg-red-900/20 rounded-md transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}