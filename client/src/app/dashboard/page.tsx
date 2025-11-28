'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/lib/store';
import { Plus, FileText, Activity, CreditCard, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const stats = [
    { title: 'Active Shipments', value: '12', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Pending Approval', value: '3', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Wallet Balance', value: formatCurrency(45200), icon: CreditCard, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-nafeza-700">Overview</h1>
          <p className="text-slate-500 mt-1">Hello, <span className="font-semibold text-nafeza-600">{user?.name || 'Trader'}</span>. Here is what's happening today.</p>
        </div>
        <Button onClick={() => router.push('/dashboard/aci/new')} className="shadow-lg bg-nafeza-accent hover:bg-yellow-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          New ACI Request
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-green-600 font-medium">
                <TrendingUp className="h-3 w-3 mr-1" /> +2.5% from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Recent Declarations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-500">
              <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                <tr>
                  <th className="px-6 py-3">ACID Number</th>
                  <th className="px-6 py-3">Exporter</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono text-nafeza-600 font-medium">2025-EG-192837465</td>
                  <td className="px-6 py-4">Shenzhen Tech Ltd</td>
                  <td className="px-6 py-4">Nov 28, 2025</td>
                  <td className="px-6 py-4"><span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Approved</span></td>
                  <td className="px-6 py-4"><Button variant="ghost" size="sm">View</Button></td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono text-nafeza-600 font-medium">---</td>
                  <td className="px-6 py-4">Global Logistics GmbH</td>
                  <td className="px-6 py-4">Nov 27, 2025</td>
                  <td className="px-6 py-4"><span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">Draft</span></td>
                  <td className="px-6 py-4"><Button variant="ghost" size="sm">Resume</Button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}