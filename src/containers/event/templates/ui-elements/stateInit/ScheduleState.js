// const src ='https://res.cloudinary.com/dwt4njhmt/image/upload/v1586424285/unnamed_wf6wys.jpg';

const ScheduleState = (props, first) => ({
  visible: false,
  margin: [1, 1, 1, 1],
  padding: [1, 1, 1, 1],
  background: 'none',
  fontSize: props.newStyle
    ? props.newStyle.fontSize
      ? props.newStyle.fontSize
      : 20
    : 20,
  lineText: 80,

  letterSpacing: 0,
  textAlign: props.newStyle
    ? props.newStyle.textAlign
      ? props.newStyle.textAlign
      : 'left'
    : 'left',
  transform: ' ',
  color: props.newStyle
    ? props.newStyle.color
      ? props.newStyle.color
      : 'black'
    : 'black',
  fontWeight: props.newStyle
    ? props.newStyle.fontWeight
      ? props.newStyle.fontWeight
      : 'normal'
    : 'normal',

  scheduleName: 'Schedule',
  /**
   * day
   * limit number
   * name
   * address: {
   *      location
   *      map: {
   *
   *              lat
   *              lng
   *  }
   * }
   */
  scheduleText: first
    ? [
        {
          id: 1,
          time: '8 : 00 AM',
          title: ' Coffee & Conversation',
          description:
            'Coffee is usually brewed immediately before drinking. In most areas, coffee may be purchased unprocessed, or already roasted, or already',
        },
        {
          id: 2,
          time: '8 : 00 AM',
          title: ' Coffee & Conversation',
          description:
            'Coffee is usually brewed immediately before drinking. In most areas, coffee may be purchased unprocessed, or already roasted, or already',
        },
      ]
    : [
        {
          id: 1,
          time: '27 jun, 2015',
          url:
            'https://res.cloudinary.com/dwt4njhmt/image/upload/v1586424285/unnamed_wf6wys.jpg',
          title: ' NAM ANIM EROS RHONCUS',
          description: '8 Rue de Montpensier 75001, Paris, France, 18:00 ',
          ticket: '15$',
          buttonText: 'buy ticket',
        },
        {
          id: 2,
          time: '27 jun, 2015 ',
          url:
            'https://res.cloudinary.com/dwt4njhmt/image/upload/v1586424285/unnamed_wf6wys.jpg',
          title: ' NAM ENIM EROS ',
          description: '8 Rue de Montpensier  ',
          ticket: '15$',
          buttonText: 'buy ticket',
        },
      ],

  //   scheduleText:
  //     props.session.length > 0
  //       ? [...props.session]
  //       : [
  //           {
  //             id: 1,
  //             day: 'dd/mm/yyyy',
  //             address: {
  //               location: '227 Nguyen Van Cu',
  //             },
  //             quantity: 1000,
  //             name: ' Coffee & Conversation',
  //           },
  //           {
  //             id: 2,
  //             day: 'dd/mm/yyyy',
  //             address: {
  //               location: '227 Nguyen Van Cu',
  //             },
  //             quantity: 1000,
  //             name: ' Coffee & Conversation',
  //           },
  //         ],
});
export { ScheduleState };
