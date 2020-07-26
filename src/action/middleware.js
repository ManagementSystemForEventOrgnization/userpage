import history from '../utils/history';

const handleCatch = (dispatch, call, err) => {
  if (err.response) {
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
  } else {
    dispatch(call('OPPs! Something wrong'));
  }
};

export default handleCatch;
