'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Building,
  CheckCircle,
  Search,
  Filter
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { useTranslation } from '@/lib/i18n';
import { useLanguageStore } from '@/lib/store';
import { translateApiContent } from '@/lib/apiContentTranslator';

interface LogisticCenter {
  id: number;
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  services: string[];
  workingHours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface ServicesContent {
  title: string;
  subtitle: string;
  description: string;
  centers: LogisticCenter[];
  totalCenters: number;
  services: string[];
}

export default function ServicesPage() {
  const router = useRouter();
  const { t, language } = useTranslation();
  const [content, setContent] = useState<ServicesContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [expandedCenter, setExpandedCenter] = useState<number | null>(null);

  useEffect(() => {
    api.get('/logisticcenters', { params: { lang: language } })
      .then(res => {
        // Translate API response based on current language
        const translatedContent = translateApiContent(res.data, language);
        setContent(translatedContent);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load logistic centers:', err);
        setIsLoading(false);
      });
  }, [language]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nafeza-600 mx-auto mb-4"></div>
          <p className="text-slate-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{t('common.failedToLoad')}</p>
          <Button onClick={() => router.push('/')}>{t('common.goHome')}</Button>
        </div>
      </div>
    );
  }

  // Filter centers based on search and service
  const filteredCenters = content.centers.filter(center => {
    const matchesSearch = 
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesService = 
      selectedService === 'all' || 
      center.services.some(s => s.toLowerCase().includes(selectedService.toLowerCase()));

    return matchesSearch && matchesService;
  });

  // Get unique services for filter
  const allServices = Array.from(
    new Set(content.centers.flatMap(c => c.services))
  ).sort();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      {/* Hero Header */}
      <div className="bg-nafeza-700 text-white py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center text-nafeza-100 hover:text-white mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className={`w-4 h-4 ${language === 'ar' ? 'ml-1 rotate-180' : 'mr-1'}`} /> {t('common.backToHome')}
          </button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4">{content.title}</h1>
          <p className="text-base sm:text-lg lg:text-xl text-nafeza-100 max-w-3xl mb-2">{content.subtitle}</p>
          <p className="text-sm sm:text-base lg:text-lg text-nafeza-200 max-w-3xl">{content.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
        {/* Statistics Banner */}
        <div className="bg-gradient-to-r from-nafeza-600 to-nafeza-700 rounded-lg shadow-xl p-6 sm:p-8 text-white">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-nafeza-accent mb-2">
                {content.totalCenters}
              </div>
              <div className="text-base sm:text-lg font-semibold">{t('services.logisticsCenters')}</div>
              <div className="text-xs sm:text-sm text-nafeza-100">{t('services.acrossEgypt')}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-nafeza-accent mb-2">
                24/7
              </div>
              <div className="text-base sm:text-lg font-semibold">{t('services.onlineServices')}</div>
              <div className="text-xs sm:text-sm text-nafeza-100">{t('services.availableAnytime')}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-nafeza-accent mb-2">
                {content.services.length}+
              </div>
              <div className="text-base sm:text-lg font-semibold">{t('services.servicesOffered')}</div>
              <div className="text-xs sm:text-sm text-nafeza-100">{t('services.comprehensiveSolutions')}</div>
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-nafeza-700 mb-4 sm:mb-6">{t('services.ourServices')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {content.services.map((service, index) => (
              <Card key={index} className="shadow-md border-none hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-nafeza-600 flex-shrink-0" />
                    <span className="text-slate-700 text-sm font-medium">{service}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Search and Filter */}
        <section>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={t('services.searchCenters')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nafeza-500`}
                />
                <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5`} />
              </div>
              <div className="md:w-64">
                <div className="relative">
                  <Filter className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5`} />
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nafeza-500 appearance-none bg-white`}
                  >
                    <option value="all">{t('services.filterByService')}</option>
                    {allServices.map((service, index) => (
                      <option key={index} value={service.toLowerCase()}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-600">
              {filteredCenters.length} {t('services.centersFound')} {content.centers.length} {t('services.totalCenters')}
            </div>
          </div>
        </section>

        {/* Centers List */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-nafeza-700 mb-4 sm:mb-6">{t('services.logisticServiceCenters')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCenters.map((center) => (
              <Card 
                key={center.id} 
                className="shadow-md border-none hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setExpandedCenter(expandedCenter === center.id ? null : center.id)}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4 sm:w-5 sm:h-5 text-nafeza-600 flex-shrink-0" />
                        <h3 className="font-bold text-base sm:text-lg text-slate-800">{center.name}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 text-xs sm:text-sm mb-1">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>{center.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-2 mb-3 sm:mb-4">
                    <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm break-words">{center.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <a href={`tel:${center.phone}`} className="hover:text-nafeza-600 transition-colors break-all">
                        {center.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <a href={`mailto:${center.email}`} className="hover:text-nafeza-600 transition-colors break-all">
                        {center.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="break-words">{center.workingHours}</span>
                    </div>
                  </div>

                  {expandedCenter === center.id && (
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200 animate-in fade-in slide-in-from-top-2">
                      <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">{t('services.services')}:</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {center.services.map((service, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-nafeza-50 text-nafeza-700"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-3 sm:mt-4 text-xs text-slate-400 text-center">
                    {expandedCenter === center.id ? t('services.clickToCollapse') : t('services.clickToExpand')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCenters.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No centers found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedService('all');
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

