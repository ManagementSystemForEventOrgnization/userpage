import { v4 as uuid } from 'uuid';

const SpeakerState = (props) => ({
  visible: false,
  list: [
    {
      id: uuid(),
      title: "Speaker's name",
      description: 'This is description of speaker',
      url:
        'https://res.cloudinary.com/eventinyourhand/image/upload/v1592394437/speaker/100501386_1940094316123694_852542048954220544_o_g72pzq.jpg',
    },
    {
      id: uuid(),
      title: "Speaker's name",
      description: 'This is description of speaker',
      url:
        'https://res.cloudinary.com/eventinyourhand/image/upload/v1592394437/speaker/42199567_1524708617630355_1125638278909788160_o_s1sjkh.jpg',
    },
    {
      id: uuid(),
      title: "Speaker's name",
      description: 'This is description of speaker',
      url:
        'https://res.cloudinary.com/eventinyourhand/image/upload/v1592394437/speaker/93781173_1739777956165158_8205945755320451072_n_rig7c8.jpg',
    },
    {
      id: uuid(),
      title: "Speaker's name",
      description: 'This is description of speaker',
      url:
        'https://res.cloudinary.com/eventinyourhand/image/upload/v1592394437/speaker/93910148_2959126340847909_8552171504366780416_o_cnw2np.jpg',
    },
  ],

  title: {},
  description: {},
  url: {
    height: '100vh !important',
  },
});

export default SpeakerState;
