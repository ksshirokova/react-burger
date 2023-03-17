import { SEND_EMAIL_REQUEST, LOGOUT_SUCCESS, LOGOUT_REQUEST, SEND_EMAIL_SUCCESS, SEND_NEW_DATA, AUTH_CHECKED,SEND_EMAIL_FAILED, USER_SUCCESS,SEND_NEW_PASSWORD_REQUEST, SEND_NEW_PASSWORD_SUCCESS, SEND_NEW_PASSWORD_FAILED, SEND_NEW_USER_REQUEST, SEND_NEW_USER_SUCCESS, SEND_NEW_USER_FAILED, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, RESET_USERS_DATA } from "../actions/routing";

import { deleteCookie } from "../../utils/utils";
const initialState = {
    isAuth:false,
    loading: false,
    error: null,
    user: {},
    isRegistred: false,
    isLogged: false,
    password: null,
    isAuthChecked: false
};

export const routingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_EMAIL_REQUEST: {
            return { ...state, loading: true };
        }
        case SEND_EMAIL_SUCCESS: {
            return {
                ...state,
                loading: false,
                email:  action.email,

            };

        }
        case SEND_EMAIL_FAILED: {
            return { ...state, error: action.payload.error, loading: false };

        }
        case SEND_NEW_PASSWORD_REQUEST:{
            return { ...state, loading: true };
        }
        case SEND_NEW_PASSWORD_SUCCESS:{
            return { ...state,
                loading: false,
                password:  action.password,
                token:  action.token};
        }
        case SEND_NEW_PASSWORD_FAILED: {
            return { ...state, error: action.payload.error, loading: false };

        }
        case SEND_NEW_USER_REQUEST:{
            return { ...state, loading: true,  isRegistred: false };
        }
        case SEND_NEW_USER_SUCCESS: {
            return { ...state,
                loading: false,
                password:  action.password,
                email:  action.email,
                name: action.name,
                isRegistred: true,
                user: {
                    email: action.email,
                    name: action.name,
                    password: action.password,
                },
                error: null
            
            };
        }
        case SEND_NEW_USER_FAILED: {
            return { ...state, error: action.payload.error, loading: false,  isRegistred: false };
        }
        case LOGIN_USER_REQUEST:{
            return { ...state, loading: true, isAuth: false };
        }
        case LOGIN_USER_SUCCESS:{
            
            return { ...state,
                loading: false,
                password:  action.password,
                isLogged: true,
                error: null,
                
                isAuth: true,
                user: action.user
               
            
            };
        }
        case USER_SUCCESS:{
            return { ...state,
                loading: false,
                isAuth:true,
                user: action.user,
                
               
            
            };
        }
        case AUTH_CHECKED:{
            return{
                ...state,
                isAuthChecked: true
            }
        }
        case LOGIN_USER_FAILED: {
            return { ...state, isAuth: false, error: action.payload.error, loading: false };
        }
        case SEND_NEW_DATA:{
            return { ...state,
                loading: false,
                password:  action.password,
                email:  action.email,
                name: action.name,
                
                user: {
                    email: action.email,
                    name: action.name,
                    password: action.password,
                },
                error: null
            
            };
        }
        case LOGOUT_REQUEST: {
            return{
                ...state, isLoading: true
            }
        }
        case LOGOUT_SUCCESS: {
            deleteCookie('token');
            deleteCookie('refreshToken');
            return{
                ...state, isLoading: false, isLogged: false, isAuth: false
            }
        }
        case RESET_USERS_DATA:{
            return{
                ...state, user: {}, password: null
            }
               
        }
        default: {
            return state;
          }
    }
}