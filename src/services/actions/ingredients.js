import { getIngredientsApi } from "../../utils/api";
// import { BUNS_CONTAINER } from "./filter-ingredients";
const API_URL = "https://norma.nomoreparties.space/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST' //намерение запросить данные
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'




export const getIngredients = () => (dispatch) => { //функция запроса ингредиентов, которая должна вернуть объект экшена
    dispatch({ type: GET_INGREDIENTS_REQUEST });


    // fetch(`${API_URL}/ingredients`)
    // .then((res) => {
    //   if (res.ok) {
    //     return res.json();
    //   }
    //   return Promise.reject(`Ошибка ${res.status}`);
    // })
    
    getIngredientsApi()
    // .then((res)=> console.log(res))
    .then((res)=>{
        const apiIngredients = res.data;
        const sauce = apiIngredients.filter((item) => item.type === "sauce");
        const bun = apiIngredients.filter((item) => item.type === "bun");
        const main = apiIngredients.filter((item) => item.type === "main");

        dispatch({type: GET_INGREDIENTS_SUCCESS, payload: { data: res,  sauce: sauce, bun: bun, main: main} });
    })
    .catch((err)=>{
        dispatch({type: GET_INGREDIENTS_FAILED, payload: { error: err } })
    })

}

