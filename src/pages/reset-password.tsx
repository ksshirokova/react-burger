import { FormEvent, useEffect, useState, useRef } from "react"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './registration-styles.module.css'
import { NavLink, Link, useNavigate } from "react-router-dom"
import { sendNewPassword } from "../services/actions/routing"
import { useSelector } from "react-redux"
import { TRootState } from "../services/store"
import { TRouteState } from "../utils/types"
import { useTypeDispatch } from "../utils/hooks-types"


export default function ResetPassword() {

    const dispatch = useTypeDispatch()
    const [password, setPassword] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [icon, setIcon] = useState<"HideIcon" | "ShowIcon">('HideIcon')
    const inputRef = useRef<HTMLInputElement>(null!)
    const [inputType, setInputType] = useState<"password" | "text" | undefined>('password');
    const navigate = useNavigate()
    const {forgotPassVisited} = useSelector<TRootState, TRouteState>(state=>state.routeStore)

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        if (inputType === 'password') {
            setInputType('text')
            setIcon('ShowIcon')
        }
        else {
            setInputType('password')
            setIcon('HideIcon')

        }

    }

    useEffect(() => {
        !forgotPassVisited && navigate('/forgot-password')        
    }, [forgotPassVisited, navigate])
    
    const handleClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(sendNewPassword(password, code))
    }

    return (
        <main className={styles.main}>

            <section className={styles.inputs}>
                <form onSubmit={handleClick}>
                    <p className={`${styles.text} text text_type_main-medium mb-6`}>Восстановление пароля</p>
                    <Input                
                        type={'password'}
                        placeholder={'Введите новый пароль'}
                        onChange={e => setPassword(e.target.value)}
                        icon={icon}
                        value={password}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1 mb-6"
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setCode(e.target.value)}
                        value={code}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1 mb-6"
                    />
                    {password && code ? <Link to='/login'>
                        <Button htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                    </Link>
                        :
                        <Button htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                    }
                </form>
                <p className="text text_type_main-small text_color_inactive mt-20">Вспомнили пароль?<NavLink to="/login" className={styles.link}> Войти</NavLink></p>

            </section>
        </main>
    )
}