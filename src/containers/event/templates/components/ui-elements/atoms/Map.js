// import React, { Component } from 'react';
// import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
// import Geocode from "react-geocode";
// import Autocomplete from 'react-google-autocomplete';
// import { stringify } from 'querystring';
// Geocode.setApiKey("AIzaSyA5yCv3e02jDu5GAkk9erPi-Z1ttyfiNII");
// Geocode.enableDebug();

// class Map extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             address: '',
//             city: '',
//             area: '',
//             state: '',
//             mapPosition: {
//                 lat: this.props.center.lat,
//                 lng: this.props.center.lng
//             },
//             markerPosition: {
//                 lat: this.props.center.lat,
//                 lng: this.props.center.lng
//             }
//         }
//     }

//     componentDidMount() {
//         Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
//             response => {
//                 const address = response.results[0].formatted_address,
//                     addressArray = response.results[0].address_components,
//                     city = this.getCity(addressArray),
//                     area = this.getArea(addressArray),
//                     state = this.getState(addressArray);

//                 console.log('city', city, area, state);

//                 this.setState({
//                     address: (address) ? address : '',
//                     area: (area) ? area : '',
//                     city: (city) ? city : '',
//                     state: (state) ? state : '',
//                 })
//             },
//             error => {
//                 console.error(error);
//             }
//         );
//     };

//     shouldComponentUpdate(nextProps, nextState) {
//         if (
//             this.state.markerPosition.lat !== this.props.center.lat ||
//             this.state.address !== nextState.address ||
//             this.state.city !== nextState.city ||
//             this.state.area !== nextState.area ||
//             this.state.state !== nextState.state
//         ) {
//             return true
//         } else if (this.props.center.lat === nextProps.center.lat) {
//             return false
//         }
//     }

//     getCity = (addressArray) => {
//         console.log("getCity")
//         console.log(addressArray)
//         let city = '';
//         for (let i = 0; i < addressArray.length; i++) {
//             if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
//                 city = addressArray[i].long_name;
//                 return city;
//             }
//         }
//     };

//     getArea = (addressArray) => {
//         let area = '';
//         for (let i = 0; i < addressArray.length; i++) {
//             if (addressArray[i].types[0]) {
//                 for (let j = 0; j < addressArray[i].types.length; j++) {
//                     if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
//                         area = addressArray[i].long_name;
//                         return area;
//                     }
//                 }
//             }
//         }
//     };

//     getState = (addressArray) => {
//         let state = '';
//         for (let i = 0; i < addressArray.length; i++) {
//             for (let i = 0; i < addressArray.length; i++) {
//                 if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
//                     state = addressArray[i].long_name;
//                     return state;
//                 }
//             }
//         }
//     };

//     onChange = (event) => {
//         this.setState({ [event.target.name]: event.target.value });
//     };

//     onInfoWindowClose = (event) => {

//     };


//     onMarkerDragEnd = (event) => {
//         let newLat = event.latLng.lat(),
//             newLng = event.latLng.lng();

//         Geocode.fromLatLng(newLat, newLng).then(
//             response => {
//                 const address = response.results[0].formatted_address,
//                     addressArray = response.results[0].address_components,
//                     city = this.getCity(addressArray),
//                     area = this.getArea(addressArray),
//                     state = this.getState(addressArray);
//                 this.setState({
//                     address: (address) ? address : '',
//                     area: (area) ? area : '',
//                     city: (city) ? city : '',
//                     state: (state) ? state : '',
//                     markerPosition: {
//                         lat: newLat,
//                         lng: newLng
//                     },
//                     mapPosition: {
//                         lat: newLat,
//                         lng: newLng
//                     },
//                 })
//             },
//             error => {
//                 console.error(error);
//             }
//         );
//     };


//     onPlaceSelected = (place) => {
//         console.log('plc', JSON.stringify(place));
//         console.log('plc', (place));
//         if (place.formatted_address == undefined) {
//             place = {
//                 address_components: [
//                     {
//                         long_name: "Los Angeles",
//                         short_name: "Los Angeles",
//                         types: ["locality", "political"]
//                     },
//                     {
//                         long_name: "Los Angeles County",
//                         short_name: "Los Angeles County",
//                         types: ["administrative_area_level_2", "political"]
//                     },
//                     {
//                         long_name: "California",
//                         short_name: "CA",
//                         types: ["administrative_area_level_1", "political"]
//                     },
//                     {
//                         long_name: "United States",
//                         short_name: "US",
//                         types: ["country", "political"]
//                     }
//                 ]
//                 ,
//                 formatted_address: "Los Angeles, CA, USA",
//                 geometry: {
//                     location: { lat: 34.0522342, lng: -118.2436849 }
//                 },
//                 place_id: "ChIJE9on3F3HwoAR9AhGJW_fL-I",
//                 html_attributions: []
//             }
//         }
//         const address = place.formatted_address,
//             addressArray = place.address_components,
//             city = this.getCity(addressArray),
//             area = this.getArea(addressArray),
//             state = this.getState(addressArray),
//             latValue = place.geometry.location.lat,
//             lngValue = place.geometry.location.lng;

