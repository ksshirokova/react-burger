import { useDispatch } from 'react-redux'
import store from '../services/store'





export type TAppDispatch = typeof store.dispatch

type DispatchFunc = () => TAppDispatch






