import Title from '@/shared/components/ui/Title';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useGetListingsQuery,
  useCreateOrUpdateListingMutation,
  useDeleteListingMutation,
  useGetUserListingsQuery,
  type CreateListingRequest,
} from '@/features/properties';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { PropertyListing } from '@/types';
// import useAlert from '@/hooks/useAlert';

interface ListingFormData {
  name: string;
  description: string;
  propertyType: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  size: number;
  bedroomNo: number;
  bathroomNo: number;
  guestNo: number;
  amenities: string[];
  basePrice: number;
  securityDeposit: number;
  cleaningFee: number;
  avaliableFrom: string;
  avaliableUntil: string;
  houseRules: string;
  files?: File[];
}

type TitleType = 'success' | 'error' | 'info' | 'warning';

const ListingMgmtPage = () => {
  const [editingListing, setEditingListing] = useState<PropertyListing | null>(
    null
  );
  const [formData, setFormData] = useState<ListingFormData>({
    name: '',
    description: '',
    propertyType: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    size: 0,
    bedroomNo: 0,
    bathroomNo: 0,
    guestNo: 0,
    amenities: [],
    basePrice: 0,
    securityDeposit: 0,
    cleaningFee: 0,
    avaliableFrom: '',
    avaliableUntil: '',
    houseRules: '',
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const currentUser = useSelector(selectCurrentUser);
  // const showAlert = useAlert();
  const navigate = useNavigate();

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

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  // API hooks
  const { data: listingsData, isLoading: isLoadingListings } =
    useGetListingsQuery();
  const { data: userListings, isLoading: isLoadingUserListings } =
    useGetUserListingsQuery(undefined, {
      skip: !currentUser?._id,
    });
  const [createOrUpdateListing, { isLoading: isSaving }] =
    useCreateOrUpdateListingMutation();
  const [deleteListing, { isLoading: isDeleting }] = useDeleteListingMutation();

  const listings = userListings || listingsData?.listings || [];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((amenity) => amenity !== value),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const incomingFiles = Array.from(e.target.files);
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const filteredFiles = incomingFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );

    if (filteredFiles.length !== incomingFiles.length) {
      showModal(
        'warning',
        'Invalid File Type',
        'Only JPEG, PNG, or WEBP images are allowed. Please select valid image files.'
      );
    }

    setSelectedFiles(filteredFiles.slice(0, 5));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      propertyType: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      size: 0,
      bedroomNo: 0,
      bathroomNo: 0,
      guestNo: 0,
      amenities: [],
      basePrice: 0,
      securityDeposit: 0,
      cleaningFee: 0,
      avaliableFrom: '',
      avaliableUntil: '',
      houseRules: '',
    });
    setSelectedFiles([]);
    setEditingListing(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!currentUser?._id) {
        showModal(
          'error',
          'Authentication Required',
          'Please sign in to manage listings.',
          {
            label: 'Sign In',
            onClick: () => {
              closeModal();
              navigate('/login');
            },
          }
        );
        return;
      }

      const trimmedHouseRules = formData.houseRules
        .split(',')
        .map((rule) => rule.trim())
        .filter(Boolean);

      const payload: Partial<CreateListingRequest> & { id?: string } = {
        name: formData.name,
        description: formData.description,
        propertyType: formData.propertyType,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        size: formData.size,
        bedroomNo: formData.bedroomNo,
        bathroomNo: formData.bathroomNo,
        guestNo: formData.guestNo,
        amenities: formData.amenities,
        basePrice: formData.basePrice,
        securityDeposit: formData.securityDeposit,
        cleaningFee: formData.cleaningFee,
        avaliableFrom: formData.avaliableFrom,
        avaliableUntil: formData.avaliableUntil,
        userId: currentUser._id,
        ...(trimmedHouseRules.length > 0 && { houseRules: trimmedHouseRules }),
        ...(editingListing && { id: editingListing._id }),
        ...(selectedFiles.length > 0 && { files: selectedFiles.slice(0, 5) }),
      };

      await createOrUpdateListing(payload).unwrap();

      showModal(
        'success',
        editingListing ? 'Listing Updated!' : 'Listing Created!',
        editingListing
          ? 'Your listing has been updated successfully.'
          : 'Your new listing has been created successfully.'
      );
      resetForm();
    } catch (error) {
      console.error('Error saving listing:', error);
      showModal(
        'error',
        'Save Failed',
        'Failed to save listing. Please check your information and try again.',
        {
          label: 'Try Again',
          onClick: closeModal,
        }
      );
    }
  };

  const handleEdit = (listing: PropertyListing) => {
    setEditingListing(listing);
    // Extract property type ID
    const propertyTypeId = typeof listing.propertyType === 'string' 
      ? listing.propertyType 
      : (typeof listing.propertyType === 'object' && listing.propertyType !== null && '_id' in listing.propertyType
        ? (listing.propertyType as { _id: string })._id
        : '');
    // Extract amenity IDs
    const amenityIds = listing.amenities.map((amenity) => 
      typeof amenity === 'string' 
        ? amenity 
        : (typeof amenity === 'object' && amenity !== null && '_id' in amenity
          ? (amenity as { _id: string })._id
          : '')
    );
    setFormData({
      name: listing.name,
      description: listing.description,
      propertyType: propertyTypeId,
      street: listing.street,
      city: listing.city,
      state: listing.state,
      postalCode: listing.postalCode,
      country: listing.country,
      size: listing.size,
      bedroomNo: listing.bedroomNo,
      bathroomNo: listing.bathroomNo,
      guestNo: listing.guestNo,
      amenities: amenityIds,
      basePrice: listing.basePrice,
      securityDeposit: listing.securityDeposit,
      cleaningFee: listing.cleaningFee,
      avaliableFrom: listing.avaliableFrom,
      avaliableUntil: listing.avaliableUntil,
      houseRules: listing.houseRules?.join(', ') || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (listingId: string) => {
    showModal(
      'warning',
      'Delete Listing',
      'Are you sure you want to delete this listing? This action cannot be undone and all associated data will be permanently removed.',
      {
        label: 'Delete',
        onClick: () => handleDeleteConfirm(listingId),
      },
      {
        label: 'Cancel',
        onClick: closeModal,
      }
    );
  };

  const handleDeleteConfirm = async (listingId: string) => {
    closeModal();
    try {
      await deleteListing(listingId).unwrap();
      showModal(
        'success',
        'Listing Deleted',
        'The listing has been deleted successfully.'
      );
    } catch (error) {
      console.error('Error deleting listing:', error);
      showModal(
        'error',
        'Delete Failed',
        'Failed to delete listing. Please try again.',
        {
          label: 'Try Again',
          onClick: closeModal,
        }
      );
    }
  };

  const handleView = (listing: PropertyListing) => {
    navigate(`/propertydetail/${listing.name.replace(/\s+/g, '-')}`);
  };

  if (isLoadingListings || isLoadingUserListings) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1d5c5c] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Listing Management Dashboard
          </h1>
          <p className="mt-2 text-gray-600">Manage your property listings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingListing ? 'Edit Listing' : 'Create New Listing'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Basic Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type *
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                  >
                    <option value="">Select Property Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="condo">Condo</option>
                  </select>
                </div>

                {/* Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                    />
                  </div>
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size (sq ft) *
                    </label>
                    <input
                      type="number"
                      name="size"
                      value={formData.size}
                      onChange={handleNumberInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Guests *
                    </label>
                    <input
                      type="number"
                      name="guestNo"
                      value={formData.guestNo}
                      onChange={handleNumberInputChange}
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bedrooms *
                    </label>
                    <input
                      type="number"
                      name="bedroomNo"
                      value={formData.bedroomNo}
                      onChange={handleNumberInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bathrooms *
                    </label>
                    <input
                      type="number"
                      name="bathroomNo"
                      value={formData.bathroomNo}
                      onChange={handleNumberInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                    />
                  </div>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Base Price *
                    </label>
                    <input
                      type="number"
                      name="basePrice"
                      value={formData.basePrice}
                      onChange={handleNumberInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Security Deposit
                    </label>
                    <input
                      type="number"
                      name="securityDeposit"
                      value={formData.securityDeposit}
                      onChange={handleNumberInputChange}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cleaning Fee
                    </label>
                    <input
                      type="number"
                      name="cleaningFee"
                      value={formData.cleaningFee}
                      onChange={handleNumberInputChange}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                    />
                  </div>
                </div>

                {/* Availability */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available From *
                    </label>
                    <input
                      type="date"
                      name="avaliableFrom"
                      value={formData.avaliableFrom}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Until *
                    </label>
                    <input
                      type="date"
                      name="avaliableUntil"
                      value={formData.avaliableUntil}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                    />
                  </div>
                </div>

                {/* House Rules */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    House Rules
                  </label>
                  <textarea
                    name="houseRules"
                    value={formData.houseRules}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                    placeholder="Enter house rules separated by commas"
                  />
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'WiFi',
                      'Air Conditioning',
                      'Kitchen',
                      'Parking',
                      'Washer',
                      'Dryer',
                      'Bathroom',
                    ].map((amenity) => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          value={amenity.toLowerCase()}
                          checked={formData.amenities.includes(
                            amenity.toLowerCase()
                          )}
                          onChange={handleAmenitiesChange}
                          className="mr-2"
                        />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 bg-[#1d5c5c] text-white py-2 px-4 rounded-md hover:bg-[#1d5c5c]/90 disabled:opacity-50"
                  >
                    {isSaving
                      ? 'Saving...'
                      : editingListing
                        ? 'Update Listing'
                        : 'Create Listing'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Listings Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">
                  Your Listings ({listings.length})
                </h2>
              </div>

              <div className="p-6">
                {listings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No listings found. Create your first listing!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {listings.map((listing) => (
                      <div
                        key={listing._id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {listing.name}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {listing.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span>
                                {listing.city}, {listing.state}
                              </span>
                              <span>
                                {listing.bedroomNo} bed, {listing.bathroomNo}{' '}
                                bath
                              </span>
                              <span>${listing.basePrice}/night</span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleView(listing)}
                              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEdit(listing)}
                              className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(listing._id)}
                              disabled={isDeleting}
                              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default ListingMgmtPage;
