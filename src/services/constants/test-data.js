export const mainElement = {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    name: "Филе Люминесцентного тетраодонтимформа",
    price: 988,
    proteins: 44,
    type: "main",
    __v: 0,
    _id: "60d3b41abdacab0026a733c8",
};

export const bunElement = {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "Краторная булка N-200i",
    price: 1255,
    proteins: 80,
    type: "bun",
    __v: 0,
    _id: "60d3b41abdacab0026a733c6",
};

export const sauceElement = {
    calories: 30,
    carbohydrates: 40,
    fat: 20,
    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    name: "Соус Spicy-X",
    price: 90,
    proteins: 30,
    type: "sauce",
    __v: 0,
    _id: "60d3b41abdacab0026a733cc",
};

export const elementsArray =[
    mainElement, bunElement, sauceElement
]


export const ingredients = [
    
        {
            calories: 30,
            carbohydrates: 40,
            fat: 20,
            image: "https://code.s3.yandex.net/react/code/sauce-02.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            name: "Соус Spicy-X",
            price: 90,
            proteins: 30,
            type: "sauce",
            __v: 0,
            _id: "60d3b41abdacab0026a733cc",
        },
    

    
        {
            calories: 420,
            carbohydrates: 53,
            fat: 24,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            name: "Краторная булка N-200i",
            price: 1255,
            proteins: 80,
            type: "bun",
            __v: 0,
            _id: "60d3b41abdacab0026a733c6",
        },
    

    
        {
            calories: 643,
            carbohydrates: 85,
            fat: 26,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            name: "Филе Люминесцентного тетраодонтимформа",
            price: 988,
            proteins: 44,
            type: "main",
            __v: 0,
            _id: "60d3b41abdacab0026a733c8",
        },
    
]

export const feedOrders = {
    orders: [
        {
            createdAt: "2023-04-12T09:00:33.013Z",
            ingredients: [
                "60d3b41abdacab0026a733c7",

                "60d3b41abdacab0026a733cd",

                "60d3b41abdacab0026a733cc",

                "60d3b41abdacab0026a733c7",
            ],

            name: "Space spicy флюоресцентный бургер",
            number: 48563,
            status: "done",
            updatedAt: "2023-04-12T09:00:33.453Z",
            _id: "643673310905fd001b629498",
        },

        {
            createdAt: "2023-04-12T06:05:33.194Z",
            ingredients: [
                "60d3b41abdacab0026a733c7",

                "60d3b41abdacab0026a733cd",

                "60d3b41abdacab0026a733cc",

                "60d3b41abdacab0026a733c7",
            ],

            name: "Space флюоресцентный бургер",
            number: 48567,
            status: "done",
            updatedAt: "2023-04-12T09:00:33.453Z",
            _id: "64364a2d0905fd001b62946f",
        },
    ],
};

export const orderItems = {
    name: "Люминесцентный экзо-плантаго флюоресцентный минеральный space альфа-сахаридный антарианский бургер",
    order: {
        _id: "642869c00905fd001b626096",
        status: "done",
        name: "Люминесцентный экзо-плантаго флюоресцентный минеральный space альфа-сахаридный антарианский бургер",
    },
    _id: "642869c00905fd001b626096",

    createdAt: "2023-04-01T17:28:32.529Z",
    ingredients: [
        {
            _id: "60d3b41abdacab0026a733cd",
            name: "Соус фирменный Space Sauce",
            type: "sauce"
        },
        {
            _id: "60d3b41abdacab0026a733cf",
            name: "Соус с шипами Антарианского плоскоходца",
            type: "sauce"
        },
        {
            _id: "60d3b41abdacab0026a733c8",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main"
        },
        {
            _id: "60d3b41abdacab0026a733d0",
            name: "Хрустящие минеральные кольца",
            type: "main",
            action: {
                type: "ADD_ORDER_SUCCESS"
            }
        },
        {
            _id: "60d3b41abdacab0026a733d2",
            name: "Кристаллы марсианских альфа-сахаридов",
            type: "main"
        },
        {
            _id: "60d3b41abdacab0026a733d3",
            name: "Мини-салат Экзо-Плантаго",
            type: "main"
        },
        {
            _id: "60d3b41abdacab0026a733c7",
            name: "Флюоресцентная булка R2-D3",
            type: "bun"
        }],
    number: 47319,
    owner: {
        name:
            "123123",
        email: "123@123.ru",
        createdAt: "2023-03-07T12:18:04.142Z"
    },
    price: 7606,
    status: "done",
    updatedAt: "2023-04-01T17:28:33.098Z",
    success: true,

}

export const userLoginData = {
    success: true,
    accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGYzNDYxOTM2YjE3MDAxYmU2OGZhNyIsImlhdCI6MTY4MTI5OTk2NSwiZXhwIjoxNjgxMzAxMTY1fQ.H0MCSXBUFF_DOfXaFU9Xgod8VpPbUZSJAFP3A-O1fUU",
    refreshToken: "0a8b3f98deb503312624cd6e9679f194cb686b7c5944b93bc21f2c7240456daa295eb3801bcfbf11",
    user: {
        email: "test@ya.ru",
        name: "Test"
    }
}

export const userTest = {
    email: "123@123.ru",
    name: "123123a"
}
export const userWithPassword = {
    email: "123@123.ru",
    name: "123123qwe",
    password: "123qwe"
}


export const testConsts = {
    API_URL: `https://norma.nomoreparties.space/api`,
    modalContainer: "[class^=modal_container_]"
    };