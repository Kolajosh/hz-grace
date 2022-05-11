import { publicRequest } from "../requestMethods";
import { cartLogout } from "./cartRedux";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutSuccess,
  updateUserCartFailed,
  updateUserCartStart,
  updateUserCartSuccess,
} from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const logout = (dispatch) => {
  if (dispatch(logoutSuccess())) {
    dispatch(cartLogout());
    alert("User Logout Success");
  } else {
    alert("Logout Failed");
  }
};

