import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import { Button, Progress } from 'antd';
import { storage } from '../firebase';
import ReactPlayer from 'react-player'

class UploadVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pending: false,


        }
    }


    handleImageUpload = (files) => {
        const { handleImageDrop, handleProgress } = this.props;

        if (!handleImageDrop & !handleProgress) return;
        const uploadTask = storage.ref(`/video/${files.name}`).put(files)
        uploadTask.on('state_changed',
            (snapShot) => {
                const progress = Math.round((snapShot.bytesTransferred / snapShot.totalBytes) * 100);
                handleProgress(progress)
                if (progress === 100) {
                    this.setState({ pending: false });
                }



            }, (err) => {
                console.log(err)
                this.setState({
                    pending: false
                })
            }, () => {
                storage.ref('video').child(files.name).getDownloadURL()
                    .then(files => {

                        handleImageDrop(files);

                    })
            })


    }

    onImageDrop = files => {
        this.setState({
            pending: true
        })
        this.handleImageUpload(files[0]);

    }


    render() {
        const { url, progress } = this.props;
        const { pending } = this.state;
        return (
            <div>
                <div className="mt-2 " >
                    {
                        <div>
                            {pending ?
                                <Progress
                                    type="circle" percent={progress} max="100"
                                    style={{ marginLeft: '40%' }}

                                > </Progress>
                                :
                                <ReactPlayer url={url}
                                    playing
                                    controls
                                    width="100%" />

                            }
                        </div>
                    }

                </div>

                <form className="mt-1">
                    <div style={{ width: '300px', height: 50 }}>
                        <Dropzone
                            onDrop={this.onImageDrop}
                            accept="video/*"
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

export default UploadVideo
