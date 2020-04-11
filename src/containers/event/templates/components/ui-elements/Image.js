import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { connect } from 'react-redux'
import { Button, Modal, InputNumber } from 'antd';
const CLOUDINARY_UPLOAD_PRESET = 'arabdxzm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwt4njhmt/upload';

class ImageBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: this.props.url || 'https://res.cloudinary.com/dwt4njhmt/image/upload/v1586424285/unnamed_wf6wys.jpg',
      visible: false,
      heightImage: 250,
      widthImage: 450,
    };
  }

  onImageDrop = (files) => {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  onChangeHeightImage = (value) => {
    this.setState({ heightImage: value });
  }

  onChangeWidthImage = (value) => {
    this.setState({ widthImage: value });
  }

  render() {
    const { widthImage, heightImage, uploadedFileCloudinaryUrl } = this.state;
    const { style } = this.props;
    const imageStyle = style ? style : {
      width: widthImage,
      height: heightImage,
    }
    return (
      <div>
        <img
          style={imageStyle}
          alt="img" src={uploadedFileCloudinaryUrl}
          onClick={this.showModal} />

        <Modal
          title="Edit Image"
          visible={this.state.visible}
          onOk={this.handleOk}
          width="700px"
          onCancel={this.handleCancel}
        >

          <div className="d-flex mt-2">
            <div className="d-flex mr-5" >
              <p className="mr-3">Width</p>

              <InputNumber
                placeholder="width"
                value={style ? 100 : widthImage}
                style={{ textAlign: 'center' }}
                min={0} max={1500}
                onChange={this.onChangeWidthImage}  ></InputNumber >
            </div>
            <div className="d-flex ml-5">
              <p className="mr-3">Height</p>

              <InputNumber
                placeholder="height"
                value={style ? 100 : heightImage}
                style={{ textAlign: 'center' }}
                min={0} max={1500}
                onChange={this.onChangeHeightImage}  ></InputNumber >
            </div>


          </div>

          <div className="mt-2" >
            <img style={{ width: '450px' }} alt="img" src={uploadedFileCloudinaryUrl} />
          </div>
          <p>{uploadedFileCloudinaryUrl}</p>

          <form className="mt-1">
            <div style={{ width: '300px', height: 50 }}>
              <Dropzone
                onDrop={this.onImageDrop}
                accept="image/*"
                multiple={false}>
                {({ getRootProps, getInputProps }) => {
                  return (
                    <div
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      {
                        <Button   >Upload</Button>
                      }
                    </div>
                  )
                }}
              </Dropzone>
            </div>
            <div  >
            </div>
          </form>

        </Modal>
      </div>


    )
  }
}

const mapStateToProps = state => ({
  // map state of store to props

})

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(ImageBlock)
