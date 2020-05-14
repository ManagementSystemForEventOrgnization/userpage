import history from '../utils/history';

const handleCatch = (dispatch, call, err) => {
  const { data, status } = err.response;
  if (data) {
    dispatch(call(data.error.message));
    if (status !== 600) {
      localStorage.removeItem('isLogined');
      localStorage.removeItem('username');
      localStorage.removeItem('avatar');
      history.push('/');
    }
  } else {
    dispatch(call('OPPs! Something wrong'));
  }
};

export default handleCatch;
