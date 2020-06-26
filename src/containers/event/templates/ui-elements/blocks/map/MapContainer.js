import React, { useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';
import { Divider, Modal, InputNumber } from 'antd';

import IconsHandle from '../../shares/IconsHandle';
import PaddingAndMargin from '../../shares/PaddingAndMargin';
import { eventActions } from 'action/event.action';

const MapWithImage = (props) => {
  const [mapContainerStyle, setMapStyle] = useState({
    position: 'relative',
    width: 90,
    height: 100,
    padding: [50, 0, 0, 0],
    margin: [2, 2, 0, 0],
    isCollapsed: false,
  });

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
  const collapseModal = () => {
    setMapStyle({
      ...mapContainerStyle,
      isCollapsed: !mapContainerStyle.isCollapsed,
    });

    handleStoreBlock();
  };

  const isDetailImageValid = () => {
    const { session } = props;
    const result = session.every((ss) => ss.address.detailImage);
    return result;
  };

  const onChangeStyle = (type, value) => {
    setMapStyle({
      ...mapContainerStyle,
      [type]: value,
    });
  };

  const handleStoreBlock = () => {
    const { blocks, storeBlocksWhenCreateEvent, id } = props;
    const currentStyle = mapStyle;

    let item = blocks.find((ele) => ele.id === id);
    if (item) {
      const index = blocks.indexOf(item);
      item.style = currentStyle;
      storeBlocksWhenCreateEvent([
        ...blocks.slice(0, index),
        item,
        ...blocks.slice(index + 1, blocks.length),
      ]);
    }
  };

  const { editable, session, type } = props;

  const divStyle = {
    display: 'inlineBock',
  };

  const mapStyle = {
    position: mapContainerStyle.position,
    width: `${mapContainerStyle.width}%`,
    height: `${mapContainerStyle.height}%`,
    paddingTop: `${mapContainerStyle.padding[0]}%`,
    paddingLeft: `${mapContainerStyle.padding[1]}%`,
    paddingRight: `${mapContainerStyle.padding[2]}%`,
    paddingBottom: `${mapContainerStyle.padding[3]}%`,

    marginTop: `${mapContainerStyle.margin[0]}%`,
    marginLeft: `${mapContainerStyle.margin[1]}%`,
    marginRight: `${mapContainerStyle.margin[2]}%`,
    marginBottom: `${mapContainerStyle.margin[3]}%`,
  };

  return (
    <div
      className={type ? 'child-block p-2 mb-5 ' : 'child-block d-flex mb-5'}
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

      <Modal
        title="Edit Map Style"
        visible={mapContainerStyle.isCollapsed}
        onOk={collapseModal}
        onCancel={collapseModal}
        width="500px"
      >
        <div className="d-flex">
          <p className="mr-5">Height : </p>
          <InputNumber
            value={mapContainerStyle.height}
            name="height"
            min={0}
            max={100}
            onChange={(value) => onChangeStyle('height', value)}
          ></InputNumber>
        </div>
        <hr />
        <div className="d-flex">
          <p className="mr-5">Width : </p>
          <InputNumber
            value={mapContainerStyle.width}
            name="width"
            min={0}
            max={100}
            onChange={(value) => onChangeStyle('width', value)}
          ></InputNumber>
        </div>
        <hr />

        <PaddingAndMargin
          margin={mapContainerStyle.margin}
          padding={mapContainerStyle.padding}
          handleChangePadding={(value) => onChangeStyle('padding', value)}
          handleChangeMargin={(value) => onChangeStyle('margin', value)}
        />
      </Modal>

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
                      <div className="p-2" key={ss.id}>
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
