import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Building2, Globe } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onNext: (data: { importerId: number; exporterId: number }) => void;
  isLoading: boolean;
}

export function Step1Parties({ onNext, isLoading }: Props) {
  // In a real app, these would be dropdowns searching the Database
  // For the demo, we default them to standard values
  const [importerId, setImporterId] = useState('1'); 
  const [exporterId, setExporterId] = useState('2');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Importer Card */}
        <Card className="border-l-4 border-l-nafeza-600">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Building2 className="h-6 w-6 text-nafeza-600 mr-2" />
              <h3 className="font-semibold text-lg">Importer (You)</h3>
            </div>
            <div className="space-y-4">
               <Input label="Tax Registration ID" value="100-200-300" disabled />
               <Input label="Company Name" value="El Sewedy Electric" disabled />
               <p className="text-xs text-green-600">✓ Verified Entity</p>
            </div>
          </CardContent>
        </Card>

        {/* Exporter Card */}
        <Card className="border-l-4 border-l-nafeza-accent">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-nafeza-accent mr-2" />
              <h3 className="font-semibold text-lg">Foreign Exporter</h3>
            </div>
            <div className="space-y-4">
               <Input 
                 label="CargoX Blockchain ID" 
                 value={exporterId} 
                 onChange={(e) => setExporterId(e.target.value)} 
                 placeholder="Search by ID..."
               />
               <Input label="Exporter Name" value="Shenzhen Tech Ltd" disabled />
               <p className="text-xs text-blue-600">ℹ Found on CargoX Network</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          size="lg" 
          onClick={() => onNext({ importerId: Number(importerId), exporterId: Number(exporterId) })}
          isLoading={isLoading}
        >
          Create Draft & Continue
        </Button>
      </div>
    </div>
  );
}