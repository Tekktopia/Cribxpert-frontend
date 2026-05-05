import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

type TitleType = 'success' | 'error' | 'info' | 'warning';

interface TitleProps {
  isOpen: boolean;
  onClose: () => void;
  type?: TitleType;
  title: string;
  message: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  size?: 'sm' | 'md' | 'lg';
}

const Title: React.FC<TitleProps> = ({
  isOpen,
  onClose,
  type = 'info',
  title,
  message,
  primaryAction,
  secondaryAction,
  size = 'md',
}) => {
  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle className="w-12 h-12 text-green-500" />,
    error: <AlertCircle className="w-12 h-12 text-red-500" />,
    info: <Info className="w-12 h-12 text-blue-500" />,
    warning: <AlertTriangle className="w-12 h-12 text-yellow-500" />,
  };

  const iconBgColors = {
    success: 'bg-green-100',
    error: 'bg-red-100',
    info: 'bg-blue-100',
    warning: 'bg-yellow-100',
  };

  const buttonColors = {
    success: 'bg-green-600 hover:bg-green-700',
    error: 'bg-red-600 hover:bg-red-700',
    info: 'bg-[#006073] hover:bg-[#004d5c]',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 ${sizeClasses[size]} w-full text-center relative`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon with background */}
        <div className={`w-16 h-16 ${iconBgColors[type]} rounded-full flex items-center justify-center mx-auto mb-4`}>
          {icons[type]}
        </div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-[#313131] mb-2">
          {title}
        </h2>

        {/* Message */}
        <p className="text-[#6F6F6F] mb-6 text-sm md:text-base whitespace-pre-line">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className={`px-6 py-2.5 rounded-lg text-white transition-colors font-medium ${buttonColors[type]}`}
            >
              {primaryAction.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Title;

// C:\Users\USER\Desktop\Cribxpert-frontend\source\shared\components\ui\Title.tsx