import history from '../utils/history';

const handleCatch = (dispatch, call, err) => {
  // console.log(err.response.data);
  const { data, status } = err.response;
  if (data.error) {
    dispatch(call(data.error.message));
    if (status !== 600) {
      localStorage.removeItem('isLogined');
      localStorage.removeItem('username');
      localStorage.removeItem('avatar');
      history.push('/');
    }
  } else dispatch(call('OPPs! Something wrong'));

  //   if (err.response) {
  //     const { data, status } = err.response;
  //     console.log(data);

  //     if (Object.keys(data).length > 0) {
  //       if (data.error && Object.keys(data.error).length > 0) {
  //         dispatch(call(data.error.message));
  //         if (status !== 600) {
  //           localStorage.removeItem('isLogined');
  //           localStorage.removeItem('username');
  //           localStorage.removeItem('avatar');
  //           history.push('/');
  //         }
  //       } else {
  //         dispatch(call('OPPs! Something wrong'));
  //       }
  //     } else {
  //       dispatch(call('OPPs! Something wrong'));
  //     }
  //   } else {
  //     dispatch(call('OPPs! Something wrong'));
  //   }

  //   dispatch(call('OPPs! Something wrong'));
};

export default handleCatch;
