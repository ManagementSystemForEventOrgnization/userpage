// import React, { Component } from 'react'
// import { Map, Polygon, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';



// export class MapContainer extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             showingInfoWindow: false,
//             activeMarker: {},
//             selectedPlace: {},
//         };
//     }


//     onMarkerClick = (props, marker, e) =>
//         this.setState({
//             selectedPlace: props,
//             activeMarker: marker,
//             showingInfoWindow: true
//         });

//     onMapClicked = (props) => {
//         if (this.state.showingInfoWindow) {
//             this.setState({
//                 showingInfoWindow: false,
//                 activeMarker: null
//             })
//         }
//     };
//     render() {
//         const style = {
//             width: '70%',
//             height: '70%'
//         }
//         if (!this.props.loaded) return <div>Loading...</div>;
//         return (

//             <Map google={this.props.google}
//                 style={style}
//                 className={'map'}
//                 zoom={14}
//                 onClick={this.onMapClicked}
//             >
//                 <Marker
//                     title={'The marker`s title will appear as a tooltip.'}
//                     name={'SOMA'}
//                     position={{ lat: 37.778519, lng: -122.405640 }}
//                     onClick={this.onMarkerClick} />
//                 <Marker
//                     name={'Dolores park'}
//                     position={{ lat: 37.759703, lng: -122.428093 }}
//                     onClick={this.onMarkerClick} />
//                 <Marker />
//                 <Marker
//                     name={'Your position'}
//                     position={{ lat: 37.762391, lng: -122.439192 }}
//                     onClick={this.onMarkerClick} />
//             </Map>

//         );
//     }
// }


// const LoadingContainer = (props) => (
//     <div>Fancy loading container!</div>
// )

// export default GoogleApiWrapper({
//     apiKey: ("AIzaSyA5yCv3e02jDu5GAkk9erPi-Z1ttyfiNII"),
//     LoadingContainer: LoadingContainer
// })(MapContainer)

import React, { Component } from 'react'
import Map from '../../atoms/Map';

export default class Maps extends Component {
    render() {
        return (
            <div style={{ margin: '100px' }}>
                <Map key={this.props.key}
                    google={this.props.google}
                    center={{ lat: 18.5204, lng: 73.8567 }}
                    height='300px'
                    zoom={15}
                />
            </div>
        )
    }
}
