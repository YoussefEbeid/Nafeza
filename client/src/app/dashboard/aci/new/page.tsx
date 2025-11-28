'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Step1Parties } from '@/features/aci/components/Step1Parties';
import { Step2Invoice } from '@/features/aci/components/Step2Invoice';
import { useCreateDraft } from '@/features/aci/api/useAci';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const steps = ['Parties', 'Invoice Data', 'Review'];

export default function NewAciPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [requestId, setRequestId] = useState<number | null>(null);
  
  const createDraft = useCreateDraft();

  // --- Handlers ---
  
  const handleStep1Submit = (data: any) => {
    createDraft.mutate(data, {
      onSuccess: (res: any) => {
        setRequestId(res.requestId);
        setCurrentStep(1); // Move to Invoice Step
      }
    });
  };

  const handleFinalSubmit = () => {
    // In a real app, this calls "Sign & Submit"
    alert('Request Signed with e-Token! ACID Generated.');
    router.push('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Stepper Header */}
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <li key={step} className={cn("relative", index !== steps.length - 1 && "pr-8 sm:pr-20")}>
                <div className="flex items-center">
                  <div className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                    isCompleted || isCurrent ? "bg-nafeza-600 hover:bg-nafeza-900" : "bg-gray-200"
                  )}>
                    {isCompleted ? <Check className="h-5 w-5 text-white" /> : <span className={cn("text-sm font-bold", isCurrent ? "text-white" : "text-gray-500")}>{index + 1}</span>}
                  </div>
                  <span className={cn("ml-4 text-sm font-medium hidden sm:block", isCurrent ? "text-nafeza-600" : "text-gray-500")}>{step}</span>
                </div>
                {index !== steps.length - 1 && (
                  <div className="absolute top-4 left-0 h-0.5 w-full -z-10 bg-gray-200">
                    <div className={cn("h-full bg-nafeza-600 transition-all duration-500", isCompleted ? "w-full" : "w-0")} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep]}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Step 1 */}
          {currentStep === 0 && (
            <Step1Parties 
              onNext={handleStep1Submit} 
              isLoading={createDraft.isPending} 
            />
          )}

          {/* Step 2 */}
          {currentStep === 1 && requestId && (
            <Step2Invoice 
              requestId={requestId} 
              onNext={() => setCurrentStep(2)} 
            />
          )}

          {/* Step 3 (Review) */}
          {currentStep === 2 && (
            <div className="text-center py-10 space-y-4">
               <div className="bg-yellow-50 p-6 rounded-lg max-w-sm mx-auto border border-yellow-200 text-left">
                  <h4 className="font-bold text-yellow-800 mb-2">Payment Summary</h4>
                  <div className="flex justify-between text-sm"><span>ACID Fee:</span><span>$150.00</span></div>
                  <div className="flex justify-between text-sm"><span>Blockchain Fee:</span><span>$50.00</span></div>
                  <div className="border-t border-yellow-200 my-2"></div>
                  <div className="flex justify-between font-bold"><span>Total:</span><span>$200.00</span></div>
               </div>
               
               <p className="text-slate-500">Please insert your e-Token USB to sign this request.</p>
               <Button size="lg" onClick={handleFinalSubmit}>
                 Simulate Digital Signature & Submit
               </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}