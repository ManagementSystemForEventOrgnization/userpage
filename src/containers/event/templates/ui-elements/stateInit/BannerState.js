const BannerState = (props) => ({
  url: props.banner || '/bg-3.jpg',
  visible: false,
  margin: [1, 0, 0, 1],
  padding: [0, 0, 0, 0],

  opacity: 0.6,
  bgColor: '#ECE7DF',
  plainOptions: props.session,
  content: {
    title: {
      value: props.nameEvent || 'Wellcome !!! Edit title here !',
      style: {
        fontWeight: 'bolder',
        fontSize: 54,
        textAlign: 'center',
        transform: 'capitalize',
        lineText: 80,
      },
    },
    description: {
      value: 'Wellcome !!! Edit description here !',
      style: {
        fontWeight: 'normal',
        fontSize: 25,
        textAlign: 'center',
      },
    },
    buttonText: { value: 'Register Now', style: {} },
  },
});

export { BannerState };
