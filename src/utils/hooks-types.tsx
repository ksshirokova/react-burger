import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import store from '../services/store'





export type TAppDispatch = typeof store.dispatch

type DispatchFunc = () => TAppDispatch

export const useTypeDispatch: DispatchFunc = useDispatch




