import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';

import IconsHandle from '../../shares/IconsHandle';
import { eventActions } from 'action/event.action';
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: {
        name: '',
      },
    };
  }

  handleDuplicate = () => {
    const { id, duplicateBlock } = this.props;
    if (duplicateBlock) {
      duplicateBlock(id);
    }
  };

  handleDelete = () => {
    const { id, deleteBlock } = this.props;
    if (deleteBlock) {
      deleteBlock(id);
    }
  };

  render() {
    const points = [
      { lat: 11, lng: 101 },
      { lat: 12, lng: 101 },
      { lat: 13, lng: 101 },
      { lat: 14, lng: 101 },
      {
        lat: 10.8549806,
        lng: 106.7675823,
      },
    ];
    const bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }

    const containerStyle = {
      width: '85%',
      height: '75%',
      marginRight: '10px',
    };

    const style = {
      width: '100%',
      height: '80vh',
    };

    const { editable } = this.props;

    return (
      <div className="child-block pl-1 mt-1 mb-1" style={style}>
        {/* <h5 style={titleBlockStyle}>Map</h5> */}
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

        {editable && (
          <IconsHandle
            collapseModal={this.collapseModal}
            handleDuplicate={this.handleDuplicate}
            handleDelete={this.handleDelete}
          />
        )}
      </div>
    );
  }
}

const MapBlock = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_DIRECTION_KEY,
})(MapContainer);

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBlock);
