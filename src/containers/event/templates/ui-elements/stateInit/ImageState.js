const ImageState = (props) => ({
  uploadedFileCloudinaryUrl:
    props.url ||
    'https://res.cloudinary.com/dwt4njhmt/image/upload/v1592317206/hnkh-20_o4qvn0.png',
  visible: false,
  width: props.width || 100,
  height: props.height || 60,
  href: '',
  margin: [1, 1, 1, 1],
  padding: [1, 1, 2, 1],
  borderRadius: props.borderRadius ? '50%' : '2%',
});

export { ImageState };
