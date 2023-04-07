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
    readonly _id: string,
    readonly name: string,
    readonly price: number ,
    readonly image: string,
    readonly image_large: string,
    readonly image_mobile: string,
    readonly type: string,
    readonly calories: number,
    readonly carbohydrates: number,
    readonly fat: number,
    readonly proteins: number,
    readonly __v: number,
    
    uid: string,
    uuid: string,
    index: number 
}
export type TItemUndefined = {
    readonly _id: string,
    readonly name?: string,
    readonly price: number,
    readonly image?: string,
    readonly image_large?: string,
    readonly image_mobile?: string,
    readonly type?: string,
    readonly calories?: number,
    readonly carbohydrates?: number,
    readonly fat?: number,
    readonly proteins?: number,
    readonly __v?: number,
    
    uid?: string,
    uuid?: string,
    index?: number 
}



export type TOrder = {
    
    _id: string,
    createdAt: string,
    ingredients: any,
    name: string,
    number: number,
    status: string,
    updatedAt: string
    orders: any
    
}

export type TOrderUndefined = {
    
    _id?: string,
    createdAt?: string,
    ingredients?: string[],
    name?: string,
    number?: number,
    status?: string,
    updatedAt?: string
    orders?: any,
    
    
}

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


export type TConstructorState = {
    draggedBuns: Array<TItem> | Array<TItemUndefined>
    draggedElement: TItem | TItemUndefined
    draggedFilling: Array<TItem> |Array<TItemUndefined>
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
  item: TItem |TItemUndefined,
  index: number,
  type?: "top"| "bottom" | undefined,
  isLocked: boolean,
  toClose: (parametr: number) => void ,
  typeOfText: string | undefined,
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