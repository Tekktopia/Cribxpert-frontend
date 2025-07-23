import { useEffect, useState } from 'react';

const ListingPropertyPage: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleFileClick = () => {
        document.getElementById('file-upload')?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedFiles((prevFiles) => {
        const combined = [...prevFiles, ...newFiles];
        // Only allow up to 6 total
        return combined.slice(0, 6);
    });
};

    // Generate preview URLs
    useEffect(() => {
        const objectUrls = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviews(objectUrls);

        return () => {
            objectUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [selectedFiles]);

    return (
        <div className="flex flex-col items-center justify-center">
            {/* Upload Box */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 w-[644px] h-[316px]">
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

            {/* File Previews */}
            {selectedFiles.length > 0 && (
                <>
                    <p className="text-sm text-gray-700 mt-4 font-bold text-center">Selected Photos:
                        ({selectedFiles.length}/6)
                    </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    {selectedFiles.map((file, index) => (
                        <div
                        key={index}
                        className="flex flex-col items-center justify-center border-2 border-gray-200 p-4 w-[300px] h-[250px] shadow-sm rounded"
                        >
                            <img
                                src={previews[index]}
                                alt={file.name}
                                className="mb-2 w-full h-32 object-cover rounded-md"
                                />
                            <p className="text-sm text-gray-700 text-center truncate w-full">{file.name}</p>
                        </div>
                    ))}
                </div>
                    </>
            )}
        </div>
    );
};

export default ListingPropertyPage;
