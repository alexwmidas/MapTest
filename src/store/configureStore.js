/**
 * Created by Evgenii
 */

import {autoRehydrate, persistStore} from "redux-persist-immutable";
import {combineReducers} from "redux-immutable";
import createActionBuffer from "redux-action-buffer";
import {REHYDRATE} from "redux-persist/constants";
import Immutable from "immutable";
import {applyMiddleware, compose, createStore} from "redux";
import {AsyncStorage} from "react-native";
import createSagaMiddleware from "redux-saga";
import FavoriteReducer from "../reducers/favoriteReducer";
import RootReducer from "../reducers/rootReducer";
import * as FavoriteSaga from "../reducers/sagas/favoriteSaga";

const combinedReducers = combineReducers({
    root: RootReducer,
    favorite: FavoriteReducer,
});

const initialState = new Immutable.Map({
    root: Immutable.Map({
        progress: undefined,
    }),
    favorite: Immutable.Map({
        // data: [],
        data: []
    }),
});

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combinedReducers,
        initialState,
        compose(applyMiddleware(sagaMiddleware, createActionBuffer(REHYDRATE)), autoRehydrate({log: true})));

    persistStore(
        store,
        {
            storage: AsyncStorage,
            blacklist: ['root'],
        }
    );

    sagaMiddleware.run(FavoriteSaga.favoriteFlow);

    return store;
}