//         this.setState({
//             address: (address) ? address : '',
//             area: (area) ? area : '',
//             city: (city) ? city : '',
//             state: (state) ? state : '',
//             markerPosition: {
//                 lat: latValue,
//                 lng: lngValue
//             },
//             mapPosition: {
//                 lat: latValue,
//                 lng: lngValue
//             },
//         })
//     };


//     render() {
//         const AsyncMap = withScriptjs(
//             withGoogleMap(
//                 props => (
//                     <GoogleMap google={this.props.google}
//                         defaultZoom={this.props.zoom}
//                         defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
//                     >
//                         {/* InfoWindow on top of marker */}
//                         <InfoWindow
//                             onClose={this.onInfoWindowClose}
//                             position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
//                         >
//                             <div>
//                                 <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
//                             </div>
//                         </InfoWindow>
//                         {/*Marker*/}
//                         <Marker google={this.props.google}
//                             name={'Dolores park'}
//                             draggable={true}
//                             onDragEnd={this.onMarkerDragEnd}
//                             position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
//                         />
//                         <Marker />
//                         {/* For Auto complete Search Box */}
//                         <Autocomplete
//                             style={{
//                                 width: '100%',
//                                 height: '40px',
//                                 paddingLeft: '16px',
//                                 marginTop: '2px',
//                                 marginBottom: '500px'
//                             }}
//                             onPlaceSelected={this.onPlaceSelected}
//                             types={['(regions)']}
//                         />
//                     </GoogleMap>
//                 )
//             )
//         );
//         let map;
//         if (this.props.center.lat !== undefined) {
//             map = <div>
//                 {/* <div>
// 					<div className="form-group">
// 						<label htmlFor="">City</label>
// 						<input type="text" name="city" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.city }/>
// 					</div>
// 					<div className="form-group">
// 						<label htmlFor="">Area</label>
// 						<input type="text" name="area" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.area }/>
// 					</div>
// 					<div className="form-group">
// 						<label htmlFor="">State</label>
// 						<input type="text" name="state" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.state }/>
// 					</div>
// 					<div className="form-group">
// 						<label htmlFor="">Address</label>
// 						<input type="text" name="address" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address }/>
// 					</div>
// 				</div> */}

//                 <AsyncMap
//                     googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDGe5vjL8wBmilLzoJ0jNIwe9SAuH2xS_0&libraries=places"
//                     loadingElement={
//                         <div style={{ height: `100%` }} />
//                     }
//                     containerElement={
//                         <div style={{ height: this.props.height }} />
//                     }
//                     mapElement={
//                         <div style={{ height: `100%` }} />
//                     }
//                 />
//             </div>
//         } else {
//             map = <div style={{ height: this.props.height }} />
//         }
//         return (map)
//     }
// }
// export default Map


import React, { Component } from 'react'
import { Map, Polygon, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';



export class MapContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };
    }


    onMarkerClick = (props, marker, e) => {
        console.log("on click")
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    onMapClicked = (props) => {
        console.log("on clicked")
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };


    render() {
        const style = {
            width: '70%',
            height: '70%'
        }
        if (!this.props.loaded) return <div>Loading...</div>;
        return (
            <div key={this.props.key}>
                <Map google={this.props.google}
                    style={style}
                    className={'map'}
                    zoom={13}
                    onClick={this.onMapClicked}
                    fillColor='#FF00'
                    fillOpacity={0.2}
                >
                    <Marker
                        title={'The marker`s title will appear as a tooltip.'}
                        name={'SOMA'}
                        position={{ lat: 37.778519, lng: -122.405640 }}
                        onClick={this.onMarkerClick} />
                    <Marker
                        name={'Dolores park'}
                        position={{ lat: 37.759703, lng: -122.428093 }}
                        onClick={this.onMarkerClick} />
                    <Marker />
                    <Marker
                        name={'Your position'}
                        position={{ lat: 37.762391, lng: -122.439192 }}
                        onClick={this.onMarkerClick} />
                </Map>
            </div>
        );
    }
}


const LoadingContainer = (props) => (
    <div>Fancy loading container!</div>
)

export default GoogleApiWrapper({
    apiKey: ("AIzaSyA5yCv3e02jDu5GAkk9erPi-Z1ttyfiNII"),
    LoadingContainer: LoadingContainer
})(MapContainer)