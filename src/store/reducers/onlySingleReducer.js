import { SET_LOADER_STATE } from "../actions/onlySingleActions";

const initialState = {
  showLoader: false,
};

export default function OnlySingleReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADER_STATE: {
      return { ...state, showLoader: action.showLoader };
    }

    default:
      return state;
  }
}
