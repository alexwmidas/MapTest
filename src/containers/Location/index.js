/**
 * Created by Evgenii
 */

//@flow
import React, { Component } from "react";
import { Dimensions, Image, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import MapView from 'react-native-maps';
import styles from './styles';

class Location extends Component {

  	constructor() {
	    super();

	    this.state = {
	    	filteredHomes: [],
	    	region: {
	    		latitude: 32.899293,
	    		longitude: -96.729257,
	    		latitudeDelta: 3,
	    		longitudeDelta: 3
	    	}
	    };
 	}

  	componentWillReceiveProps(nextProps) {
  		// Move to the center of the points
  		if (nextProps.favorite.get('data').length !== this.props.favorite.get('data').length) {
  			// restrict to 10 markers
  			let array = nextProps.favorite.get('data').slice(0, 9);
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
  			this.setState({ region: { latitude, longitude, latitudeDelta, longitudeDelta }});
  		}
  	}

  	render() {
  		// restrict to 10 markers
  		const mapData = this.props.favorite.get('data').slice(0, 9);
		return (
	      	<View style={styles.container}>
		      	<MapView
		      		provider={MapView.PROVIDER_GOOGLE}
			      	style={styles.map}
			      	region={this.state.region}
		      	>
			      	{
			      		mapData.map((data, index) => (
							<MapView.Marker
								key={`marker_${index}`}
						      	coordinate={{latitude: data.lat, longitude: data.lon}}
						    >
					                <Image
					                  source={require('../../resources/images/marker.png')}
					                  style={{ tintColor: data.color, width: 24, height: 32, }}
                            onLoad={() => this.forceUpdate()}
                            onLayout={() => this.forceUpdate()}
					                >
                          </Image>
						    </MapView.Marker>
						))
			      	}
		      </MapView>
          {
            // This is for the problem on Android side.
            // https://github.com/airbnb/react-native-maps/issues/1552
            (
              <Image 
                style={{width:0,height:0}}
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
