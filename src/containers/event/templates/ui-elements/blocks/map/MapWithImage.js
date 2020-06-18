import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';

import IconsHandle from '../../shares/IconsHandle';
import { eventActions } from 'action/event.action';
import Image from 'containers/event/templates/ui-elements/atoms/Image';

const MapWithImage = (props) => {
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

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

  const [fileList, setFileList] = useState([]);
  const { editable, session } = props;

  //   const style = {
  //     width: '100%',
  //     height: '80vh',
  //   };

  return (
    <div className="child-block d-flex">
      <div className="pl-2 pr-2">
        {editable ? (
          <ImgCrop rotate>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 5 && '+ Upload'}
            </Upload>
          </ImgCrop>
        ) : (
          <div className="d-flex">
            {fileList.map(
              (item) => item.status === 'done' && <Image url={item.url} />
            )}
          </div>
        )}

        <hr />
        {/* 
        <Map
          google={props.google}
          containerStyle={{
            position: 'relative',
          }}
          initialCenter={{
            lat: +session[0].address.map.lat,
            lng: +session[0].address.map.lng,
          }}
          zoom={16}
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
    */}
      </div>

      {editable && (
        <IconsHandle
          collapseModal={collapseModal}
          handleDuplicate={handleDuplicate}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

const MapContainerWithBlock = GoogleApiWrapper({
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainerWithBlock);
