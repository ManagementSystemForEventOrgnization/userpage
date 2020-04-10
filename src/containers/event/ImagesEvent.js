import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { connect } from 'react-redux'
import { Button,Modal} from 'antd';
const CLOUDINARY_UPLOAD_PRESET = 'arabdxzm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwt4njhmt/upload';

class ImagesEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: 'https://res.cloudinary.com/dwt4njhmt/image/upload/v1586424285/unnamed_wf6wys.jpg',
      visible: false,
    };
  }

  onImageDrop=(files)=> {
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
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (

      <div>
      <Button style={{borderRadius: '50px'}}  onClick={this.showModal}>Edit</Button>

      <div  >
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div >
            <p>{this.state.uploadedFileCloudinaryUrl}</p>
            <img style={{width:'300px'}} src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div>
      <Modal
        title="Edit "
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
     <h5>Image</h5>
     <div>
       <p>Image</p>
     <form>
        <div style={{width:'300px',height:50}}>
        <Dropzone
  onDrop={this.onImageDrop}
  accept="image/*"
  multiple={false}>
    {({getRootProps, getInputProps}) => {
      return (
        <div
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {
       <Button style={{borderRadius: '50px'}}  >Upload</Button>
          }
        </div>
      )
  }}
   </Dropzone>
        </div>

        <div  >
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div >
            <p>{this.state.uploadedFileCloudinaryUrl}</p>
            <img style={{width:'450px'}} src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div>
      </form>
  
     </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(ImagesEvent)
