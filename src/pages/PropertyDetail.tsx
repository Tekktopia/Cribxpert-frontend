import bedroom from '@/assets/icons/bedroom.png';
import guest from '@/assets/icons/guest.png';
import house from '@/assets/icons/house.png';
import iconStarLight from '@/assets/icons/Icon-star-light.png';
import progressOne from '@/assets/icons/progressFirsr.png';
import progressTwo from '@/assets/icons/progressTwo.png';
import progressThree from '@/assets/icons/progressThree.png';
import progressFour from '@/assets/icons/progressFour.png';
import progressFive from '@/assets/icons/progressFive.png';
import star from '@/assets/icons/star.png';
import AmenitiesSection from '@/components/AmenitiesSection';
import BookinForm from '@/components/BookingForm';
import bathroom from '@/assets/icons/bathroom.png';
import kingBed from '@/assets/images/kingBed.png';
import doubleBed from '@/assets/images/doubleBed.png';
import Share from '@/assets/icons/share.png';
import GalleryOne from '@/assets/images/galleryOne.jpeg';
import GalleryTwo from '@/assets/images/GallerTwo.jpeg';
import GalleryThree from '@/assets/images/GalleryThree.jpeg';
import GalleryFour from '@/assets/images/GalleryFour.jpeg';
import GalleryFive from '@/assets/images/GalleryFive.png';
import Header from '@/components/layout/Header';
import airportStation from '@/assets/icons/airport-station.png';
import arrowright from '@/assets/icons/arrow-right.png';
import map from '@/assets/images/map.png';
import location from '@/assets/icons/location.png';
import carIcon from '@/assets/icons/Car-icon.png';

