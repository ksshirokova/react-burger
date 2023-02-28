
const API_URL = "https://norma.nomoreparties.space/api";



export const getIngredientsApi = async () => {
  return await new Promise(resolve =>
    setTimeout(() => {
      resolve(
        fetch(`${API_URL}/ingredients`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
          })
          // .then((res) => console.log(res))

      );
    }, 0)
  );
}; 

// getIngredientsApi().then((res)=> console.log(res))