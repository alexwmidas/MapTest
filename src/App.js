/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/* Import node modules */
import React, {Component} from 'react'
import {Provider} from 'react-redux'

/* Import other dependencies */
import configureStore from './store/configureStore'
import Location from './containers/Location'

const store = configureStore()

/* Declare and export component */
export default class App extends Component<{}> {
    render() {
        return (
            <Provider store={store}>
                <Location/>
            </Provider>
        )
    }
}
