const VideoState = (props) => ({
    uploadedFileCloudinaryUrl: props.url || 'https://firebasestorage.googleapis.com/v0/b/video-cfff0.appspot.com/o/video%2Fvideoa.mp4?alt=media&token=0cc86a7f-ef7f-43aa-b24e-df2b4be26521',
    visible: false,
    progress : props.progress|| 0,
    width: props.width || 100,
    height: props.height || 60,
    href: '',
    margin: [1, 1, 1, 1],
    padding: [1, 1, 2, 1],
    borderRadius: 0,
})

export { VideoState }
