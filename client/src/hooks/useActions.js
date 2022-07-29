import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { firebaseActions } from '../store/firebase.slice';

const allActions = {
  ...firebaseActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
