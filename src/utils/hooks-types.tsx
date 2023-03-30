import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { TRootState, TAppDispatch } from '../services/store'


type DispatchFunc = () => TAppDispatch
export const useTypeDispatch: DispatchFunc = useDispatch
export const useTypeSelector: TypedUseSelectorHook<TRootState> = useSelector