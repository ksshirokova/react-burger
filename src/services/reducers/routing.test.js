import {
    SEND_EMAIL_REQUEST,
    USER_REQUEST,
    USER_FAILED,
    VISITED_FORGOT_PASSWORD,
    LOGOUT_SUCCESS,
    LOGOUT_REQUEST,
    SEND_EMAIL_SUCCESS,
    SEND_NEW_DATA,
    AUTH_CHECKED,
    SEND_EMAIL_FAILED,
    USER_SUCCESS,
    SEND_NEW_PASSWORD_REQUEST,
    SEND_NEW_PASSWORD_SUCCESS,
    SEND_NEW_PASSWORD_FAILED,
    SEND_NEW_USER_REQUEST,
    SEND_NEW_USER_SUCCESS,
    SEND_NEW_USER_FAILED,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    RESET_USERS_DATA, LOGOUT_FAILED
} from "../constants";
import { userLoginData, userTest, userWithPassword } from "../constants/test-data";



import { routingReducer, initialState } from "./routing";

describe('routing reducer', () => {
    it('should return the initial state', () => {
        expect(routingReducer(undefined, {})).toEqual(
            {
                isAuth: false,
                loading: false,
                error: null,
                user: null,
                isRegistred: false,
                isLogged: false,
                password: "",
                isAuthChecked: false,
                userChecked: false,
                emailSent: false,
                forgotPassVisited: false,
                email: null,
                token: null,
                name: null,
                userCheked: false,
                isLoading: false,
            }
        )
    })
})

it('should handle SEND_EMAIL_REQUEST', () => {
    expect(
        routingReducer(initialState, {
            type: SEND_EMAIL_REQUEST,

        })
    ).toEqual({

        ...initialState, loading: true
    });
});

it('should handle SEND_EMAIL_SUCCESS', () => {
    expect(
        routingReducer(initialState, {
            type: SEND_EMAIL_SUCCESS,
            email: "123@123.ru"

        })
    ).toEqual({
        ...initialState,
        loading: false,
        email: "123@123.ru",
        emailSent: true,
    });
});
it('should handle SEND_EMAIL_FAILED', () => {
    expect(
        routingReducer(initialState, {

            payload: { error: 'error' }, type: SEND_EMAIL_FAILED

        })
    ).toEqual({
        ...initialState, error: 'error'

    });
});

it('should handle SEND_NEW_PASSWORD_REQUEST', () => {
    expect(
        routingReducer(initialState, {
            type: SEND_NEW_PASSWORD_REQUEST,


        })
    ).toEqual({
        ...initialState, loading: true



    });
});

it('should handle SEND_NEW_PASSWORD_SUCCESS', () => {
    expect(
        routingReducer(initialState, {
            type: SEND_NEW_PASSWORD_SUCCESS,
            token: '11234567890qwertyuiop',
            password: '123qwe'


        })
    ).toEqual({
        ...initialState,

        loading: false,
        password: '123qwe',
        token: '11234567890qwertyuiop'

    });
});

it('should handle SEND_NEW_PASSWORD_FAILED', () => {
    expect(
        routingReducer(initialState, {
            type: SEND_NEW_PASSWORD_FAILED,
            payload: { error: 'error' }

        })
    ).toEqual({
        ...initialState,

        error: 'error', loading: false

    });
});


it('should handle VISITED_FORGOT_PASSWORD', () => {
    expect(
        routingReducer(initialState, {
            type: VISITED_FORGOT_PASSWORD,


        })
    ).toEqual({
        ...initialState,

        forgotPassVisited: true,

    });
});


it('should handle SEND_NEW_USER_REQUEST', () => {
    expect(
        routingReducer(initialState, {
            type: SEND_NEW_USER_REQUEST,


        })
    ).toEqual({
        ...initialState,

        loading: true, isRegistred: false

    });
});
it('should handle SEND_NEW_USER_SUCCESS', () => {
    expect(
        routingReducer(initialState, {
            type: SEND_NEW_USER_SUCCESS,
            user: userWithPassword,
            password: '123qwe',
            name: "123123qwe",
            email: "123@123.ru",

        })
    ).toEqual({
        ...initialState,

        loading: false,
        password: '123qwe',
        email: "123@123.ru",
        name: "123123qwe",
        isRegistred: true,
        user: userWithPassword,
        error: null,

    });
});

