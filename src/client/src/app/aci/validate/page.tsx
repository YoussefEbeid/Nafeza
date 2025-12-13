'use client';

import { useState } from 'react';
import api from '@/lib/axios';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { CheckCircle, XCircle, Search, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { useTranslation } from '@/lib/i18n';
import { useLanguageStore } from '@/lib/store';

export default function AciValidatePage() {
  const router = useRouter();
  const { t, language } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    acidNumber: '',
    importerTaxId: '',
    exporterId: '', // Foreign Exporter No
    registryType: 'Commercial Registration', // Mock dropdown
    country: 'CN' // Mock dropdown
  });

  const handleVerify = async () => {
    setIsLoading(true);
    setResult(null);
    setError('');

    try {
      // Call our new .NET Endpoint
      const response = await api.post('/aci/validate', {
        acidNumber: formData.acidNumber,
        importerTaxId: formData.importerTaxId,
        exporterId: formData.exporterId
      });

      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || t('aci.validationFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      {/* Header */}
      <div className="bg-nafeza-700 text-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold">{t('aci.lockRequestValidator')}</h1>
          <p className="text-nafeza-200 mt-2">{t('aci.checkACIDNumber')}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: The Form */}
        <div className="md:col-span-2">
          <Card className="shadow-lg border-t-4 border-t-nafeza-600">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Search className={`w-5 h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'} text-nafeza-600`} /> 
                {t('aci.validateShipmentData')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Result Area */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center animate-in fade-in">
                  <XCircle className={`w-6 h-6 ${language === 'ar' ? 'ml-3' : 'mr-3'} flex-shrink-0`} />
                  <div>
                    <p className="font-bold">{t('aci.verificationFailed')}</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              {result?.valid && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg animate-in fade-in">
                  <div className="flex items-center mb-2">
                    <CheckCircle className={`w-6 h-6 ${language === 'ar' ? 'ml-3' : 'mr-3'} text-green-600`} />
                    <p className="font-bold text-lg">{t('aci.validACIDNumber')}</p>
                  </div>
                  <div className={`${language === 'ar' ? 'mr-9' : 'ml-9'} text-sm space-y-1`}>
                    <p><span className="font-semibold">{t('aci.importer')}:</span> {result.details.importer}</p>
                    <p><span className="font-semibold">{t('aci.exporter')}:</span> {result.details.exporter}</p>
                    <p><span className="font-semibold">{t('aci.status')}:</span> {result.details.status}</p>
                    <p><span className="font-semibold">{t('aci.expires')}:</span> {result.details.expiryDate}</p>
                  </div>
                </div>
              )}

              {/* Inputs */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">{t('aci.acidNumber')} *</label>
                <Input 
                  placeholder={t('aci.acidNumberPlaceholder')} 
                  value={formData.acidNumber}
                  onChange={(e) => setFormData({...formData, acidNumber: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">{t('aci.importerTaxId')} *</label>
                <Input 
                  placeholder={t('aci.importerTaxIdPlaceholder')} 
                  value={formData.importerTaxId}
                  onChange={(e) => setFormData({...formData, importerTaxId: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">{t('aci.foreignExporterNo')} *</label>
                    <Input 
                      placeholder={t('aci.foreignExporterNoPlaceholder')} 
                      value={formData.exporterId}
                      onChange={(e) => setFormData({...formData, exporterId: e.target.value})}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">{t('aci.foreignExporterCountry')}</label>
                    <select className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm">
                        <option value="CN">China</option>
                        <option value="DE">Germany</option>
                        <option value="US">United States</option>
                    </select>
                </div>
              </div>

              {/* Fake Captcha */}
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-md flex items-center w-fit">
                <input type="checkbox" className={`w-5 h-5 text-blue-600 rounded ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                <span className="text-sm text-slate-600">{t('aci.imNotARobot')}</span>
                <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" className={`h-8 ${language === 'ar' ? 'mr-8' : 'ml-8'} opacity-50`} alt="captcha"/>
              </div>

              <Button 
                onClick={handleVerify} 
                isLoading={isLoading} 
                className="w-full md:w-auto bg-nafeza-600 hover:bg-nafeza-700"
              >
                {t('aci.verifyACID')}
              </Button>

            </CardContent>
          </Card>
        </div>

        {/* Right: Info Panel */}
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-lg">
            <h3 className="font-bold text-yellow-800 mb-2">{t('aci.readyToShip')}</h3>
            <p className="text-sm text-yellow-700 mb-4">
              {t('aci.shippingLinesMustVerify')}
            </p>
            <div className="text-xs text-yellow-800 bg-yellow-100 p-3 rounded border border-yellow-200">
              {t('aci.important')}
            </div>
          </div>

          <div className="bg-white border p-5 rounded-lg shadow-sm">
             <h3 className="font-bold text-slate-700 mb-3 flex items-center">
                <ShieldCheck className={`w-5 h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'} text-green-600`} /> {t('aci.securityTip')}
             </h3>
             <p className="text-sm text-slate-500">
                {t('aci.ensureExporterNameMatches')}
             </p>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}