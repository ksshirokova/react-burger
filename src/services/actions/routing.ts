import { AppDispatch } from "../../utils";
import {
  sendEmailApi,
  sendNewPasswordApi,
  registerUserApi,
  loginUserApi,
  getUserApi,
  changeUsersDataApi,
} from "../../utils/api";
import { getCookie } from "../../utils/utils";
import { logoutApi } from "../../utils/api";
import {
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILED,
  SEND_NEW_PASSWORD_REQUEST,
  SEND_NEW_PASSWORD_SUCCESS,
  SEND_NEW_PASSWORD_FAILED,
  SEND_NEW_USER_REQUEST,
  SEND_NEW_USER_SUCCESS,
  SEND_NEW_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  USER_SUCCESS,
  USER_REQUEST,
  USER_FAILED,
  AUTH_CHECKED,
  SEND_NEW_DATA,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  RESET_USERS_DATA,
  VISITED_FORGOT_PASSWORD,
  LOGOUT_FAILED,
} from "../constants";

export interface ISendEmailRequest {
  readonly type: typeof SEND_EMAIL_REQUEST;
}

export interface ISendEmailSuccess {
  readonly type: typeof SEND_EMAIL_SUCCESS;
  readonly email: string;
}

export interface ISendEmailFailed {
  readonly type: typeof SEND_EMAIL_FAILED;
  readonly payload: { error: string };
}

export interface ISendNewPasswordRequest {
  readonly type: typeof SEND_NEW_PASSWORD_REQUEST;
}

export interface ISendNewPasswordSuccess {
  readonly type: typeof SEND_NEW_PASSWORD_SUCCESS;
  readonly password: string;
  readonly token: string;
}

export interface ISendNewPasswordFailed {
  readonly type: typeof SEND_NEW_PASSWORD_FAILED;
  readonly payload: { error: string };
}

export interface ISendNewUserRequest {
  readonly type: typeof SEND_NEW_USER_REQUEST;
}

export interface ISendNewUserSuccess {
  readonly type: typeof SEND_NEW_USER_SUCCESS;

  readonly password: string;
  readonly email: string;
  readonly name: string;
}

export interface ISendNewUserFailed {
  readonly type: typeof SEND_NEW_USER_FAILED;
  readonly payload: { error: string };
}

export interface ILoginUserRequest {
  readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUserSuccess {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly user: {
    email: string;
    password?: string;
    name: string;
  };
  readonly refreshToken: string;
  readonly accessToken: string;
  readonly password: string;
}

export interface ILoginUserFailed {
  readonly type: typeof LOGIN_USER_FAILED;
  readonly payload: { error: string };
}

export interface IUserRequest {
  readonly type: typeof USER_REQUEST;
}

export interface IUserSuccess {
  readonly type: typeof USER_SUCCESS;

  readonly user: { email: string; name: string };
}

export interface IUserFailed {
  readonly type: typeof USER_FAILED;
}

export interface IAuthChecked {
  readonly type: typeof AUTH_CHECKED;
}

export interface ISendNewData {
  readonly type: typeof SEND_NEW_DATA;
  readonly password: string;
  readonly email: string;
  readonly name: string;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
  readonly payload: { error: string };
}

export interface IResetUsersData {
  readonly type: typeof RESET_USERS_DATA;
}

export interface IVisitedForgotPassword {
  readonly type: typeof VISITED_FORGOT_PASSWORD;
}

export type TRoutingActions =
  | ISendEmailRequest
  | ISendEmailSuccess
  | ISendEmailFailed
  | ISendNewPasswordRequest
  | ISendNewPasswordSuccess
  | ISendNewPasswordFailed
  | ISendNewUserRequest
  | ISendNewUserSuccess
  | ISendNewUserFailed
  | ILoginUserRequest
  | ILoginUserSuccess
  | ILoginUserFailed
  | IUserRequest
  | IUserSuccess
  | IUserFailed
  | IAuthChecked
  | ISendNewData
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutFailed
  | IResetUsersData
  | IVisitedForgotPassword;

export const sendEmail = (email: string) => (dispatch: AppDispatch) => {
  dispatch({ type: SEND_EMAIL_REQUEST, loading: true, emailSent: false });

  sendEmailApi(email)
    .then((res: any) => {
      dispatch({
        type: SEND_EMAIL_SUCCESS,

        ...res,
      });
    })

    .catch((err) => {
      dispatch({ type: SEND_EMAIL_FAILED, payload: { error: err } });
    });
};

export const sendNewPassword =
  (newPassword: string, code: string) => (dispatch: AppDispatch) => {
    dispatch({ type: SEND_NEW_PASSWORD_REQUEST });

    sendNewPasswordApi(newPassword, code)
      .then((res: any) => {
        dispatch({
          type: SEND_NEW_PASSWORD_SUCCESS,
          ...res,
        });
      })

      .catch((err) => {
        dispatch({ type: SEND_NEW_PASSWORD_FAILED, payload: { error: err } });
      });
  };

export const registerUser =
  (name: string, email: string, password: string) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: SEND_NEW_USER_REQUEST });

    registerUserApi(name, email, password)
      .then((res: any) => {
        res.success === true &&
          dispatch({
            type: SEND_NEW_USER_SUCCESS,
            name: name,
            email: email,
            password: password,
            ...res,
          });
      })

      .catch((err) => {
        dispatch({ type: LOGIN_USER_FAILED, payload: { error: err } });
      });
  };

export const loginUser =
  (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });

    loginUserApi(email, password)
      .then((res: any) => {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          password: password,
          ...res,
        });
        
      
      })

      .catch((err) => {
        dispatch({ type: LOGIN_USER_FAILED, payload: { error: err } });
      });
  };

export const checkAuth = () => (dispatch: AppDispatch) => {
  dispatch(getUser(getCookie("token")));
  dispatch({ type: AUTH_CHECKED, isAuthChecked: true });
};

export const getUser =
  (token: string | undefined) => (dispatch: AppDispatch) => {
    dispatch({ type: USER_REQUEST });

    getUserApi(token)
      .then((res: any) => {
        dispatch({
          type: USER_SUCCESS,
          user: res.user,
        });
      })
      .catch((err) => {
        dispatch({ type: USER_FAILED, payload: err });
      });
  };

export const changeData =
  (name: string, email: string, password: string) =>
  (dispatch: AppDispatch) => {
    changeUsersDataApi(name, email, password)
      .then((res: any) => {
        setTimeout(() => {
          dispatch({
            type: SEND_NEW_DATA,
            name: name,
            email: email,
            password: password,
            ...res,
          });
        }, 0);
      })
      .catch((err) => console.log(`ошибка ${err}, данные не изменились`));
  };

export const logoutFromSite =
  (refreshToken: string | undefined) => (dispatch: AppDispatch) => {
    dispatch({ type: LOGOUT_REQUEST, isLoading: true });
    logoutApi(refreshToken)
      .then(() => {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      })
      .then(() => {
        dispatch({
          type: RESET_USERS_DATA,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILED,
          payload: err,
        });
      });
  };
