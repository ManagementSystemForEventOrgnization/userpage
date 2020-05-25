const ImageState = (props) => ({
  uploadedFileCloudinaryUrl:
    props.url ||
    'https://res.cloudinary.com/dwt4njhmt/image/upload/v1586424285/unnamed_wf6wys.jpg',
  visible: false,
  width: props.width || 100,
  height: props.height || 60,
  href: '',
  margin: [1, 1, 1, 1],
  padding: [1, 1, 2, 1],
  borderRadius: props.borderRadius ? '50%' : 'none',
});

export { ImageState };
