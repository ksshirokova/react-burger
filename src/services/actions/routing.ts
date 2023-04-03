import { AppDispatch, AppThunk } from "../../utils";
import { sendEmailApi, sendNewPasswordApi, registerUserApi, loginUserApi, getUserApi, changeUsersDataApi } from "../../utils/api";
import { getCookie } from "../../utils/utils";
import { logoutApi } from "../../utils/api";
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
  readonly payload:{error: string}  
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
  readonly payload: {error: string }
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
  readonly payload: {error: string}
}

export interface ISendNewUserFailed {
  readonly type: typeof SEND_NEW_USER_FAILED;
  readonly loading: boolean;
  readonly isRegistred: boolean;
  readonly payload: {error: string}
  
}

export interface ILoginUserRequest {
  readonly type: typeof LOGIN_USER_REQUEST;
  readonly loading: boolean;
  readonly isAuth: boolean;
  readonly isLogged: boolean
}


export interface ILoginUserSuccess {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly loading: boolean;
  readonly isAuth: boolean;
  readonly accessToken: string,
  readonly refreshToken: string,
  readonly password: string,
  readonly isLogged: boolean,
  readonly payload: {error: string}


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
  readonly payload: {error: string}
  readonly isLogged: boolean,

}

export interface IUserRequest {
  readonly type: typeof USER_REQUEST;
  readonly loading: boolean,
  readonly isAuth: boolean,
  readonly userChecked: boolean
}

export interface IUserSuccess {
  readonly type: typeof USER_SUCCESS;
  readonly loading: boolean,
  readonly isAuth: true,
  readonly userChecked: boolean,
  readonly password?: string,
  readonly payload: any
  
}

export interface IUserFailed {
  readonly type: typeof USER_FAILED;
  readonly loading: boolean,

  readonly isAuth: boolean,
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
  readonly payload: {error: string}

}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
  readonly isLoading: boolean;
  
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly isLoading: boolean;
  readonly isLogged: boolean;
  readonly isAuth: boolean;
}

export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
  readonly isLoading: boolean;
  readonly isLogged: boolean;
  readonly isAuth: boolean;
  readonly payload: {error: string}

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
      dispatch({ type: SEND_EMAIL_FAILED, payload: err, loading: false, emailSent: false });
    });
};

export const sendNewPassword = (newPassword: string, code: string) => (dispatch: AppDispatch) => {
  dispatch({ type: SEND_NEW_PASSWORD_REQUEST, loading: true });

  sendNewPasswordApi(newPassword, code)
    .then((res: any) => {
      dispatch({
        type: SEND_NEW_PASSWORD_SUCCESS,
        ...res,
      });
    })


    .catch((err) => {
      dispatch({ type: SEND_NEW_PASSWORD_FAILED, payload: err, loading: false });
    });
};

export const registerUser = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {

  dispatch({ type: SEND_NEW_USER_REQUEST, loading: true, isRegistred: false });

  registerUserApi(name, email, password)

    .then((res: any) => {

      res.success === true &&
        dispatch({
          type: SEND_NEW_USER_SUCCESS,
          name: name,
          email: email,
          password: password,
          ...res,
        })



    })

    .catch((err) => {
      dispatch({ type: LOGIN_USER_FAILED, payload: err, loading: false,  isAuth: false, isLogged: false });
    });
}

export const loginUser = (email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST, isLogged: false, loading: true, isAuth: false });

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
      dispatch({ type: LOGIN_USER_FAILED, isLogged: false, payload: err, loading: false, isAuth: false });
    });
}

export const checkAuth = () => (dispatch: AppDispatch) => {
  dispatch(getUser(getCookie('refreshToken')))
  dispatch({ type: AUTH_CHECKED, isAuthChecked: true })
}


export const getUser = (token: string | undefined) => (dispatch: AppDispatch) => {
  dispatch({ type: USER_REQUEST , loading: true, isAuth: false, userChecked: false})

  getUserApi(token)
    .then((res) => {
      dispatch({ type: USER_SUCCESS, loading: false, isAuth: true, userChecked: true, payload: res })


    })
    .catch((err) => {
      dispatch({ type: USER_FAILED, loading: false, isAuth: false, userCheked: false, isAuthChecked: false })
    })



}



export const changeData = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
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

export const logoutFromSite = (refreshToken: string) => (dispatch: AppDispatch) => {
  dispatch({ type: LOGOUT_REQUEST, isLoading: true })
  logoutApi(refreshToken)
    .then(() => {
      dispatch({
        type: LOGOUT_SUCCESS, isLoading: false, isLogged: false, isAuth: false

      })
    })
    .then(() => {
      dispatch({
        type: RESET_USERS_DATA, user: null, password: null

      })
    })
    .catch((err) => {
      dispatch({
        type: LOGOUT_FAILED, isLoading: false, isLogged: true, isAuth: true, payload: err

      })
    })

}



