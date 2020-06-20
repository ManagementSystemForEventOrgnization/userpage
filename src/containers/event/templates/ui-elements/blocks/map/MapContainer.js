import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';
import { Divider } from 'antd';

import IconsHandle from '../../shares/IconsHandle';
import { eventActions } from 'action/event.action';

const MapWithImage = (props) => {
  const handleDuplicate = () => {
    const { id, duplicateBlock } = props;
    if (duplicateBlock) {
      duplicateBlock(id);
    }
  };
  const handleDelete = () => {
    const { id, deleteBlock } = props;
    if (deleteBlock) {
      deleteBlock(id);
    }
  };
  const collapseModal = () => {};

  const isDetailImageValid = () => {
    const { session } = props;
    const result = session.every((ss) => ss.address.detailImage);
    return result;
  };
  const { editable, session, type } = props;

  const divStyle = {
    display: 'inlineBock',
  };

  const mapStyle = {
    position: 'relative',
    width: '90%',
    height: '100%',
    paddingTop: ' 50%',
    marginTop: ' 2%',
    marginLeft: ' 2%',
  };

  return (
    <div
      className={type ? 'child-block p-2 ' : 'child-block d-flex'}
      style={divStyle}
    >
      <Map
        google={props.google}
        containerStyle={mapStyle}
        initialCenter={{
          lat: +session[0].address.map.lat,
          lng: +session[0].address.map.lng,
        }}
        zoom={12}
      >
        {session.map((ss, index) => (
          <Marker
            key={ss.id}
            id={index + 1}
            title={ss.name}
            position={{
              lat: +ss.address.map.lat,
              lng: +ss.address.map.lng,
            }}
          />
        ))}
      </Map>

      {editable && !type && (
        <IconsHandle
          collapseModal={collapseModal}
          handleDuplicate={handleDuplicate}
          handleDelete={handleDelete}
        />
      )}
      {type && (
        <div>
          <hr className="mt-2" />
          <div className="d-flex mt-5 pl-5 flex-wrap">
            <div>
              {isDetailImageValid() ? (
                session.map(
                  (ss) =>
                    ss.address.detailImage && (
                      <div className="p-2">
                        <Divider orientation="left">
                          {ss.address.location}
                        </Divider>

                        <img src={ss.address.detailImage} alt="detail" />
                        <hr className="mb-2" />
                      </div>
                    )
                )
              ) : (
                <Divider plain>Don't have any image provided </Divider>
              )}
            </div>

            {editable && (
              <IconsHandle
                collapseModal={collapseModal}
                handleDuplicate={handleDuplicate}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const MapContainer = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_DIRECTION_KEY,
})(MapWithImage);

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

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
