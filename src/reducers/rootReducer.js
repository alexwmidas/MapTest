/**
 * Created by Evgenii
 */

import * as Actions from "../actions/types";

export default function rootReducer(state, action = {}) {
  switch (action.type) {
    case Actions.PROGRESS:
      return state.set('progress', action.progress);
    default:
      return state
  }
}
