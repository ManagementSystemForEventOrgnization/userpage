const ImageState = (props) => ({
  uploadedFileCloudinaryUrl:
    props.url ||
    'https://res.cloudinary.com/dwt4njhmt/image/upload/v1592317206/hnkh-20_o4qvn0.png',
  visible: false,
  width: props.width || 90,
  height: props.height || 60,
  href: '',
  margin: [1, 1, 1, 1],
  padding: [2, 2, 2, 2],
  borderRadius: props.borderRadius ? '50%' : '2%',
});

export { ImageState };
