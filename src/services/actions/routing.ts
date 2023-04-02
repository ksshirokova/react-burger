import { AppDispatch, AppThunk } from "../../utils";
import { sendEmailApi, sendNewPasswordApi, registerUserApi, loginUserApi, getUserApi, changeUsersDataApi } from "../../utils/api";
import { getCookie } from "../../utils/utils";
import { SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS, SEND_EMAIL_FAILED, SEND_NEW_PASSWORD_REQUEST, SEND_NEW_PASSWORD_SUCCESS, SEND_NEW_PASSWORD_FAILED, SEND_NEW_USER_REQUEST, SEND_NEW_USER_SUCCESS, SEND_NEW_USER_FAILED, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, USER_SUCCESS, USER_REQUEST, USER_FAILED, AUTH_CHECKED, SEND_NEW_DATA, LOGOUT_REQUEST, LOGOUT_SUCCESS, RESET_USERS_DATA, VISITED_FORGOT_PASSWORD, LOGOUT_FAILED } from '../constants'


export interface ISendEmailRequest {
  readonly type: typeof SEND_EMAIL_REQUEST;
  readonly loading: boolean;
  readonly emailSent: boolean
}

export interface ISendEmailSuccess {
  readonly type: typeof SEND_EMAIL_SUCCESS;
  readonly loading: boolean;
  readonly emailSent: boolean;
  readonly email: string
}

export interface ISendEmailFailed {
  readonly type: typeof SEND_EMAIL_FAILED;
  readonly loading: boolean;
  readonly emailSent: boolean;
  readonly error: null | string
  readonly payload: any;
}

export interface ISendNewPasswordRequest {
  readonly type: typeof SEND_NEW_PASSWORD_REQUEST;
  readonly loading: boolean;
}

export interface ISendNewPasswordSuccess {
  readonly type: typeof SEND_NEW_PASSWORD_SUCCESS;
  readonly loading: boolean;
  readonly password: string;
  readonly token: string;
}

export interface ISendNewPasswordFailed {
  readonly type: typeof SEND_NEW_PASSWORD_FAILED;
  readonly loading: boolean;
  readonly error: null | string;
  readonly payload: any;
}

export interface ISendNewUserRequest {
  readonly type: typeof SEND_NEW_USER_REQUEST;
  readonly loading: boolean;
  readonly isRegistred: boolean;
}

export interface ISendNewUserSuccess {
  readonly type: typeof SEND_NEW_USER_SUCCESS;
  readonly loading: boolean;
  readonly isRegistred: boolean;

  readonly password: string,
  readonly email: string,
  readonly name: string,

  readonly user: {
    email: string,
    name: string,
    password: string,
  },
  readonly error: string | null
}

export interface ISendNewUserFailed {
  readonly type: typeof SEND_NEW_USER_FAILED;
  readonly loading: boolean;
  readonly isRegistred: boolean;
  readonly error: null | string;
  readonly payload: any;
}

export interface ILoginUserRequest {
  readonly type: typeof LOGIN_USER_REQUEST;
  readonly loading: boolean;
  readonly isAuth: boolean;
}


export interface ILoginUserSuccess {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly loading: boolean;
  readonly isAuth: boolean;
  readonly accessToken: string,
  readonly refreshToken: string,
  readonly password: string,
  readonly isLogged: boolean,
  readonly error: null | string,


  user: {
    email: string,
    name: string,
    password?: string
  }
}

export interface ILoginUserFailed {
  readonly type: typeof LOGIN_USER_FAILED;
  readonly loading: boolean;
  readonly isAuth: boolean;
  readonly error: null | string,
  readonly payload: any
}

export interface IUserRequest {
  readonly type: typeof USER_REQUEST;
  readonly loading: boolean,
  readonly isAuth: boolean,
  readonly user: null | {},
  readonly userChecked: boolean
}

export interface IUserSuccess {
  readonly type: typeof USER_SUCCESS;
  readonly loading: boolean,
  readonly isAuth: true,
  readonly user: {
    email: string,
    name: string,
    password?: string,
  },
  readonly userChecked: boolean,
  readonly password: string,
  readonly payload: any;
}

export interface IUserFailed {
  readonly type: typeof USER_FAILED;
  readonly loading: boolean,

  readonly isAuth: boolean,
  readonly user: {
    email: string,
    name: string,
    password?: string,
  },
  readonly userCheked: boolean,
  readonly isAuthChecked: boolean
}

export interface IAuthChecked {
  readonly type: typeof AUTH_CHECKED;
  readonly isAuthChecked: boolean

}

export interface ISendNewData {
  readonly type: typeof SEND_NEW_DATA;
  readonly loading: boolean,
  readonly password: string,
  readonly email: string,
  readonly name: string,

  readonly user: {
    email: string,
    name: string,
    password?: string,
  },
  readonly error: null | string

}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
  readonly isLoading: boolean;
  
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly isLoading: boolean;
  readonly isLogged: boolean;
  readonly sAuth: boolean;
}

export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
  readonly isLoading: boolean;
  readonly isLogged: boolean;
  readonly isAuth: boolean;
  readonly error: null | string;
  readonly payload: any;
}

export interface IResetUsersData {
  readonly type: typeof RESET_USERS_DATA;
  readonly user: null;
  readonly password: null;
  
}

export interface IVisitedForgotPassword{
  readonly type: typeof VISITED_FORGOT_PASSWORD;
  readonly forgotPassVisited: boolean;

  
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
| IVisitedForgotPassword

















export const sendEmail: AppThunk = (email: string) => (dispatch: AppDispatch) => {
  dispatch({ type: SEND_EMAIL_REQUEST });

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

export const sendNewPassword: AppThunk = (newPassword: string, code: string) => (dispatch: AppDispatch) => {
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

export const registerUser: AppThunk = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {

  dispatch({ type: SEND_NEW_USER_REQUEST });

  registerUserApi(name, email, password)

    .then((res: any) => {

      res.success == true &&
        dispatch({
          type: SEND_NEW_USER_SUCCESS,
          name: name,
          email: email,
          password: password,
          ...res,
        })



    })

    .catch((err) => {
      dispatch({ type: LOGIN_USER_FAILED, payload: { error: err } });
    });
}

export const loginUser: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST, isLogged: false });

  loginUserApi(email, password)
    .then((res: any) => {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        email: email,
        password: password,
        ...res,
      })



    })


    .catch((err) => {
      dispatch({ type: LOGIN_USER_FAILED, isLogged: false, payload: { error: err } });
    });
}

export const checkAuth: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getUser(getCookie('refreshToken')))
  dispatch({ type: AUTH_CHECKED })
}


export const getUser: AppThunk = (token: string) => (dispatch: AppDispatch) => {
  dispatch({ type: USER_REQUEST })

  getUserApi(token)
    .then((res) => {
      dispatch({ type: USER_SUCCESS, payload: res })


    })
    .catch((err) => {
      dispatch({ type: USER_FAILED, payload: err })
    })



}



export const changeData: AppThunk = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
  changeUsersDataApi(name, email, password)
    .then((res: any) => {

      dispatch({
        type: SEND_NEW_DATA,

        name: name,
        email: email,
        password: password,
        ...res,
      }
      )
    })

}

export const logoutFromSite: AppThunk = (refreshToken: string) => (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST })
  logoutApi(refreshToken)
    .then(() => {
      dispatch({
        type: LOGOUT_SUCCESS

      })
    })
    .then(() => {
      dispatch({
        type: RESET_USERS_DATA

      })
    })
    .catch(() => {
      dispatch({
        type: LOGOUT_FAILED

      })
    })

}



