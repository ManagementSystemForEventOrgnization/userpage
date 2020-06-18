import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
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

  renderMarkers = () => {
    const { session } = this.props;
    let markers = session.map((ss) => (
      <Marker
        key={ss.id}
        title={ss.name}
        position={{ lat: ss.address.map.lat, lng: ss.address.map.lng }}
      />
    ));
    return markers;
  };

  render() {
    const style = {
      width: '100%',
      height: '80vh',
    };

    const { editable } = this.props;

    return (
      <div className="child-block pl-2 pl-2 mt-1 mb-1" style={style}>
        <Map
          google={this.props.google}
          style={{ width: '80%', height: '80%', position: 'relative' }}
          className={'map'}
          zoom={14}
        >
          {this.renderMarkers()}
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
  session: state.event.session,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBlock);
