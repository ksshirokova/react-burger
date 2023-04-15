import { requestData, getCookie, checkResponse, setCookie } from "./utils";

import { TRefreshUsersData } from "./types";
import { getUser } from "../services/actions/routing";

const API_URL = "https://norma.nomoreparties.space/api";

export const getIngredientsApi = () => {
  return requestData(`${API_URL}/ingredients`);
};

export const sendOrdersData = (burgerIngredients: Array<object>) => {
  return requestData(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: getCookie("token"),
    },
    body: JSON.stringify({
      ingredients: burgerIngredients,
    }),
  });
};

export const sendEmailApi = (usersEmail: string) => {
  return requestData(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: usersEmail,
    }),
  });
};

export const sendNewPasswordApi = (
  usersPassword: string,
  usersToken: string
) => {
  return requestData(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      password: usersPassword,
      token: usersToken,
    }),
  });
};

export const registerUserApi = (
  usersName: string,
  usersEmail: string,
  usersPassword: string
) => {
  return requestData(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: usersEmail,
      password: usersPassword,
      name: usersName,
    }),
  });
};

export const loginUserApi = (usersEmail: string, usersPassword: string) => {
  return requestData(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      email: usersEmail,
      password: usersPassword,
    }),
  });
};
export const getUserApi = (token: string | undefined) => {
  return fetchWithRefresh(`${API_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: 'Bearer ' + `${token}`,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
};



export const changeUsersDataApi = (
  newName: string,
  newEmail: string,
  newPassword: string | undefined | null
) => {
  return requestData(`${API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify({
      name: newName,
      email: newEmail,
      password: newPassword,
    }),
  });
};

export const logoutApi = (refreshToken: string | undefined) => {
  return requestData(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
};

export const refreshToken = (refreshToken: string | undefined) => {
  return fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
};

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    console.log(res)
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired" || 'jwt malformed') {

      const refreshUsersData = await refreshToken(getCookie("refreshToken"));
      console.log(refreshUsersData) //здесь не ок, когда обновляю первый раз
      console.log('дошло до объявления константы')
      //ломается потому что в checkResponse не ок

      await checkResponse<TRefreshUsersData>(refreshUsersData).then(
        (res) => {
          console.log(res)
          console.log('дошло до блока then')
          options.headers.Authorization = res.accessToken;
          setCookie("token", res.accessToken, { secure: true, 'max-age': 20000, SameSite: "Lax" });
          
          console.log(getCookie('token'))
          console.log(getCookie('refreshToken'))

          console.log('token chaged')

          setCookie("refreshToken", res.refreshToken, { secure: true, SameSite: "Lax" });

        }
      )
        .catch((res) => {
          console.log(res)
        })

      const res = await fetch(url, options);
      console.log('дошло до последней проверки')
      return await checkResponse(res)
      // .then((res)=>console.log(res))
      // .catch((res) => {
      //   console.log(res)
      // })
      
    } else {
      return Promise.reject(err);
    }
  }
};

