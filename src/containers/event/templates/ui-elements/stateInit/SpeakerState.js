import { v4 as uuid } from 'uuid';

const SpeakerState = (props) => ({
  visible: false,
  list: [
    {
      id: uuid(),
      title: "Speaker's name",
      description: 'This is description of speaker',
      url:
        'https://easydrawingart.com/wp-content/uploads/2019/07/How-to-Draw-a-Chibi-Girl.jpg',
    },
    {
      id: uuid(),
      title: "Speaker's name",
      description: 'This is description of speaker',
      url:
        'https://easydrawingart.com/wp-content/uploads/2019/07/How-to-Draw-a-Chibi-Girl.jpg',
    },
    {
      id: uuid(),
      title: "Speaker's name",
      description: 'This is description of speaker',
      url:
        'https://easydrawingart.com/wp-content/uploads/2019/07/How-to-Draw-a-Chibi-Girl.jpg',
    },
    {
      id: uuid(),
      title: "Speaker's name",
      description: 'This is description of speaker',
      url:
        'https://easydrawingart.com/wp-content/uploads/2019/07/How-to-Draw-a-Chibi-Girl.jpg',
    },
  ],
});

export default SpeakerState;
