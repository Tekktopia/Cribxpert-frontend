import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetListingByIdQuery, useDeleteListingMutation } from '@/features/listing/listingService';
import { setCurrentListing } from '@/features/properties';
import PropertyGallery from '@/features/properties/components/PropertyGallery';
import PropertyOverview from '@/features/properties/components/PropertyOverview';
import PropertyDescription from '@/features/properties/components/PropertyDescription';
import AmenitiesSection from '@/features/properties/components/AmenitiesSection';
import PropertyRules, { Rule } from '@/features/properties/components/PropertyRules';

const MyListingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetListingByIdQuery(id!, { skip: !id });
  const [deleteListing, { isLoading: isDeleting }] = useDeleteListingMutation();

  const listing = data?.listing;

  useEffect(() => {
    if (listing) {
      dispatch(setCurrentListing(listing));
    }
    return () => {
      dispatch(setCurrentListing(null));
    };
  }, [dispatch, listing]);

  const handleEdit = () => {
    navigate('/my-listing', { state: { editListingId: id } });
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this listing? This cannot be undone.')) {
      return;
    }
    try {
      await deleteListing(id).unwrap();
      navigate('/my-listing', { replace: true });
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete listing. Please try again.');
    }
  };

  if (!id || isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-12 flex justify-center">
        <p className="text-gray-500">Loading listing...</p>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-12 flex flex-col items-center gap-4">
        <p className="text-gray-600">Listing not found or you don’t have access to it.</p>
        <button
          type="button"
          onClick={() => navigate('/my-listing')}
          className="text-[#1D5C5C] font-medium hover:underline"
        >
          Back to My Listings
        </button>
      </div>
    );
  }

  const propertyImages = (listing.listingImg || [])
    .map((img) => (typeof img === 'object' && img && 'fileUrl' in img ? (img as { fileUrl: string }).fileUrl : ''))
    .filter(Boolean);
  const images = propertyImages.length > 0 ? propertyImages : ['/images/property-image.jpeg'];

  type HouseRule =
    | string
    | { _id?: string; name: string; icon?: string | { fileUrl: string }; description?: string };
  const mappedRules: Rule[] = (listing.houseRules || []).map((rule: HouseRule) => {
    if (typeof rule === 'string') {
      return { icon: '/icons/bell.svg', title: rule, description: '' };
    }
    const iconUrl =
      typeof rule.icon === 'object' && rule.icon?.fileUrl
        ? rule.icon.fileUrl
        : '/icons/bell.svg';
    return {
      icon: iconUrl,
      title: rule.name,
      description: rule.description || '',
    };
  });

  const status = listing.status;
  const statusLabel =
    status === 'flagged'
      ? 'Flagged'
      : status === 'pending'
        ? 'Pending'
        : status === 'rejected' || listing.hideStatus
          ? 'Rejected'
          : 'Active';
  const statusClass =
    status === 'flagged'
      ? 'bg-amber-500 text-white'
      : status === 'pending'
        ? 'bg-amber-100 text-amber-800 border border-amber-300'
        : status === 'rejected' || listing.hideStatus
          ? 'bg-gray-500 text-white'
          : 'bg-[#1D5C5C] text-white';

  return (
    <section className="max-w-screen-xl mx-auto overflow-hidden pt-10 pb-12">
      {/* Back link and actions */}
      <div className="px-4 sm:px-6 lg:px-10 pt-6 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('/my-listing')}
          className="flex items-center gap-2 text-[#1D5C5C] font-medium hover:underline w-fit"
        >
          <span aria-hidden>←</span>
          Back to My Listings
        </button>
        <div className="flex items-center gap-3">
          <span
            className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full ${statusClass}`}
          >
            {statusLabel}
          </span>
          <button
            type="button"
            onClick={handleEdit}
            className="px-4 py-2 rounded-lg bg-[#1D5C5C] text-white text-sm font-medium hover:bg-[#155050] transition-colors"
          >
            Edit Listing
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {isDeleting ? 'Deleting...' : 'Delete Listing'}
          </button>
        </div>
      </div>

      <PropertyGallery images={images} propertyName={listing.name} />

      <div className="px-4 sm:px-6 lg:px-10 mt-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#040404] mb-2">
          {listing.name}
        </h1>
        {listing.city || listing.state || listing.country ? (
          <p className="text-sm text-[#6F6F6F] mb-4">
            {[listing.city, listing.state, listing.country].filter(Boolean).join(', ')}
          </p>
        ) : null}
      </div>

      <PropertyOverview />
      <section className="py-6 sm:py-8 px-4 sm:px-10">
        <PropertyDescription description={listing.description || ''} />
        <div className="mt-8">
          <h3 className="text-[#050505] font-medium text-lg sm:text-xl mb-4">
            Amenities
          </h3>
          <AmenitiesSection />
        </div>
        <div className="mt-10">
          <PropertyRules rules={mappedRules} />
        </div>
      </section>
    </section>
  );
};

export default MyListingDetailPage;
