
import { requestData } from "./utils";
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
