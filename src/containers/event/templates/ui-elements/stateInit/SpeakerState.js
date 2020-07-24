import { v4 as uuid } from 'uuid';

const SpeakerState = (props) => ({
  visible: false,
  list: [
    {
      id: uuid(),
      title: "Speaker's name",
      description: 'This is description of speaker',
      url:
        'http://1.bp.blogspot.com/-FM4eKKmWTSs/TpOQAttKlSI/AAAAAAAAABA/EowEr4W1DzI/s1600/steve-jobs.jpg',
    },
    {
      id: uuid(),
      title: "Speaker's name",
      description: 'This is description of speaker',
      url:
        'http://1.bp.blogspot.com/-o16ik-B_FcE/Tq1-W_OpEfI/AAAAAAAAA4o/6RclKXCjjCc/s1600/Bill+Gates+I.jpg',
    },
    {
      id: uuid(),
      title: "Speaker's name",
      description: 'This is description of speaker',
      url:
        'https://upload.wikimedia.org/wikipedia/commons/a/a9/Enabling_eCommerce-_Small_Enterprises%2C_Global_Players_%2839008130265%29_%28cropped%29.jpg',
    },
    {
      id: uuid(),
      title: "Speaker's name",
      description: 'This is description of speaker',
      url:
        'http://tctechcrunch2011.files.wordpress.com/2012/09/mark.jpeg',
    },
  ],

  title: {},
  description: {},
  url: {
    height: '100vh !important',
  },
});

export default SpeakerState;
