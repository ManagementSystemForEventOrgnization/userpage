const BannerState = (props) => ({
  url: props.banner || '/bg-3.jpg',
  visible: false,
  margin: [1, 1, 1, 1],
  padding: [10, 5, 5, 10],

  opacity: 0.3,
  bgColor: 'black',
  plainOptions: props.session,
  content: {
    title: {
      value: props.nameEvent || 'Wellcome !!! Edit title here !',
      style: {
        fontWeight: 'bolder',
        fontSize: 50,
        textAlign: 'center',
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