it('should handle SEND_NEW_USER_FAILED', () => {
    expect(
        routingReducer(initialState, {
            type: SEND_NEW_USER_FAILED,
            payload: { error: 'error' }


        })
    ).toEqual({
        ...initialState,

        error: 'error',
        loading: false,
        isRegistred: false,

    });
});

it('should handle LOGIN_USER_REQUEST', () => {
    expect(
        routingReducer(initialState, {
            type: LOGIN_USER_REQUEST,



        })
    ).toEqual({
        ...initialState,

        loading: true, isAuth: false

    });
});

it('should handle LOGIN_USER_SUCCESS', () => {
    expect(
        routingReducer(initialState, {
            data: userLoginData
        },
            {
                type: LOGIN_USER_SUCCESS,
                data: userLoginData
            }
        )
    ).toEqual({
        ...initialState



    });
});

it('should handle USER_SUCCESS', () => {
    expect(
        routingReducer(initialState, {
            user: userTest, type: USER_SUCCESS,
        }

        )
    ).toEqual({ ...initialState, isAuth: true, user: userTest, userChecked: true })
});


it('should handle USER_REQUEST', () => {
    expect(
        routingReducer(initialState, {
            type: USER_REQUEST,



        })
    ).toEqual({
        ...initialState,

        loading: true
    });
});

it('should handle USER_FAILED', () => {
    expect(
        routingReducer(initialState, {
            type: USER_FAILED,



        })
    ).toEqual({
        ...initialState,
        loading: false,
        isAuth: false,
        user: null,
        userCheked: false,
        isAuthChecked: true,

    });
});

it('should handle AUTH_CHECKED', () => {
    expect(
        routingReducer(initialState, {
            type: AUTH_CHECKED,



        })
    ).toEqual({
        ...initialState,
        isAuthChecked: true

    });
});

it('should handle LOGIN_USER_FAILED', () => {
    expect(
        routingReducer(initialState, {
            type: LOGIN_USER_FAILED,
            payload: { error: 'error' }



        })
    ).toEqual({
        ...initialState,
        isAuth: false,
        error: 'error',
        loading: false,

    });
});

it('should handle SEND_NEW_DATA', () => {
    expect(
        routingReducer(initialState, {
            type: SEND_NEW_DATA,
            user: userWithPassword,
            password: '123qwe',
            email: '123@123.ru',
            name: "123123qwe"




        })
    ).toEqual({
        ...initialState,
        loading: false,
        password: '123qwe',
        email: '123@123.ru',
        name: "123123qwe",

        user: userWithPassword



    });
});

it('should handle LOGOUT_REQUEST', () => {
    expect(
        routingReducer(initialState, {
            type: LOGOUT_REQUEST,




        })
    ).toEqual({
        ...initialState,

        loading: false, isLoading: true

    });
});

it('should handle LOGOUT_SUCCESS', () => {
    expect(
        routingReducer(initialState, {
            type: LOGOUT_SUCCESS,

        })
    ).toEqual({
        ...initialState,
        isLoading: false,
        isLogged: false,
        isAuth: false,


    });
});

it('should handle LOGOUT_FAILED', () => {
    expect(
        routingReducer(initialState, {
            type: LOGOUT_FAILED,
            payload: { error: 'error' }

        })
    ).toEqual({
        ...initialState,
        error: 'error', isLogged: true, isAuth: true


    });
});

it('should handle RESET_USERS_DATA', () => {
    expect(
        routingReducer(initialState, {
            type: RESET_USERS_DATA,


        })
    ).toEqual({
        ...initialState,
        user: null,
        password: null,

    });
});





