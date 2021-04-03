import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { loginRequest, logoutRequest } from "api/authAPI";

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGOUT = "LOGOUT";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const LOGOUT_ERROR = "LOGOUT_ERROR";

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginError = () => ({
  type: LOGIN_ERROR,
});

export const logout = () => ({
  type: LOGOUT,
});

export function* loginSaga(action) {
  try {
    const { email, password, history } = action.payload;

    if (!email || email === "" || !password || password === "") {
      return yield put(loginError());
    }
    const data = yield call(loginRequest, { email, password });

    if (!data.loginSuccess) {
      alert(data.message || "오류가 발생했습니다.");
      return yield put(loginError());
    }
    yield put(loginSuccess(data.userID));
    history.push("/");
    // timeout => Logout
  } catch (error) {
    return yield put(loginError());
  }
}

export function* logoutsaga(action) {
  try {
    yield call(logoutRequest);
  } catch (error) {}
}
export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGOUT, logoutsaga);
}
const initialState = {
  user: null,
  login: {
    loginLoading: false,
    loginSuccess: false,
    loginError: null,
  },
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: "",
        login: {
          loginLoading: true,
          loginSuccess: false,
          loginError: false,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        login: {
          loginLoading: false,
          loginSuccess: true,
          loginError: false,
        },
      };
    case LOGIN_ERROR:
      return {
        ...state,
        user: "",
        login: {
          loginLoading: false,
          loginSuccess: false,
          loginError: true,
        },
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
