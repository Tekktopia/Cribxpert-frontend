import { ratingIcons } from '@/assets';

const { starRate: star, blankStar: blankstar } = ratingIcons;

const StarRating = () => {
  return (
    <div>
      <div>
        <h1>
          4/ <span>5</span>
        </h1>
        <div>
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={blankstar} alt="" />
        </div>
        <p>1394 verifies ratings</p>
      </div>
    </div>
  );
};

export default StarRating;
