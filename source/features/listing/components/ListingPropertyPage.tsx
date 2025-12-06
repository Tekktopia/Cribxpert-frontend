import React, { useEffect, useState } from 'react';

interface ListingPropertyPageProps {
  nextStep: () => void;
  prevStep: () => void;
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  uploadCompleted: boolean;
  setUploadCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const ListingPropertyPage: React.FC<ListingPropertyPageProps> = ({
  isUploading,
  setIsUploading,
  uploadCompleted,
  setUploadCompleted,
  selectedFiles,
  setSelectedFiles,
}) => {
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

    const newFiles = Array.from(files).filter((file) =>
      ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
    );
    if (newFiles.length !== Array.from(files).length) {
      alert('Only JPEG, PNG, or WEBP images are allowed.');
    }
    setSelectedFiles((prev) => {
      const combined = [...prev, ...newFiles].slice(0, 6);
      
      // Reset upload status if new files are added after completion
      if (uploadCompleted && combined.length > 0) {
        setUploadCompleted(false);
        setUploadedIndexes([]);
        setShowUploadBox(true);
      }
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
    
    // Logic to handle completed state reset if the last file is deleted
    if (newFiles.length === 0) {
        setUploadCompleted(false);
        setShowUploadBox(true);
    }
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
      {/* Upload Box */}
      {showUploadBox && (
        <div
          id="upload-box"
          className="flex flex-col items-center justify-center border-2 border-dashed border-neutralLight p-4 w-[644px] h-[316px]"
        >
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            hidden
            multiple
          />
          <img src="/other-icons/photo-icon.svg" alt="Upload Icon" className="mb-4" />
          <p>Click to upload or drag and drop</p>
          <p className="text-sm text-netraulLight0 mb-2">
            JPEG, PNG, or WEBP up to 10MB each 
          </p>
          <button
            disabled={selectedFiles.length >= 6}
            type="button"
            onClick={handleFileClick}
            className="mt-4 px-4 py-2 bg-primary text-white rounded"
          >
            Select Photos
          </button>
        </div>
      )}

      {/* Preview Section */}
      {selectedFiles.length > 0 && (
        <>
          {!isUploading && !uploadCompleted && (
            <p className="text-sm text-neutral mt-4 font-bold text-center">
              Selected Photos: ({selectedFiles.length}/6)
            </p>
          )}
          {isUploading && (
            <p className="text-sm mt-2 font-medium text-center">
              {uploadedIndexes.length} photos uploaded
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-[644px]">
            {previews.map((src, index) => (
              <div
                key={index}
                className="relative border-2 border-neutralLight p-4 w-full h-[220px] shadow-sm rounded"
              >
                <button
                  onClick={() => setConfirmDeleteIndex(index)}
                  disabled={isUploading}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100 z-20"
                >
                  <img src="/other-icons/delete-icon-green.png" alt="Delete" />
                </button>

                <div className="relative w-full h-[130px] mb-2">
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
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <img src="/icons/green-tick.png" alt="Uploaded" className="h-8 w-8" />
                    </div>
                  )}
                </div>

                <p className="text-sm text-neutral text-center truncate w-full">
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
                // Since the parent component only triggers this when files > 0,
                // we safely proceed to upload here.
                setIsUploading(true);
                setShowUploadBox(false);
                
                selectedFiles.forEach((_, index) => {
                  // Simulate upload delay per file
                  setTimeout(() => {
                    setUploadedIndexes((prev) => [...prev, index]);
                    
                    // Check if this is the last file
                    if (index === selectedFiles.length - 1) {
                      // Final timeout to transition out of uploading state
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
                className="px-4 py-2 bg-neutralLight rounded"
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