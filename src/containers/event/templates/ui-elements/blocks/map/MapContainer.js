import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: {
        name: '',
      },
    };
  }
  render() {
    var points = [
      { lat: 11, lng: 101 },
      { lat: 12, lng: 101 },
      { lat: 13, lng: 101 },
      { lat: 14, lng: 101 },
      {
        lat: 10.8549806,
        lng: 106.7675823,
      },
    ];
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }

    const containerStyle = {
      width: '85%',
      height: '75%',
    };

    const style = {
      width: '100%',
      height: '80vh',
    };

    return (
      <div className="child-block p-1 mt-1 mb-1" style={style}>
        <Map
          google={this.props.google}
          containerStyle={containerStyle}
          initialCenter={{
            lat: 10.8549806,
            lng: 106.7675823,
          }}
          // zoom={20}
          bounds={bounds}
        >
          <Marker onClick={this.onMarkerClick} name={'Current location'} />

          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_DIRECTION_KEY,
})(MapContainer);
