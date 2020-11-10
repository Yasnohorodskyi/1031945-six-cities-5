export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_CITY_OFFERS: `GET_CITY_OFFERS`,
  CHANGE_SORTING: `CHANGE_SORTING`,
  GET_SORTED_OFFERS: `GET_SORTED_OFFERS`,
  CHANGE_ACTIVE_OFFER: `CHANGE_ACTIVE_OFFER`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOAD_OFFERS_SUCCESS: `LOAD_OFFERS_SUCCESS`,
};

export const changeCity = (city) => ({
  type: ActionType.CHANGE_CITY,
  payload: city,
});

export const getCityOffers = (cityOffers) => ({
  type: ActionType.GET_CITY_OFFERS,
  payload: cityOffers,
});

export const changeSorting = (type) => ({
  type: ActionType.CHANGE_SORTING,
  payload: type,
});

export const getSortedOffers = (sortedOffers) => ({
  type: ActionType.GET_SORTED_OFFERS,
  payload: sortedOffers,
});

export const changeActiveOffer = (id) => ({
  type: ActionType.CHANGE_ACTIVE_OFFER,
  payload: id,
});

export const loadOffers = (offers) => ({
  type: ActionType.LOAD_OFFERS_SUCCESS,
  payload: offers,
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});
