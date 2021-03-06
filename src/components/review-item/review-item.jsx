import React, {Fragment} from "react";
import {ReviewByIdPropTypes} from "../../propTypes";
import {RATING_MULTIPLIER} from '../../const';
import {dateConverter} from "../../utils";

const ReviewItem = (props) => {
  const {review} = props;

  const dateData = dateConverter.format(new Date(review.date));

  return (
    <Fragment>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatar} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${review.rating * RATING_MULTIPLIER}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>{dateData}</time>
      </div>
    </Fragment>
  );
};

ReviewItem.propTypes = {
  review: ReviewByIdPropTypes.isRequired,
};

export default ReviewItem;
