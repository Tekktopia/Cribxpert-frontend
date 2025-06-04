import React from 'react';
import star from '../../assets/icons/star-rate.svg';
import blankstar from '../../assets/icons/blank-star.svg';

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
