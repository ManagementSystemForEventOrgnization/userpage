const StepState = (props) => ({
  visible: false,
  steps: [
    {
      id: 1,
      title: 'Finished',
      description: 'This is a description',
    },
    {
      id: 2,
      title: 'Current',
      description: 'This is a description',
    },
    {
      id: 3,
      title: 'Waiting',
      description: 'This is a description.',
    },
  ],
  txtname: '',
  txtdescription: '',
  isAddOption: false,
  margin: [1, 1, 1, 1],
  padding: [1, 1, 1, 1],
  background: 'white',
  fontSize: 20,
  fonts: 'Times New Roman',
  lineText: 80,
  letterSpacing: 0,
  textAlign: '',
  tranform: ' ',
  color: 'black',
  current: 1,
});

export { StepState };
