
import { requestData, getCookie, checkResponse, setCookie } from "./utils";

import { TRefreshUsersData } from "./types";

const API_URL = "https://norma.nomoreparties.space/api";

export const getIngredientsApi = async () => {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        requestData(`${API_URL}/ingredients`)

      );
    }, 0)
  );
};

export const sendOrdersData = async (burgerIngredients: Array<object>) => {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        requestData(`${API_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ingredients: burgerIngredients,
          }),
        })
      );
    }, 0)
  );
};

export const sendEmailApi = async (usersEmail: string) => {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        requestData(`${API_URL}/password-reset`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: usersEmail,

          }),
        }
        )

      );
    }, 0)
  );
};

export const sendNewPasswordApi = async (usersPassword: string, usersToken: string) => {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        requestData(`${API_URL}/password-reset`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            password: usersPassword,
            token: usersToken
          }),
        }
        )

      );
    }, 0)
  );
};

export const registerUserApi = async (usersName: string, usersEmail: string, usersPassword: string) => {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        requestData(`${API_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: 'Bearer ' + getCookie('token')
          },
          body: JSON.stringify({
            email: usersEmail,
            password: usersPassword,
            name: usersName

          }),
        }
        )

      );
    }, 0)
  );
};

export const loginUserApi = async (usersEmail:string, usersPassword:string) => {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        requestData(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: 'Bearer ' + getCookie('token')
          },
          body: JSON.stringify({
            email: usersEmail,
            password: usersPassword,

          }),
        }
        )

      );
    }, 0)
  );
};

export const getUserApi = async (token:string) => {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        fetchWithRefresh(`${API_URL}/auth/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: 'Bearer ' + `${token}`
          },
      
        }
      
        )

      );
    }, 0)
  );
};






export const changeUsersDataApi = async (newName:string, newEmail:string, newPassword:string) => {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        requestData(`${API_URL}/auth/user`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: 'Bearer ' + getCookie('token')

          },
          body: JSON.stringify({
            name: newName,
            email: newEmail,
            password: newPassword,

          }),

        }
        )

      );
    }, 0)
  );
};

export const logoutApi = async (refreshToken:string) => {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        requestData(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",


          },
          body: JSON.stringify({
            'token': refreshToken
          })

        }
        )

      );
    }, 0)
  );
}

export const refreshToken = (refreshToken:string | undefined) => {
  return fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      'token': `${refreshToken}`,

    })
  })
}


export const fetchWithRefresh = async (url:string, options: any ) => {
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
    
  } catch (err: any) {
    
    if (err.message === "jwt malformed" || "jwt expired" ) {
      
      const refreshUsersData = await refreshToken(getCookie('refreshToken'));
      
      await checkResponse<TRefreshUsersData>(refreshUsersData)
        .then((refreshUsersData) => {
          options.headers.Authorization = refreshUsersData.accessToken
          setCookie('token', refreshUsersData.accessToken);
          setCookie('refreshToken', refreshUsersData.refreshToken)
        })
        
      
      const res = await fetch(url, options)
      return await checkResponse(res)
    } else {
      return Promise.reject(err);
    }
  }
}