import animalReducer from './animal.reducer';
import homeReducer from './home.reducer';
import authReducer from './auth.reducer';
import userReducer from './user.reducer';

const reducer = {
  home: homeReducer,
  animal: animalReducer,
  auth: authReducer,
  user: userReducer,
};

export default reducer;
