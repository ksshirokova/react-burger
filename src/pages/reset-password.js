import React, { useEffect } from "react"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from './registration-styles.module.css'
import { NavLink, Link, Navigate, useNavigate, useLocation } from "react-router-dom"
import { sendNewPassword } from "../services/actions/routing"
import { useDispatch, useSelector } from "react-redux"

export default function ResetPassword() {
    const dispatch = useDispatch()
    const [password, setPassword] = React.useState('')
    const [code, setCode] = React.useState('')
    const [icon, setIcon] = React.useState('HideIcon')
    const inputRef = React.useRef(null)
    const passInput = document.getElementById("resetPass");
    const location = useLocation()
    const emailSent = useSelector(state => state.routeStore.emailSent)
    const navigate = useNavigate()
    const lastPageIsVisited = useSelector(state=>state.routeStore.forgotPassVisited)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        if (passInput.type === 'password') {
            passInput.type = 'text'
            setIcon('ShowIcon')
        }
        else {
            passInput.type = 'password'
            setIcon('HideIcon')

        }

    }
    useEffect(() => {
        !lastPageIsVisited && navigate('/forgot-password')
        
           
    }, [])
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(sendNewPassword(password, code))
    }

    return (
        <main className={styles.main}>

            <section className={styles.inputs}>
                <form onSubmit={handleClick}>
                    <p className={`${styles.text} text text_type_main-medium mb-6`}>Восстановление пароля</p>
                    <Input
                        id={'resetPass'}
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