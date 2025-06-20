import { ArrowLeft, Settings2Icon, XIcon } from 'lucide-react';
type FilterPanelProps = {
  isOpen: boolean;
  handleToggle: () => void;
};
export default function FilterPanel({
  isOpen,
  handleToggle,
}: FilterPanelProps) {
  return (
    <div
      className={`${isOpen ? '-translate-x-0 w-full lg:w-1/4 lg:max-w-[276px] ' : '-translate-x-full w-full'} h-fit transition-all duration-200 p-4 pb-8 xl:pb-0 z-30 top-0 bg-white absolute lg:sticky border-r-[1px] md:pr-2`}
    >
      {isOpen && (
        <div className="relative">
          <div className="sticky top-0 z-10 bg-white pt-4">
            <div className="flex pb-4 justify-between">
              <span className="flex">
                <Settings2Icon />
                Filters
              </span>

              <button
                className="flex hover:cursor-pointer"
                onClick={handleToggle}
              >
                <ArrowLeft className="-mr-1 hidden lg:block" />
                <XIcon className="-mr-1 lg:hidden" />
              </button>
            </div>
          </div>

          <div className="filters overflow-y-scroll scrollbar-hide h-fit max-h-screen xl:pb-0">
            <div className="space-y-4 mt-4">
              {/* Reusable style */}
              {[
                {
                  title: 'Booking Availability',
                  content: (
                    <div className="space-y-1 mt-2 bg-white p-2">
                      {Array(5)
                        .fill('Option Text Here')
                        .map((text, idx) => (
                          <label
                            key={idx}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="radio"
                              name="booking"
                              className="accent-teal-500"
                            />
                            <span>{text}</span>
                          </label>
                        ))}
                    </div>
                  ),
                },
                {
                  title: 'Amenities',
                  content: (
                    <div className="space-y-1 mt-2 bg-white p-2">
                      {[
                        'Parking available',
                        'Washer',
                        'Air conditioning',
                        'Kitchen',
                        '24/7 WiFi connection',
                      ].map((amenity, idx) => (
                        <label
                          key={idx}
                          className="flex items-center space-x-2"
                        >
                          <input type="checkbox" className="accent-teal-500" />
                          <span>{amenity}</span>
                        </label>
                      ))}
                    </div>
                  ),
                },
                {
                  title: 'Price Range',
                  content: (
                    <div className="space-y-2 mt-2 bg-white p-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Min price"
                          className="w-1/2 border rounded p-1 text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Max price"
                          className="w-1/2 border rounded p-1 text-sm"
                        />
                      </div>
                      {[
                        'Under 100k',
                        '100k - 500k',
                        '500k - 2M',
                        'More than 2M',
                      ].map((range, idx) => (
                        <label
                          key={idx}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            name="price"
                            className="accent-teal-500"
                          />
                          <span>{range}</span>
                        </label>
                      ))}
                    </div>
                  ),
                },
                {
                  title: 'Rating',
                  content: (
                    <div className="space-y-2 mt-2 bg-white p-2">
                      {[5, 4, 3, 2, 1].map((stars, idx) => (
                        <label
                          key={idx}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            name="rating"
                            className="accent-teal-500"
                          />
                          <span>
                            <span className="text-yellow-400">
                              {'★'.repeat(stars)}
                            </span>
                            <span className="text-gray-300">
                              {'★'.repeat(5 - stars)}
                            </span>
                            <span className="ml-2 text-sm text-gray-500">
                              (200)
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  ),
                },
                {
                  title: 'Location',
                  content: (
                    <div className="mt-2 bg-white p-2">
                      <input
                        type="text"
                        value="Lagos, Nigeria"
                        readOnly
                        className="w-full border rounded p-1 text-sm bg-gray-100"
                      />
                    </div>
                  ),
                },
              ].map(({ title, content }, i) => (
                <details
                  key={i}
                  open
                  className="rounded-md border pt-2 bg-[#F1E6F199]"
                >
                  <summary className="flex justify-between items-center cursor-pointer font-medium">
                    <span className="px-2">{title}</span>
                    <svg
                      className="w-4 h-4 transform transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  {content}
                </details>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <button className="border px-4 py-2 rounded">Cancel</button>
            <button className="bg-[#1D5C5C] text-white px-4 py-2 rounded">
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
