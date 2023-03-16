
import { requestData, getCookie, checkResponse, setCookie } from "./utils";

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

export const sendOrdersData = async (burgerIngredients) => {
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

export const sendEmailApi = async (usersEmail) => {
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

export const sendNewPasswordApi = async (usersPassword, usersToken) => {
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

export const registerUserApi = async (usersName, usersEmail, usersPassword) => {
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

export const loginUserApi = async (usersEmail, usersPassword) => {
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

export const getUserApi = async () => {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        requestData(`${API_URL}/auth/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: 'Bearer ' + getCookie('token')
          },
          
        }
        // .catch((err)=>{
        //   if(err.message === 'jwt malformed'){
        //     setCookie('token', (getCookie('refreshToken')));
        //   }
        // })
        )

      );
    }, 0)
  );
};




export const changeUsersDataApi = async (newName, newEmail, newPassword) => {
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

export const logoutApi = (refreshToken) => {
  requestData(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      'token': refreshToken
    })
  })
}

export const refreshToken = (refreshToken)=>{
return fetch(`${API_URL}/auth/token`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json"
},
  body: JSON.stringify({
      'token': refreshToken,

})
})
}
  

export const fetchWithRefresh = async (url, options) => {
  try {
      const res = await fetch(url, options)
      return await checkResponse(res)
  } catch (err) {
      if (err.message === "jwt expired") {
       
          const refreshData = await refreshToken(getCookie('refreshToken'));
          await checkResponse(refreshData)
              .then((refreshData) => {
                  options.headers.Authorization = refreshData.accessToken
                  setCookie('token', refreshData.accessToken);
                  setCookie('refreshToken', refreshData.refreshToken)
              })
          const res = await fetch(url, options)
          return await checkResponse(res)
      } else {
          return Promise.reject(err);
      }
  }
}