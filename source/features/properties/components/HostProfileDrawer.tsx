import { X } from 'lucide-react';

interface HostProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  hostName: string;
  hostEmail?: string;
  hostAvatar?: string;
}

const HostProfileDrawer: React.FC<HostProfileDrawerProps> = ({
  isOpen,
  onClose,
  hostName,
  hostEmail,
  hostAvatar,
}) => {
  const initials = hostName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 h-full bg-black/20 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 overflow-y-auto p-4 h-full w-full lg:w-[40%] bg-white rounded-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div
          className="relative h-[150px] rounded-lg"
          style={{
            background: 'linear-gradient(90.55deg, #FEBF9B 19.41%, #006073 99.52%)',
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Avatar */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-20 h-20 border-4 border-white rounded-full overflow-hidden bg-[#1D5C5C] flex items-center justify-center">
              {hostAvatar ? (
                <img src={hostAvatar} alt={hostName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-lg font-semibold">{initials}</span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-14 space-y-6">
          {/* Name */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">{hostName}</h2>
            <p className="text-sm text-[#1D5C5C] font-medium mt-1">Host</p>
          </div>

          {/* Host Information */}
          <div className="space-y-4 rounded-b-lg border-[2px] border-[#EBEBEB]">
            <h3 className="text-lg py-3 px-4 font-medium bg-[#E6EFF1] text-gray-900">
              Host Information
            </h3>
            <div className="space-y-3 px-4 pb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Full Name:</span>
                <span className="text-sm font-medium text-gray-900">{hostName}</span>
              </div>
              {hostEmail && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Email:</span>
                  <span className="text-sm font-medium text-gray-900">{hostEmail}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostProfileDrawer;