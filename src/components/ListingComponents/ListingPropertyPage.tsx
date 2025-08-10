import React, { useEffect, useState } from 'react';

interface ListingPropertyPageProps {
    nextStep: () => void;
  prevStep: () => void;
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  uploadCompleted: boolean;
  setUploadCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListingPropertyPage: React.FC<ListingPropertyPageProps> = ({
  nextStep,
  prevStep,
  isUploading,
  setIsUploading,
  uploadCompleted,
  setUploadCompleted,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [showUploadBox, setShowUploadBox] = useState(true);
  const [uploadedIndexes, setUploadedIndexes] = useState<number[]>([]);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);

  const handleFileClick = () => {
    document.getElementById('file-upload')?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedFiles((prev) => {
      const combined = [...prev, ...newFiles].slice(0, 6);
      return combined;
    });
  };

  const handleDelete = (index: number) => {
    const newFiles = [...selectedFiles];
    const newPreviews = [...previews];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
    setUploadedIndexes((prev) => prev.filter((i) => i !== index));
  };

  useEffect(() => {
    const objectUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Instruction text moved to the top */}
      {/* {!uploadCompleted && (
        // <div className="w-[644px] mb-6 text-center">
        //   <h2 className="text-xl font-semibold mb-1">Property Photos</h2>
        //   <p>
        //     Upload at least 5 high quality photos of your property, include images of all major areas such as
        //     living room, bedrooms, bathrooms, kitchen and exterior.
        //   </p>
        // </div>
      )} */}

      {/* Upload Box */}
      {showUploadBox && (
        <div
          id="upload-box"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 w-[644px] h-[316px]"
        >
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/gif"
            hidden
            multiple
          />
          <img src="/icons/camera-icon.png" alt="Upload Icon" className="mb-4" />
          <p>Click to upload or drag and drop</p>
          <p className="text-sm text-gray-500 mb-2">PNG, JPG, GIF up to 10MB each</p>
          <button
            disabled={selectedFiles.length >= 6}
            type="button"
            onClick={handleFileClick}
            className="mt-4 px-4 py-2 bg-[#1D5C5C] text-white rounded"
          >
            Select Photos
          </button>
        </div>
      )}

      {/* Review instructions after upload is complete */}
      {uploadCompleted && (
        <div className="w-[644px] mt-6 text-center">
          <h2 className="text-xl font-semibold mb-1">Review Your Photos</h2>
          <p>Click to select a cover photo. By default, the first image will be used as the cover.</p>
        </div>
      )}

      {/* Preview Section */}
      {selectedFiles.length > 0 && (
        <>
          {!isUploading && !uploadCompleted && (
            <p className="text-sm text-gray-700 mt-4 font-bold text-center">
              Selected Photos: ({selectedFiles.length}/6)
            </p>
          )}
          {isUploading && (
            <p className="text-sm mt-2 font-medium text-center">
              {uploadedIndexes.length} photos uploaded
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 mt-6">
            {previews.map((src, index) => (
              <div
                key={index}
                className="relative border-2 border-gray-200 p-4 w-[300px] h-[250px] shadow-sm rounded"
              >
                <button
                  onClick={() => setConfirmDeleteIndex(index)}
                  disabled={isUploading}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100 z-20"
                >
                  <img src="../../../public/icons/delete-icon-green.png" alt="" />
                </button>

                <div className="relative w-full h-32 mb-2">
                  <img
                    src={src}
                    alt={`Uploaded ${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  {isUploading && !uploadedIndexes.includes(index) && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-md z-10">
                      <div className="loader border-white h-6 w-6 animate-spin rounded-full border-4 border-t-transparent" />
                    </div>
                  )}
                  {!isUploading && uploadedIndexes.includes(index) && (
                    <div className="absolute top-2 left-2 text-green-500 text-xl z-10"><img src="../../../public/icons/green-tick.png" alt="" /></div>
                  )}
                </div>

                <p className="text-sm text-gray-700 text-center truncate w-full">
                  {selectedFiles[index]?.name}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Navigation Buttons */}
      {(!isUploading || uploadCompleted) && (
        <div className="flex justify-between w-full max-w-[644px] mt-6">


          <button
  id="upload-start"
  className="hidden"
  onClick={() => {
    if (!uploadCompleted) {
      setIsUploading(true);
      setShowUploadBox(false);
      selectedFiles.forEach((_, index) => {
        setTimeout(() => {
          setUploadedIndexes((prev) => [...prev, index]);
          if (index === selectedFiles.length - 1) {
            setTimeout(() => {
              setIsUploading(false);
              setUploadCompleted(true);
            }, 1000);
          }
        }, 1000 + index * 600);
      });
    }
  }}
/>
         
{/* 
          <button
            onClick={() => {
              if (!uploadCompleted) {
                setIsUploading(true);
                setShowUploadBox(false);
                selectedFiles.forEach((_, index) => {
                  setTimeout(() => {
                    setUploadedIndexes((prev) => [...prev, index]);
                    if (index === selectedFiles.length - 1) {
                      setTimeout(() => {
                        setIsUploading(false);
                        setUploadCompleted(true);
                      }, 1000);
                    }
                  }, 1000 + index * 600);
                });
              } else {
                nextStep();
              }
            }}
            disabled={selectedFiles.length === 0 || isUploading}
            className="bg-[#1D5C5C] text-white px-4 py-2 rounded flex items-center"
          >
            {isUploading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            )}
            {uploadCompleted ? 'Next' : 'Upload'}
          </button> */}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Delete Photo</h2>
            <p className="mb-6">Are you sure you want to delete this photo?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setConfirmDeleteIndex(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete(confirmDeleteIndex!);
                  setConfirmDeleteIndex(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingPropertyPage;
