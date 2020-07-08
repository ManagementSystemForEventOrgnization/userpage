import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Button, Spin, Radio, Input } from 'antd';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'arabdxzm';
const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dwt4njhmt/upload';

const uploadingMethods = ['Upload from  device', 'Input from link'];

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: false,
      uploadingMethod: uploadingMethods[0],
    };
  }

  handleImageUpload(file) {
    const { handleImageDrop } = this.props;
    console.log(file)
    if (!handleImageDrop) return;
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        this.setState({
          pending: false,
        });
      }

      if (response.body.secure_url !== '') {
        this.setState({
          pending: false,
        });
        handleImageDrop(response.body.secure_url);
      }
    });
  }

  onImageDrop = (files) => {
    this.setState({
      pending: true,
    });

    this.handleImageUpload(files[0]);
  };

  handleChangeUploadingMethod = (e) => {
    this.setState({
      uploadingMethod: e.target.value,
    });
  };

  render() {
    const { url } = this.props;
    const { pending, uploadingMethod } = this.state;
    return (
      <div>
        <Radio.Group
          options={uploadingMethods}
          name="uploadingMethod"
          onChange={this.handleChangeUploadingMethod}
          value={uploadingMethod}
        />
        {uploadingMethod === uploadingMethods[0] ? (
          <div>
            <div className="mt-2 ">
              {
                <div>
                  {pending && (
                    <Spin
                      tip="Uploading..."
                      size="large"
                      style={{
                        position: 'absolute',
                        paddingBottom: '45%',
                      }}
                    >
                      {' '}
                    </Spin>
                  )}
                  {url && (
                    <img
                      style={{
                        width: '450px',
                        opacity: pending ? '0.3' : '1',
                      }}
                      alt="img"
                      src={url}
                    />
                  )}
                </div>
              }
            </div>
            <p>{url}</p>
            <form className="mt-1">
              <div style={{ width: '300px', height: 50 }}>
                <Dropzone
                  onDrop={this.onImageDrop}
                  accept="application/pdf"
                  multiple={false}
                >
                  {({ getRootProps, getInputProps }) => {
                    return (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {<Button>Upload</Button>}
                      </div>
                    );
                  }}
                </Dropzone>
              </div>
              <div></div>
            </form>
          </div>
        ) : (
            <div className="d-flex">
              <p>Input link</p>
              <Input
                value={url}
                onChange={(e) => this.props.handleImageDrop(e.target.value)}
              />
            </div>
          )}
      </div>
    );
  }
}

export default UploadImage;
