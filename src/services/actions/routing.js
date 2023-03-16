import { sendEmailApi, sendNewPasswordApi, registerUserApi, loginUserApi, getUserApi, changeUsersDataApi } from "../../utils/api";
import { setCookie } from "../../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/utils";
import { refreshToken, logoutApi } from "../../utils/api";


export const SEND_EMAIL_REQUEST = "SEND_EMAIL_REQUEST";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILED = "SEND_EMAIL_FAILED";

export const SEND_NEW_PASSWORD_REQUEST = "SEND_NEW_PASSWORD_REQUEST";
export const SEND_NEW_PASSWORD_SUCCESS = "SEND_NEW_PASSWORD_SUCCESS";
export const SEND_NEW_PASSWORD_FAILED = "SEND_NEW_PASSWORD_FAILED";

export const SEND_NEW_USER_REQUEST = "SEND_NEW_USER_REQUEST";
export const SEND_NEW_USER_SUCCESS = "SEND_NEW_USER_SUCCESS";
export const SEND_NEW_USER_FAILED = "SEND_NEW_USER_FAILED";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";

export const USER_SUCCESS = 'USER_SUCCESS';

export const AUTH_CHECKED = 'AUTH_CHECKED'

export const SEND_NEW_DATA = 'SEND_NEW_DATA'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export const RESET_USERS_DATA = 'RESET_USERS_DATA'



export const sendEmail = (email) => (dispatch) => {
  dispatch({ type: SEND_EMAIL_REQUEST });

  sendEmailApi(email)
    .then((res) => {
      dispatch({
        type: SEND_EMAIL_SUCCESS,

        ...res,
      });
    })


    .catch((err) => {
      dispatch({ type: SEND_EMAIL_FAILED, payload: { error: err } });
    });
};

export const sendNewPassword = (newPassword, code) => (dispatch) => {
  dispatch({ type: SEND_NEW_PASSWORD_REQUEST });

  sendNewPasswordApi(newPassword, code)
    .then((res) => {
      dispatch({
        type: SEND_NEW_PASSWORD_SUCCESS,
        ...res,
      });
    })


    .catch((err) => {
      dispatch({ type: SEND_NEW_PASSWORD_FAILED, payload: { error: err } });
    });
};

export const registerUser = (name, email, password) => (dispatch) => {

  dispatch({ type: SEND_NEW_USER_REQUEST });

  registerUserApi(name, email, password)
    .then((res) => {
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

export const loginUser = (email, password) => (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });

  loginUserApi(email, password)
    .then((res) => {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        email: email,
        password: password,
        ...res,
      })

      const authToken = res.accessToken.split('Bearer ')[1];
      console.log(authToken)
      if (authToken) {

        setCookie('token', authToken);
        setCookie('refreshToken', res.refreshToken)
      }
    })

    .catch((err) => {
      dispatch({ type: LOGIN_USER_FAILED, payload: { error: err } });
    });
}

export const checkAuth = () => (dispatch) => {

  dispatch(fetchWithRefresh());
  dispatch({ type: AUTH_CHECKED })
}

export const getUser = () => (dispatch) => {
  getUserApi()
    .then((res) => {
      dispatch({ type: USER_SUCCESS, user: res.user })


    })


}

function fetchWithRefresh() {
  return function (dispatch) {
    getUserApi()
      .then((data) => {
        if (data.success) {
          dispatch({
            type: USER_SUCCESS,
            user: data.user
          });
        }
      })
      .catch(err => {

        if (err.message === "jwt expired" || "jwt malformed") {
          refreshToken(getCookie('refreshToken'))
            .then(() => {
            
              return dispatch(getUser());
              console.log(getCookie('refreshToken'))
            })
        } else {
          return Promise.reject(`Error: ${err}`);
        }
      })
  }
}

export const changeData = (name, email, password) => (dispatch) => {
  changeUsersDataApi(name, email, password)
    .then((res) => {
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

export const logoutFromSite = (refreshToken) => (dispatch) => {

  logoutApi(refreshToken)
    .then(() => {
      dispatch({
        type: USER_SUCCESS,
        user: null,
        password: ''
      })
    })
    //   .then(() => {
    //     dispatch({
    //         type: RESET_USERS_DATA,

    //     })
    // })
    .catch((err) => {
      console.log(err)
    })

}



// вызвать ее при монтировании
// export const getUser