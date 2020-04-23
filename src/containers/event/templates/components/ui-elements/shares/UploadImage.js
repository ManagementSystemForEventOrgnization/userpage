import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import { Button } from 'antd'
import request from 'superagent';


const CLOUDINARY_UPLOAD_PRESET = 'arabdxzm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwt4njhmt/upload';


class UploadImage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    handleImageUpload(file) {
        const { handleImageDrop } = this.props;
        if (!handleImageDrop) return;
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                handleImageDrop(response.body.secure_url);
            }
        });
    }


    onImageDrop = files => {
        this.handleImageUpload(files[0]);
    }


    render() {
        const { url } = this.props;
        return (
            <div>
                <div className="mt-2 " >
                    {
                        url &&
                        <img style={{ width: '450px' }} alt="img" src={url} />
                    }

                </div>
                <p>{url}</p>

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
            </div>
        )
    }
}

export default UploadImage
