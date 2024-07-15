import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { loadingReducer } from "./loading/loading.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
});
