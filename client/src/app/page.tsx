'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import { Ship, FileText, Search, ArrowRight, ShieldCheck, Globe } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Navbar (Public) */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-nafeza-700 text-white p-2 rounded-lg">
              <span className="font-bold text-xl">N</span>
            </div>
            <span className="font-bold text-xl text-nafeza-700 tracking-tight">NAFEZA<span className="text-nafeza-accent">.GOV</span></span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/services')}>Services</Button>
            <Button variant="ghost" onClick={() => router.push('/help')}>Help Center</Button>
            <div className="h-6 w-px bg-slate-200" />
            <Button variant="outline" onClick={() => router.push('/auth/login')}>Log In</Button>
            <Button onClick={() => router.push('/auth/register')}>Register</Button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative bg-nafeza-700 py-20 overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            The National Single Window for <br/>
            <span className="text-nafeza-accent">Foreign Trade Facilitation</span>
          </h1>
          <p className="text-lg text-nafeza-100 max-w-2xl mx-auto mb-10">
            Submit documents, track shipments, and pay customs fees electronically. 
            Connecting all trade parties in one secure platform.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-nafeza-accent hover:bg-yellow-600 text-white" onClick={() => router.push('/auth/login')}>
              Access Dashboard
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" onClick={() => router.push('/aci/validate')}>
              Validate ACID
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Quick Services Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-nafeza-700 mb-12">Digital Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={FileText} 
              title="ACI Filing" 
              desc="Submit Advance Cargo Information 48 hours before shipping." 
            />
            <ServiceCard 
              icon={Search} 
              title="Tariff Search" 
              desc="Check HS Codes, Customs Duties, and Taxes instantly." 
            />
            <ServiceCard 
              icon={ShieldCheck} 
              title="e-Signature" 
              desc="Sign declarations securely using your e-Token USB." 
            />
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-white font-bold text-xl mb-4">NAFEZA</div>
            <p className="text-sm">Misr Technology Services (MTS)</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Services</li>
              <li>Logistics Centers</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Contact Support</li>
              <li>Technical Requirements</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <Globe className="h-5 w-5 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <Card className="hover:shadow-lg transition-shadow border-none shadow-md">
      <CardContent className="pt-6 text-center">
        <div className="w-12 h-12 bg-nafeza-50 text-nafeza-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-bold text-lg text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
        <div className="mt-4 flex items-center justify-center text-nafeza-600 text-sm font-medium group cursor-pointer">
          Learn More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );
}