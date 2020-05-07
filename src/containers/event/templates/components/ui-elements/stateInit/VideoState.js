const VideoState = (props) => ({
    uploadedFileCloudinaryUrl: props.url ? props.url : "https://www.youtube.com/watch?v=oHllzJY5neA&list=RDoHllzJY5neA&start_radio=1",
    visible: false,
    progress: props.progress || 0,
    width: props.width || 100,
    height: props.height || 60,
    href: '',
    margin: props.margin || [1, 1, 1, 1],
    padding: props.padding || [1, 1, 2, 1],
    borderRadius: props.borderRadius || 0,
    playing: props.playing || true,

})

export { VideoState }
