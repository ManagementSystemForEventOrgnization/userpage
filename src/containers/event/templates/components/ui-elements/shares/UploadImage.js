import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import { Button, Spin } from 'antd'
import request from 'superagent';


const CLOUDINARY_UPLOAD_PRESET = 'arabdxzm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwt4njhmt/upload';


class UploadImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pending: false
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
                this.setState({
                    pending: false
                })
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    pending: false
                })
                handleImageDrop(response.body.secure_url);
            }
        });
    }


    onImageDrop = files => {
        this.setState({
            pending: true
        })
        this.handleImageUpload(files[0]);
    }


    render() {
        const { url } = this.props;
        const { pending } = this.state;
        return (
            <div>
                <div className="mt-2 " >
                    {
                        <div>
                            {pending && <Spin
                                tip="Uploading..."
                                size='large'
                                style={{
                                    position: 'absolute',
                                    paddingBottom: '45%'
                                }}
                            > </Spin>}
                            {
                                url && <img style={{
                                    width: '450px',
                                    opacity: pending ? '0.3' : '1'
                                }} alt="img" src={url} />
                            }

                        </div>
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
                                            <Button >Upload</Button>
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
