import { SEND_EMAIL_REQUEST,USER_REQUEST, USER_FAILED, VISITED_FORGOT_PASSWORD, LOGOUT_SUCCESS, LOGOUT_REQUEST, SEND_EMAIL_SUCCESS, SEND_NEW_DATA, AUTH_CHECKED, SEND_EMAIL_FAILED, USER_SUCCESS, SEND_NEW_PASSWORD_REQUEST, SEND_NEW_PASSWORD_SUCCESS, SEND_NEW_PASSWORD_FAILED, SEND_NEW_USER_REQUEST, SEND_NEW_USER_SUCCESS, SEND_NEW_USER_FAILED, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, RESET_USERS_DATA } from "../constants";
import { setCookie } from "../../utils/utils";
import { deleteCookie } from "../../utils/utils";
import { LOGOUT_FAILED } from "../constants";
import { TRoutingActions } from "../actions/routing";

export type TRoutingState = {
    isAuth: boolean,
    loading: boolean,
    error: null | string,
    user: null | {
        email: string,
        name: string,
        password?: string,
      },
    isRegistred: boolean,
    isLogged: boolean,
    password?: string | null,
    isAuthChecked: boolean,
    userChecked: boolean,
    emailSent: boolean,
    forgotPassVisited: boolean,
    email?: string | null,
    token?: string | null,
    name?: string | null,
    userCheked: boolean,
    isLoading: boolean,
};
const initialState: TRoutingState = {
    isAuth: false,
    loading: false,
    error: null,
    user: null,
    isRegistred: false,
    isLogged: false,
    password: '',
    isAuthChecked: false,
    userChecked: false,
    emailSent: false,
    forgotPassVisited: false,
    email: null,
    token: null,
    name: null,
    userCheked: false,
    isLoading: false,
};

export const routingReducer = (state = initialState, action: TRoutingActions): TRoutingState => {
    switch (action.type) {
        case SEND_EMAIL_REQUEST: {
            return { ...state, loading: true, emailSent: false};
        }
        case SEND_EMAIL_SUCCESS: {
            return {
                ...state,
                loading: false,
                email: action.email,
                emailSent: true

            };

        }
        case SEND_EMAIL_FAILED: {
            return { ...state, error: action.payload.error, loading: false, emailSent: false };

        }
        case SEND_NEW_PASSWORD_REQUEST: {
            return { ...state, loading: true };
        }
        case SEND_NEW_PASSWORD_SUCCESS: {
            return {
                ...state,
                loading: false,
                password: action.password,
                token: action.token
            };
        }
        case SEND_NEW_PASSWORD_FAILED: {
            return { ...state, error: action.payload.error, loading: false };

        }
        case VISITED_FORGOT_PASSWORD:{
            return {
                ...state, forgotPassVisited: true
            }
        }
        case SEND_NEW_USER_REQUEST: {
            return { ...state, loading: true, isRegistred: false };
        }
        case SEND_NEW_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                password: action.password,
                email: action.email,
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
            return { ...state, error: action.payload.error, loading: false, isRegistred: false };
        }
        case LOGIN_USER_REQUEST: {
            return { ...state, loading: true, isAuth: false };
        }
        case LOGIN_USER_SUCCESS: {
            const authToken = action.accessToken.split('Bearer ')[1];
            if (authToken) {

                setCookie('token', authToken, { secure: true, 'max-age': 100 });
                setCookie('refreshToken', action.refreshToken)
            }
            return {
                ...state,
                loading: false,
                password: action.password,
            
                isLogged: true,
                error: null,
                isAuth: true,
                user: action.user
                


            };
        }
        case USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                isAuth: true,
                user: action.user,
                userChecked: true,
                password: '',

                



            };

        }
        case USER_REQUEST:{
            return {
                ...state,
                loading: true,
                isAuth: false,
                user: null,
                userCheked: false
            }
        }
        case USER_FAILED:{
            return {
            ...state, 
            loading: false,
            isAuth: false,
            user: null,
            userCheked: false,
            isAuthChecked: true

            }

        }
        case AUTH_CHECKED: {
            return {
                ...state,
                isAuthChecked: true
            }
        }
        case LOGIN_USER_FAILED: {
            return { ...state, isAuth: false, error: action.payload.error, loading: false };
        }
        case SEND_NEW_DATA: {
            return {
                ...state,
                loading: false,
                password: action.password,
                email: action.email,
                name: action.name,

                user: {
                    email: action.email,
                    name: action.name,
                    password: action.password,
                },
                

            };
        }
        case LOGOUT_REQUEST: {
            return {
                ...state, isLoading: true
            }
        }
        case LOGOUT_SUCCESS: {
            deleteCookie('token');
            deleteCookie('refreshToken');
            return {
                ...state, isLoading: false, isLogged: false, isAuth: false
            }
        }
        case LOGOUT_FAILED: {
            return {
                ...state, isLoading: false, isLogged: true, isAuth: true, error: action.payload.error
            }
        }
        case RESET_USERS_DATA: {
            return {
                ...state, user: null, password: null
            }

        }
        default: {
            return state;
        }
    }
}