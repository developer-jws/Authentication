import validator from "validator";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { checkEmailExistsRequest } from "api/authAPI";
import { handleActionExists } from "lib/reducer";

//Actions
// Form
const CHANGE_INPUT = "CHANGE_INPUT";
const INITIALIZE_FORM = "INITIALIZE_FORM";

// Email Exists
const CHECK_EMAIL_EXISTS = "CHECK_EMAIL_EXISTS";
const CHECK_EMAIL_EXISTS_SUCCESS = "CHECK_EMAIL_EXISTS_SUCCESS";
const CHECK_EMAIL_EXISTS_ERROR = "CHECK_EMAIL_EXISTS_ERROR";

// Password Check
const CHECK_PASSWORD = "CHECK_PASSWORD";
const CHECK_PASSWORD_SUCCESS = "CHECK_PASSWORD_SUCCESS";
const CHECK_PASSWORD_ERROR = "CHECK_PASSWORD_ERROR";

// Action Creators
// Form
export const changeInput = ({ form, name, value }) => ({
  type: CHANGE_INPUT,
  form,
  name,
  value,
});
export const initializeForm = (form) => ({
  type: INITIALIZE_FORM,
  form,
});

// Email Exists
export const checkEmailExists = (payload) => ({
  type: CHECK_EMAIL_EXISTS,
  payload,
});
export const checkEmailExistSuccess = () => ({
  type: CHECK_EMAIL_EXISTS_SUCCESS,
});
export const checkEmailExistError = (payload = "") => ({
  type: CHECK_EMAIL_EXISTS_ERROR,
  payload,
});

// Password Check
export const checkPassword = (payload) => ({
  type: CHECK_PASSWORD,
  payload,
});
export const checkPasswordSuccess = () => ({
  type: CHECK_PASSWORD_SUCCESS,
});
export const checkPasswordError = (payload = "") => ({
  type: CHECK_PASSWORD_ERROR,
  payload,
});

// Saga
// Email Exists
export function* checkEmailExistsSaga(action) {
  try {
    if (action.payload === "") {
      return yield put(checkEmailExistError(""));
    }

    if (!validator.isEmail(action.payload)) {
      return yield put(checkEmailExistError("잘못된 이메일 형식입니다."));
    }

    const res = yield call(checkEmailExistsRequest, action.payload);
    if (res.exists) {
      yield put(checkEmailExistSuccess());
    } else {
      yield put(checkEmailExistError("이미 사용 중인 이메일입니다."));
    }
  } catch (error) {
    yield put(checkEmailExistError("오류가 발생했습니다."));
  }
}

// Password Check
export function* checkPasswordSaga(action) {
  const { password, confirmPassword } = action.payload;

  if (password !== confirmPassword) {
    yield put(checkPasswordError("비밀번호가 일치하지 않습니다."));
  } else {
    // 비밀번호 정규식 검사
    yield put(checkPasswordSuccess());
  }
}

export function* formSaga() {
  yield takeLatest(CHECK_EMAIL_EXISTS, checkEmailExistsSaga);
  yield takeLatest(CHECK_PASSWORD, checkPasswordSaga);
}

const initialState = {
  register: {
    form: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    exists: {
      email: false,
      password: false,
      emailMessage: "",
      passwordMessage: "",
    },
  },
  login: {
    form: {
      email: "",
      password: "",
    },
  },
};

// Reducer
export default function form(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        [action.form]: {
          ...state[action.form],
          form: {
            ...state[action.form].form,
            [action.name]: action.value,
          },
        },
      };
    case INITIALIZE_FORM:
      return {
        ...state,
        [action.form]: {
          ...state[action.form],
          form: {
            ...initialState[action.form].form,
          },
        },
      };
    case CHECK_EMAIL_EXISTS_SUCCESS:
    case CHECK_EMAIL_EXISTS_ERROR:
      return handleActionExists(
        CHECK_EMAIL_EXISTS,
        "register",
        "email"
      )(state, action);
    case CHECK_PASSWORD_SUCCESS:
    case CHECK_PASSWORD_ERROR:
      return handleActionExists(
        CHECK_PASSWORD,
        "register",
        "password"
      )(state, action);
    default:
      return state;
  }
}
