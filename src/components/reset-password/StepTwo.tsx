import { CheckCircle } from 'lucide-react';

export default function StepTwo() {
  return (
    <div className="w-full max-w-md text-center space-y-2">
      {/* Check Icon */}
      <CheckCircle className="w-48 h-48 mx-auto text-[#730071] stroke-[1.5]" />
      <h2 className="text-[36px] font-bold mb-4">Successfully</h2>

      <div className="space-y-6">
        <p className="text-[#313131] mb-6">
          Your password has been reset successfully
        </p>
      </div>
    </div>
  );
}
