/**
 * Created by Evgenii
 */

import {call, put, take} from "redux-saga/effects";
import * as Actions from "../../actions/types";
import * as Api from "../../services/api";
import * as FavoriteActions from "../../actions/favorite";
import * as RootActions from "../../actions/root";

export function* getList() {
	try {
		const list = yield call(Api.getFavorites, {});
		yield put(FavoriteActions.getFavoriteSuccess(list));
	} catch (error) {
		yield put(FavoriteActions.getFavoriteError(error));
	}
}

export function* favoriteFlow() {
	yield call(getList);
}