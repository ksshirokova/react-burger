export type TOrderState = {
    isOpened: boolean,
    loading: boolean,
    orderItems: [{
        _id: string;
        status: string;
        name: string;
        number: number
    }
    ]

}
export type TItem = {
    _id: string,
    name: string,
    price: number,
    image: string,
    image_large: string,
    image_mobile: string,
    type: string,
    calories: number,
    carbohydrates: number,
    fat: number,
    proteins: number,
    __v: number,
    uid: string,
    uuid: string,
    index: number
}

// type TOrder = {
//     [key: string]: string
// }

export type TIngredientsInfoState = {
    ingIsOpened: boolean,
    item: TItem
    

}

export type TRouteState = {
    emailSent: boolean,
    error: string,
    forgotPassVisited: boolean,
    isAuth: boolean,
    isAuthChecked: boolean,
    isLogged: boolean,
    isRegistred: boolean,
    loading: boolean,
    password: string,
    user: {
        name: string,
        email: string
    },
    userChecked: boolean,
    userCheked: boolean


}

// export type TOptions = {
//     method: string,
//     headers?: {
//         Authorization?: string ,
//         "Content-Type"?: string | undefined,
//         Accept?: string | undefined,
//     } | undefined,
//     body?: BodyInit,


// }

export type TConstructorState = {
    draggedBuns: Array<TItem>

    draggedElement: TItem
    draggedFilling: Array<TItem>
}

export type TRefreshUsersData = {
    success: boolean,
    accessToken: string,
    refreshToken: string
}
export type TIngredientsState={
    bun:Array<TItem>,
    count?: any,
    data: Array<TItem>,
    error?: any,
    loading: boolean,
    main: Array<TItem>,
    sauce: Array<TItem>
}


export type TConstructorProps = {
  id?: string,
  item: TItem,
  index: number,
  type?: "top"| "bottom" | undefined,
  isLocked: boolean,
  toClose: (parametr: number) => void ,
  typeOfText: string,
  className: string,
}

export type TIngredientsProps ={
    ingredients: Array<TItem>,
    name: string,
  onOpen: (parametr: TItem) => void | undefined,
  onDragHandler: (event: any, item: TItem)=>void,
  elRef: any,
  currentId: string,
}