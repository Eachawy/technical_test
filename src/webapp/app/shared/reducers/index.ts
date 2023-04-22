import { ReducersMapObject } from '@reduxjs/toolkit';

import locale from './locale';
import authentication from './authentication';
import users from '../../modules/user-list/userList.reducer';


const rootReducer: ReducersMapObject = {
  authentication,
  users,
  locale,
};

export default rootReducer;
