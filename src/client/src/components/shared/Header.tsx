'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useAuthStore, useLanguageStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { Globe, Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react';

export function Header() {
  const router = useRouter();
  const { t, language } = useTranslation();
  const { toggleLanguage } = useLanguageStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 sm:h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <div className="bg-nafeza-700 text-white p-1.5 sm:p-2 rounded-lg">
              <span className="font-bold text-lg sm:text-xl">N</span>
            </div>
            <span className="font-bold text-lg sm:text-xl text-nafeza-700 tracking-tight">
              NAFEZA<span className="text-nafeza-accent">.GOV</span>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <Button variant="ghost" onClick={() => router.push('/currencies')} className="text-sm">
              {t('nav.currencyRates')}
            </Button>
            <Button variant="ghost" onClick={() => router.push('/tariff')} className="text-sm">
              {t('nav.tariffSearch')}
            </Button>
            {isAuthenticated && (
              <Button variant="ghost" onClick={() => router.push('/dashboard')} className="text-sm">
                <LayoutDashboard className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                {t('dashboard.dashboard')}
              </Button>
            )}
            <button
              onClick={toggleLanguage}
              className="p-1.5 rounded-md hover:bg-slate-100 transition-colors"
              aria-label={t('nav.language')}
              title={`${t('nav.language')}: ${language === 'en' ? 'English' : 'العربية'}`}
            >
              <Globe className="h-5 w-5 text-slate-600 hover:text-nafeza-600 transition-colors" />
            </button>
            <div className="h-6 w-px bg-slate-200" />
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50">
                  <User className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">{user?.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleLogout} 
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {t('common.signOut')}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => router.push('/auth/login')} size="sm">
                  {t('nav.logIn')}
                </Button>
                <Button onClick={() => router.push('/auth/register')} size="sm">
                  {t('nav.register')}
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 space-y-3 animate-in slide-in-from-top">
            <Button 
              variant="ghost" 
              onClick={() => { router.push('/currencies'); setMobileMenuOpen(false); }} 
              className="w-full justify-start"
            >
              {t('nav.currencyRates')}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => { router.push('/tariff'); setMobileMenuOpen(false); }} 
              className="w-full justify-start"
            >
              {t('nav.tariffSearch')}
            </Button>
            {isAuthenticated && (
              <Button 
                variant="ghost" 
                onClick={() => { router.push('/dashboard'); setMobileMenuOpen(false); }} 
                className="w-full justify-start"
              >
                <LayoutDashboard className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                {t('dashboard.dashboard')}
              </Button>
            )}
            <button
              onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-slate-50 rounded-md transition-colors"
            >
              <Globe className="h-5 w-5 text-slate-600" />
              <span className="text-sm text-slate-600">{t('nav.language')}</span>
            </button>
            <div className="border-t border-slate-200 pt-3 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-md">
                    <User className="h-4 w-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">{user?.name}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleLogout} 
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <LogOut className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                    {t('common.signOut')}
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => { router.push('/auth/login'); setMobileMenuOpen(false); }} 
                    className="w-full"
                  >
                    {t('nav.logIn')}
                  </Button>
                  <Button 
                    onClick={() => { router.push('/auth/register'); setMobileMenuOpen(false); }} 
                    className="w-full"
                  >
                    {t('nav.register')}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

