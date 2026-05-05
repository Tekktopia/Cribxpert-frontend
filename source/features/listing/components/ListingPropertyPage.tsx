import React, { useEffect, useState } from 'react';
import { useDeleteListingImageMutation } from '@/features/listing/listingService';
import Title from '@/shared/components/ui/Title';

type TitleType = 'success' | 'error' | 'info' | 'warning';

interface ExistingImage {
  _id: string;
  fileUrl: string;
  fileName?: string;
}

interface ListingPropertyPageProps {
  nextStep: () => void;
  prevStep: () => void;
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  uploadCompleted: boolean;
  setUploadCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  existingImages?: ExistingImage[];
  listingId?: string;
  onImageDeleted?: () => void;
}

const ListingPropertyPage: React.FC<ListingPropertyPageProps> = ({
  isUploading,
  setIsUploading,
  uploadCompleted,
  setUploadCompleted,
  selectedFiles,
  setSelectedFiles,
  existingImages = [],
  listingId,
  onImageDeleted,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [showUploadBox, setShowUploadBox] = useState(true);
  const [uploadedIndexes, setUploadedIndexes] = useState<number[]>([]);
  // const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);
  // const [confirmDeleteImageId, setConfirmDeleteImageId] = useState<string | null>(null);
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);
  
  const [deleteListingImage, { isLoading: isDeletingImage }] = useDeleteListingImageMutation();

  const handleFileClick = () => {
    document.getElementById('file-upload')?.click();
  };

  // modal state for title comp
    const [modal, setModal] = useState<{
      isOpen: boolean;
      type: TitleType;
      title: string;
      message: string;
      primaryAction?: { label: string; onClick: () => void };
      secondaryAction?: { label: string; onClick: () => void };
    }>({
      isOpen: false,
      type: 'info',
      title: '',
      message: '',
    });
  
    // helper func to show modal
    const showModal = (
      type: TitleType,
      title: string,
      message: string,
      primaryAction?: { label: string; onClick: () => void },
      secondaryAction?: { label: string; onClick: () => void }
    ) => {
      setModal({
        isOpen: true,
        type,
        title,
        message,
        primaryAction,
        secondaryAction,
      });
    };
  
    // Helper function to close modal
    const closeModal = () => {
      setModal((prev) => ({ ...prev, isOpen: false }));
    };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).filter((file) =>
      ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)
    );
    if (newFiles.length !== Array.from(files).length) {
      showModal(
        'warning',
        'Invalid File Type',
        'Only JPEG, PNG, or WEBP images are allowed. Please select valid image files.'
      );
    }
    setSelectedFiles((prev) => {
      const currentTotal = existingImages.length + prev.length;
      const maxNewFiles = 5 - currentTotal;
      const filesToAdd = newFiles.slice(0, Math.max(0, maxNewFiles));
      if (filesToAdd.length < newFiles.length) {
        showModal(
          'warning',
          'Maximum Images Reached',
          `Maximum of 5 images allowed. You can add ${maxNewFiles} more image${maxNewFiles === 1 ? '' : 's'}.`
        );
      }
      return [...prev, ...filesToAdd];
    });
  };

  // Handle delete confirmation for new files
  const handleDeleteNewFileClick = (index: number) => {
    showModal(
      'warning',
      'Delete Photo',
      'Are you sure you want to delete this photo?',
      {
        label: 'Delete',
        onClick: () => {
          handleDelete(index);
          closeModal();
        },
      },
      {
        label: 'Cancel',
        onClick: closeModal,
      }
    );
  };

  // Handle delete confirmation for existing images
  const handleDeleteExistingClick = (imageId: string) => {
    showModal(
      'warning',
      'Delete Photo',
      'Are you sure you want to delete this photo? This action cannot be undone.',
      {
        label: isDeletingImage ? 'Deleting...' : 'Delete',
        onClick: () => handleDeleteExistingImage(imageId),
      },
      {
        label: 'Cancel',
        onClick: closeModal,
      }
    );
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

  const handleDeleteExistingImage = async (imageId: string) => {
    if (!listingId) return;
    
    try {
      setDeletingImageId(imageId);
      await deleteListingImage({ listingId, imageId }).unwrap();
      if (onImageDeleted) {
        onImageDeleted();
      }
      closeModal();
      // Show success modal after delete
      showModal(
        'success',
        'Image Deleted',
        'The image has been deleted successfully.'
      );
    } catch (error) {
      console.error('Error deleting image:', error);
      showModal(
        'error',
        'Delete Failed',
        'Failed to delete image. Please try again.',
        {
          label: 'Try Again',
          onClick: closeModal,
        }
      );
    } finally {
      setDeletingImageId(null);
    }
  };

  useEffect(() => {
    const objectUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  const totalImages = existingImages.length + selectedFiles.length;
  const canAddMore = totalImages < 5;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Upload Box */}
      {showUploadBox && canAddMore && (
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
            disabled={!canAddMore}
            type="button"
            onClick={handleFileClick}
            className="mt-4 px-4 py-2 bg-primary text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Select Photos ({totalImages}/5)
          </button>
        </div>
      )}

      {/* Preview Section */}
      {(existingImages.length > 0 || selectedFiles.length > 0) && (
        <>
          {!isUploading && !uploadCompleted && (
            <p className="text-sm text-neutral mt-4 font-bold text-center">
              Photos: ({totalImages}/5)
            </p>
          )}
          {isUploading && (
            <p className="text-sm mt-2 font-medium text-center">
              {uploadedIndexes.length} photos uploaded
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-[644px]">
            {/* Existing Images */}
            {existingImages.map((image, index) => (
              <div
                key={image._id}
                className="relative border-2 border-neutralLight p-4 w-full h-[220px] shadow-sm rounded"
              >
                <button
                  onClick={() => handleDeleteExistingClick(image._id)}
                  disabled={isDeletingImage && deletingImageId === image._id}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100 z-20 disabled:opacity-50"
                >
                  <img src="/other-icons/delete-icon-green.png" alt="Delete" />
                </button>

                <div className="relative w-full h-[130px] mb-2">
                  <img
                    src={image.fileUrl}
                    alt={`Existing ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />

                  {isDeletingImage && deletingImageId === image._id && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-md z-10">
                      <div className="loader border-white h-6 w-6 animate-spin rounded-full border-4 border-t-transparent" />
                    </div>
                  )}
                </div>

                <p className="text-sm text-neutral text-center truncate w-full">
                  {image.fileName || `Image ${index + 1}`}
                </p>
                <p className="text-xs text-gray-500 text-center mt-1">Existing</p>
              </div>
            ))}

            {/* New Files */}
            {previews.map((src, index) => (
              <div
                key={`new-${index}`}
                className="relative border-2 border-neutralLight p-4 w-full h-[220px] shadow-sm rounded"
              >
                <button
                  onClick={() => handleDeleteNewFileClick(index)}
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
                <p className="text-xs text-blue-500 text-center mt-1">New</p>
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

      {/* Delete Confirmation Modal for New Files */}
      {/* {confirmDeleteIndex !== null && (
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
      )} */}

      {/* Delete Confirmation Modal for Existing Images */}
      {/* {confirmDeleteImageId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Delete Photo</h2>
            <p className="mb-6">Are you sure you want to delete this photo? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setConfirmDeleteImageId(null)}
                disabled={isDeletingImage}
                className="px-4 py-2 bg-neutralLight rounded disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteExistingImage(confirmDeleteImageId!)}
                disabled={isDeletingImage}
                className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
              >
                {isDeletingImage ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )} */}

      <Title
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        primaryAction={modal.primaryAction}
        secondaryAction={modal.secondaryAction}
      />
    </div>
  );
};

export default ListingPropertyPage;