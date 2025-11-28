import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

// --- Types ---
export interface CreateAciParams {
  importerId: number;
  exporterId: number;
}

export interface InvoiceItem {
  hsCode: string;
  description: string;
  quantity: number;
  value: number;
}

export interface UploadResponse {
  message: string;
  totalLines: number;
  totalValueUSD: number;
  items: InvoiceItem[];
}

// --- Hooks ---

export const useCreateDraft = () => {
  return useMutation({
    mutationFn: async (data: CreateAciParams) => {
      const res = await api.post('/aci/draft', data);
      return res.data; // Returns { requestId: 123 }
    },
  });
};

export const useUploadInvoice = () => {
  return useMutation({
    mutationFn: async ({ id, file }: { id: number; file: File }) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await api.post(`/aci/${id}/upload-invoice`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data as UploadResponse;
    },
  });
};