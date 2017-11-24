/**
 * Created by Evgenii
 */

//@flow
import React, {Component} from "react";
import {Dimensions, Image, Text, View, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import MapView from 'react-native-maps';
import styles from './styles';
import { getClusters, getBackgroundColor } from './map';

export const calculateZoom = delta => Math.round(Math.log(360 / delta) / Math.LN2);

class Location extends Component {

    constructor() {
        super();

        this.state = {
            filteredHomes: [],
            region: {
                latitude: 32.899293,
                longitude: -96.729257,
                latitudeDelta: 1,
                longitudeDelta: 0.3
            }
        };
        this.map = null;
        this.clusterMarkers = [];
    }

    componentWillReceiveProps(nextProps) {
        // Move to the center of the points
        if (nextProps.favorite.get('data').length !== this.props.favorite.get('data').length) {
            // restrict to 10 markers
            let array = nextProps.favorite.get('data');
            let latitude, longitude, latitudeDelta, longitudeDelta;
            let latMax = -100, latMin = 100, lonMax = -100, lonMin = 100;
            array.map(data => {
                if (latMax < data.lat) {
                    latMax = data.lat;
                }
                if (latMin > data.lat) {
                    latMin = data.lat;
                }
                if (lonMax < data.lon) {
                    lonMax = data.lon;
                }
                if (lonMin > data.lon) {
                    lonMin = data.lon;
                }
            })
            latitude = (latMax + latMin) / 2;
            longitude = (lonMax + lonMin) / 2;
            latitudeDelta = (latMax - latitude) * 2;
            longitudeDelta = (lonMax - longitude) * 2;
            this.map.map.setNativeProps({region: {latitude, longitude, latitudeDelta, longitudeDelta}});
        }
    }

    onRegionChange = (region) => {
        this.setState({region}, () => {
        });
    };

    filterMapData() {
        const mapData = this.props.favorite.get('data');
        if (!mapData || mapData.length === 0) {
            return [];
        }
        const clusters = getClusters(mapData, calculateZoom(this.state.region.longitudeDelta));
        this.clusterMarkers = [];
        let realMarkers = [];
        clusters.forEach(({properties, geometry}) => {
            if (properties.cluster) {
                this.clusterMarkers.push({
                    color: properties.color,
                    count: properties.point_count,
                    latitude: geometry.coordinates[1],
                    longitude: geometry.coordinates[0],
                });
            } else {
                realMarkers.push(mapData[properties.index]);
            }
        });
        return realMarkers;
    }

    render() {
        // restrict to 10 markers
        const mapData = this.filterMapData();
        return (
            <View style={styles.container}>
                <MapView
                    provider={MapView.PROVIDER_GOOGLE}
                    style={styles.map}
                    initRegion={this.state.region}
                    ref={ref => {
                        this.map = ref
                    }}
                    onRegionChangeComplete={this.onRegionChange}
                >
                    {
                        mapData.map((data, index) => (
                            <MapView.Marker
                                key={`marker_${index}`}
                                coordinate={{latitude: data.lat, longitude: data.lon}}
                                style={styles.marker}
                            >
                                <Image
                                    source={require('../../resources/images/marker.png')}
                                    style={{tintColor: data.color, width: 20, height: 24}}
                                />
                            </MapView.Marker>
                        ))
                    }
                    {
                        this.clusterMarkers.map((data, index) => (
                            <MapView.Marker
                                key={`marker_${index}`}
                                coordinate={{latitude: data.latitude, longitude: data.longitude}}
                            >
                                <View style={[styles.marker, {backgroundColor: getBackgroundColor(data.count)}]}>
                                    <Text style={styles.markerText}>{ data.count }</Text>
                                </View>
                            </MapView.Marker>
                        ))
                    }

                </MapView>
                {
                    // This is for the problem on Android side.
                    // https://github.com/airbnb/react-native-maps/issues/1552
                    (
                        <Image
                            style={{width: 0, height: 0}}
                            source={require('../../resources/images/marker.png')}
                        />
                    )
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    favorite: state.get('favorite'),
});

export default connect(mapStateToProps)(Location)
