/**
 * Created by Evgenii
 */

import {StyleSheet} from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    map: {
        flex: 1,
    },
    marker: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'red',
        height: 40,
        width: 40,
    },
    markerText: {
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    actionWrap: {}
});
