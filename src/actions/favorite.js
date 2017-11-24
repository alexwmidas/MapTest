/**
 * Created by Evgenii
 */
import * as Actions from "./types";

export function getFavorites() {
    return {
        type: Actions.GET_FAVORITE_ACTION
    }
}

export function getFavoriteError(error) {
    return {
        type: Actions.GET_FAVORITE_ERROR,
        error: error
    }
}

export function getFavoriteSuccess(result) {
    return {
        type: Actions.GET_FAVORITE_SUCCESS,
        data: result
    }
}