const PropertyDetail: React.FC = () => {
  return (
    <section className="m-5 w-full  ">
      <Header />
      {/*Image Gallery Section*/}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="relative">
          <img
            src={GalleryFour}
            alt="Gallery Four"
            className="w-[345px] md:w-[554px] h-auto max-h-[340px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        {/* Grid for Small Images */}
        <div className="grid grid-cols-2 gap-4">
          {[GalleryOne, GalleryTwo, GalleryThree, GalleryFive].map(
            (src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  className="w-full h-auto max-w-[300px] max-h-[244px] object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="px-10 m-5">
        <div className="flex md:flex-row flex-col justify-between items-center">
          <div className="flex flex-col gap-y-2">
            <h1 className="font-[400] text-[25px] text-[#040404]">
              Makinwaa's Cottage- Newly Remodeled
            </h1>
            <p className="font-[400] text-[14px] text-[#040404]">
              ⭐4.5{' '}
              <span className="text-[#6f6f6f] font-[400] text-[16px]">
                [115 verified positive feedbacks]
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 md:mt-0 mt-2">
            <div className="rounded-[200px] px-6 py-3 bg-[#e6e6e6]">
              <div className="flex items-center gap-2">
                <p className="text-[#070707] font-[400] text-[14px] text-center">
                  Save
                </p>
              </div>
            </div>
            <div className="rounded-[200px] px-6 py-3 bg-[#e6e6e6]">
              <div className="flex items-center gap-2">
                <img src={Share} className="w-[20px] h-[20px]" alt="Share" />
                <p className="text-[#070707] font-[400] text-[14px]">Share</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-6 px-10">
        <div className="m-4 flex flex-row items-center gap-3">
          <img src={bedroom} alt="Bedroom" className="w-[20px] h-[20px]" />
          <p className="text-[#313131] font-[400] text-[14px]">3 bedroom</p>

          <img src={bathroom} alt="bathroom" className="w-[20px] h-[20px]" />
          <p className="text-[#313131] font-[400] text-[14px]">3 bathroom</p>

          <img src={guest} alt="guest" className="w-[20px] h-[20px]" />
          <p className="text-[#313131] font-[400] text-[14px]">6 guest</p>

          <img src={house} alt="guest" className="w-[20px] h-[20px]" />
          <p className="text-[#313131] font-[400] text-[14px]">100 sq ft</p>
        </div>
      </section>

      <section className="py-6 px-10">
        <div className="flex flex-col md:flex-row justify-around gap-8">
          <div className="md:w-1/2">
            <AmenitiesSection />
            <section className="py-8">
              <h3 className="font-[500] text-[16px] mb-5">Explore the area</h3>

              <div className="flex items-center gap-8">
                <div className="w-[400px]">
                  <img src={map} alt="Map" className="w-full  h-[318px]" />
                  <div className="mt-3">
                    <p className="font-[400] text-[14px] text-[#313131]">
                      Federal Capital Territory Gombe
                    </p>
                    <p>
                      View in map{' '}
                      <span>
                        <img
                          src={arrowright}
                          alt="arrow-right"
                          className="w-[16px] h-[16px]"
                        />
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  {/* Location Item 1 */}
                  <div className="flex items-center gap-3">
                    <img
                      src={location}
                      alt="location"
                      className="w-[20px] h-[20px]"
                    />
                    <div>
                      <p className="font-[400] text-[14px] text-[#6F6F6F]">
                        Trans Amusement Children's Museum
                      </p>
                      <p className="font-[400] text-[14px] text-[#999999]">
                        2 min walk
                      </p>
                    </div>
                  </div>

                  {/* Location Item 2 */}
                  <div className="flex items-center gap-3">
                    <img
                      src={location}
                      alt="location"
                      className="w-[20px] h-[20px]"
                    />
                    <div>
                      <p className="font-[400] text-[14px] text-[#6F6F6F]">
                        Ventura Mall
                      </p>
                      <p className="font-[400] text-[14px] text-[#999999]">
                        10 min walk
                      </p>
                    </div>
                  </div>

                  {/* Location Item 3 */}
                  <div className="flex items-center gap-3">
                    <img
                      src={airportStation}
                      alt="airport"
                      className="w-[20px] h-[20px]"
                    />
                    <div>
                      <p className="font-[400] text-[14px] text-[#6F6F6F]">
                        National Airport Station
                      </p>
                      <p className="font-[400] text-[14px] text-[#999999]">
                        24 min walk
                      </p>
                    </div>
                  </div>

                  {/* See More Link */}
                  <p className="text-[#E0E0E0] flex items-center gap-2 cursor-pointer">
                    See more about area
                    <img
                      src={arrowright}
                      alt="arrow-right"
                      className="w-[16px] h-[16px]"
                    />
                  </p>
                </div>
              </div>
            </section>
            <section className="py-12">
              <h2 className="text-[#050505] md:text-xl text-lg mb-5 text-bold">
                Where you sleep
              </h2>
              <div>
                <div className="flex items-center gap-4">
                  <div>
                    <img
                      src={kingBed}
                      alt="kingBed"
                      className="w-full h-auto "
                    />
                    <div className="mt-3">
                      <p className="text-[#6F6F6F] font-[400] text-[14px]">
                        Bedroom 1 -1 King Bed
                      </p>
                      <p className="text-[#6F6F6F] font-[400] text-[14px]">
                        Soap · Towels provided · Toilet · Hair dryer
                      </p>
                    </div>
                  </div>
                  <div>
                    <img
                      src={doubleBed}
                      alt="doubleBed"
                      className="w-full  h-auto"
                    />
                    <div className="mt-3">
                      <p className="text-[#6F6F6F] font-[400] text-[14px]">
                        Bedroom 1 -1 King Bed
                      </p>
                      <p className="text-[#6F6F6F] font-[400] text-[14px]">
                        Soap · Towels provided · Toilet · Hair dryer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="py-6">
              <h3 className="font-[500] text-[#050505] text-[16px]">
                About this property
              </h3>
              <p className="mt-3 mb-5 text-[14px] text-[#313131] font-[400] leading-7">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In est
                nisl, dictum at ante nec, rutrum finibus odio. Pellentesque
                pulvinar, justo venenatis pulvinar feugiat, tortor nunc cursus
                elit, sit amet porttitor turpis ante a lacus. Sed blandit lectus
                odio. Vestibulum consequat a ante vel pulvinar. Mauris efficitur
                eros convallis nisi venenatis, vel aliquam leo interdum. Proin
                vel dapibus ipsum. Nulla vel urna id erat pretium rhoncus. Morbi
                maximus tellus a urna commodo, at pharetra mauris cursus. In hac
                habitasse platea dictumst. Nunc odio nisi, dignissim sed mauris
                ac, accumsan finibus nisl. Nullam aliquam at neque a lacinia. Ut
                euismod mi in metus pharetra pellentesque. Nullam in diam
                consectetur, vulputate metus non, volutpat elit
              </p>
              <p className="text-[#6F6F6F] font-[400] text-[14px]">see more</p>
            </section>

            {/* Add other sections here */}
          </div>
          <div className="md:w-1/2">
            <BookinForm />
          </div>
        </div>
      </section>
      <section className="w-full bg-[#FBFBFB]">
        {/* House Rules Section */}
        <div className="py-8 px-4 md:px-10">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-8">
            <h2 className="text-[20px] text-[#040404] font-[400]">
              House Rules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-[600px] place-items-center ">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <img
                    src={carIcon}
                    alt="carIcon"
                    className="w-[18px] h-[18px]"
                  />
                  <p className="text-[#6F6F6F] font-[400] text-[14px]">
                    Check In
                  </p>
                </div>
                <p className="text-[#6F6F6F] font-[400] text-[14px]">
                  Check in after 3:00PM
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src={carIcon}
                    alt="carIcon"
                    className="w-[18px] h-[18px]"
                  />
                  <p className="text-[#6F6F6F] font-[400] text-[14px]">Pets</p>
                </div>
                <p className="text-[#6F6F6F] font-[400] text-[14px]">
                  No pets allowed
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src={carIcon}
                    alt="carIcon"
                    className="w-[18px] h-[18px]"
                  />
                  <p className="text-[#6F6F6F] font-[400] text-[14px]">Age</p>
                </div>
                <p className="text-[#6F6F6F] font-[400] text-[14px]">
                  Minimum age to rent: 18
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <img
                    src={carIcon}
                    alt="carIcon"
                    className="w-[18px] h-[18px]"
                  />
                  <p className="text-[#6F6F6F] font-[400] text-[14px]">
                    Check Out
                  </p>
                </div>
                <p className="text-[#6F6F6F] font-[400] text-[14px]">
                  Check out before 11:00AM
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src={carIcon}
                    alt="carIcon"
                    className="w-[18px] h-[18px]"
                  />
                  <p className="text-[#6F6F6F] font-[400] text-[14px]">
                    Smoking
                  </p>
                </div>
                <p className="text-[#6F6F6F] font-[400] text-[14px]">
                  No smoking allowed
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src={carIcon}
                    alt="carIcon"
                    className="w-[18px] h-[18px]"
                  />
                  <p className="text-[#6F6F6F] font-[400] text-[14px]">
                    Parties
                  </p>
                </div>
                <p className="text-[#6F6F6F] font-[400] text-[14px]">
                  No parties or events
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Damage and Incidentals Section */}
        <div className="py-7 px-4 md:px-10">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-8">
            <div>
              <h2 className="text-[20px] text-[#040404] font-[400]">
                Damage and incidentals
              </h2>
            </div>
            <div className="max-w-[800px]">
              <p className="text-[#6F6F6F] text-[14px]">
                You will be responsible for any damage to the rental property
                caused by you or your party during your stay, including but not
                limited to broken items, stains, or structural harm. Please
                report any accidents or damages immediately to ensure prompt
                resolution.
              </p>
            </div>
          </div>
        </div>

        {/* Cancellation Section */}
        <div className="py-4 px-4 md:px-10">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-8">
            <div>
              <h2 className="text-[20px] text-[#040404] font-[400]">
                Cancellation
              </h2>
            </div>
            <div className="flex flex-col gap-4 max-w-[800px]">
              <div className="mb-6">
                <p className="text-[#6F6F6F] text-[14px]">
                  Before Jan 17 [FULL REFUND]
                </p>
                <p className="text-[#6F6F6F] text-[14px]">
                  Cancel your reservation before Jan 17 at 11:59 PM, and you'll
                  get a full refund. Times are based on the property's local
                  time.
                </p>
              </div>
              <div className="mb-6">
                <p className="text-[#6F6F6F] text-[14px]">
                  Before Jan 24 [PARTIAL REFUND]
                </p>
                <p className="text-[#6F6F6F] text-[14px]">
                  If you cancel your reservation before Jan 24 at 11:59 PM,
                  you'll get a refund of 50% of the amount paid (minus the
                  service fee). Times are based on the property's local time.
                </p>
              </div>
              <div className="mb-6">
                <p className="text-[#6F6F6F] text-[14px]">
                  After Jan 24 [NO REFUND]
                </p>
                <p className="text-[#6F6F6F] text-[14px]">
                  After that, you won't get a refund.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information Section */}
        <div className="py-7 px-4 md:px-10">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-8">
            <div>
              <h2 className="text-[20px] text-[#040404] font-[400]">
                Important information
              </h2>
            </div>
            <div className="max-w-[800px]">
              <p className="text-[#6F6F6F] text-[14px]">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.
              </p>
            </div>
          </div>
        </div>
        <div className="py-4 px-4 md:px-10">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-8">
            <div>
              <h2 className="text-[20px] text-[#040404] font-[400]">
                Verifies Ratings (1394)
              </h2>
            </div>

            <div className="w-[286px] h-[246px] bg-[#F1F1F2] rounded-md flex justify-center items-center">
              <div className="flex flex-col justify-center items-center mx-auto">
                <h2 className="mb-3 text-2xl">
                  <span className="text-[#050505] font-[500]">4</span>/5
                </h2>
                <div className="flex items-center gap-2">
                  <img src={star} alt="star" className="w-[18px] h-[18px]" />
                  <img src={star} alt="star" className="w-[18px] h-[18px]" />
                  <img src={star} alt="star" className="w-[18px] h-[18px]" />
                  <img src={star} alt="star" className="w-[18px] h-[18px]" />
                </div>

                <p className="text-[#313131] text-[14px] font-[500] mt-3">
                  1394 verifies ratings
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 mx-auto">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <img src={star} alt="star" className="w-[18px] h-[18px]" />
                  <img src={star} alt="star" className="w-[18px] h-[18px]" />
                  <img src={star} alt="star" className="w-[18px] h-[18px]" />
                  <img src={star} alt="star" className="w-[18px] h-[18px]" />
                  <img src={star} alt="star" className="w-[18px] h-[18px]" />
                  <p className="text-[#6F6F6F] text-[14px] font-[400]">(923)</p>
                </div>

                <img src={progressOne} alt="" className="w-[472px] h-[4px]" />
              </div>
              <div className="flex items-center gap-2">
                <img src={star} alt="star" className="w-[18px] h-[18px]" />
                <img src={star} alt="star" className="w-[18px] h-[18px]" />
                <img src={star} alt="star" className="w-[18px] h-[18px]" />
                <img src={star} alt="star" className="w-[18px] h-[18px]" />
                <img
                  src={iconStarLight}
                  alt="star"
                  className="w-[18px] h-[18px]"
                />
                <p className="text-[#6F6F6F] text-[14px] font-[400]">(602)</p>
              </div>
              <img src={progressTwo} alt="" className="w-[472px] h-[4px]" />

              <div className="flex items-center gap-2">
                <img src={star} alt="star" className="w-[18px] h-[18px]" />
                <img src={star} alt="star" className="w-[18px] h-[18px]" />
                <img src={star} alt="star" className="w-[18px] h-[18px]" />
                <img
                  src={iconStarLight}
                  alt="star"
                  className="w-[18px] h-[18px]"
                />
                <img
                  src={iconStarLight}
                  alt="star"
                  className="w-[18px] h-[18px]"
                />
                <p className="text-[#6F6F6F] text-[14px] font-[400]">(336)</p>
              </div>
              <img src={progressThree} alt="" className="w-[472px] h-[4px]" />

              <div className="flex items-center gap-2">
                <img src={star} alt="star" className="w-[18px] h-[18px]" />
                <img src={star} alt="star" className="w-[18px] h-[18px]" />
                <img
                  src={iconStarLight}
                  alt="star"
                  className="w-[18px] h-[18px]"
                />
                <img
                  src={iconStarLight}
                  alt="star"
                  className="w-[18px] h-[18px]"
                />
                <img
                  src={iconStarLight}
                  alt="star"
                  className="w-[18px] h-[18px]"
                />
                <p className="text-[#6F6F6F] text-[14px] font-[400]">(216)</p>
              </div>
              <img src={progressFour} alt="" className="w-[472px] h-[4px]" />

              <div className="flex items-center gap-2">
                <img src={star} alt="star" className="w-[18px] h-[18px]" />
                <img
                  src={iconStarLight}
                  alt="star"
                  className="w-[18px] h-[18px]"
                />
                <img
                  src={iconStarLight}
                  alt="star"
                  className="w-[18px] h-[18px]"
                />
                <img
                  src={iconStarLight}
                  alt="star"
                  className="w-[18px] h-[18px]"
                />
                <img
                  src={iconStarLight}
                  alt="star"
                  className="w-[18px] h-[18px]"
                />
                <p className="text-[#6F6F6F] text-[14px] font-[400]">(96)</p>
              </div>
              <img src={progressFive} alt="" className="w-[472px] h-[4px]" />
            </div>
            <div></div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default PropertyDetail;
