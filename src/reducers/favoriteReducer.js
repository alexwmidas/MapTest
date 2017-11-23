/**
 * Created by Evgenii
 */

import * as Actions from "../actions/types";

export default function favoriteReducer(state, action = {}) {
  switch (action.type) {
    case Actions.GET_FAVORITE_SUCCESS:
      return state.withMutations(state => state
        .set('data', action.data));
    case Actions.GET_FAVORITE_ERROR:
      return state.withMutations(state => state
        .set('data', []));
    default:
      return state
  }
}