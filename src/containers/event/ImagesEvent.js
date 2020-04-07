import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { connect } from 'react-redux'
import { Button} from 'antd';
const CLOUDINARY_UPLOAD_PRESET = 'arabdxzm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwt4njhmt/upload';

class ImagesEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
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

  render() {
    return (
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
       <Button style={{borderRadius: '50px'}}  >Change image</Button>
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
            <img style={{width:'300px',height:100}} src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  // map state of store to props

})

const mapDispatchToProps = (dispatch) => ({
 
});


export default connect(mapStateToProps, mapDispatchToProps)(ImagesEvent)
