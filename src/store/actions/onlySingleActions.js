import { APIS, CONSTANTS } from "../../CONSTANTS";

export const SET_LOADER_STATE = "SET_LOADER_STATE";

export const showLoader = (value) => {
  return { type: SET_LOADER_STATE, showLoader: value };
};

export const fetchCards = (start) => {
  return (dispatch) => {
    return fetch(
      APIS.POSTS + `?_start=${start}&_limit=${CONSTANTS.CARD_LIMIT}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => response.json());
  };
};
