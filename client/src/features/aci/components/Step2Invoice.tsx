import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { UploadCloud, FileSpreadsheet, CheckCircle } from 'lucide-react';
import { useUploadInvoice, UploadResponse } from '../api/useAci';
import { formatCurrency } from '@/lib/utils';

interface Props {
  requestId: number;
  onNext: () => void;
}

export function Step2Invoice({ requestId, onNext }: Props) {
  const { mutate: upload, isPending } = useUploadInvoice();
  const [data, setData] = useState<UploadResponse | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Call API to upload/parse
    upload({ id: requestId, file }, {
      onSuccess: (res) => setData(res),
    });
  };

  return (
    <div className="space-y-8">
      {/* Upload Box */}
      {!data && (
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center hover:bg-slate-50 transition-colors">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            {isPending ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div> : <UploadCloud className="h-8 w-8" />}
          </div>
          <h3 className="text-xl font-semibold text-slate-700">Upload Commercial Invoice</h3>
          <p className="text-slate-500 mt-2 mb-6">Support for Excel (.xlsx) or CSV</p>
          
          <div className="relative">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              disabled={isPending}
            />
            <Button variant="outline" disabled={isPending}>Select File</Button>
          </div>
        </div>
      )}

      {/* Data Preview (Shows only after upload) */}
      {data && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center text-green-800">
            <CheckCircle className="h-5 w-5 mr-2" />
            Successfully extracted {data.totalLines} items with total value {formatCurrency(data.totalValueUSD, 'USD')}
          </div>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 text-slate-600 font-medium">
                <tr>
                  <th className="px-4 py-3">HS Code</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-right">Qty</th>
                  <th className="px-4 py-3 text-right">Value (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.items.map((item, i) => (
                  <tr key={i} className="bg-white">
                    <td className="px-4 py-3 font-mono text-blue-600">{item.hsCode}</td>
                    <td className="px-4 py-3">{item.description}</td>
                    <td className="px-4 py-3 text-right">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(item.value, 'USD')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setData(null)}>Re-upload</Button>
            <Button onClick={onNext}>Confirm & Continue</Button>
          </div>
        </div>
      )}
    </div>
  );
}