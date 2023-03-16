import React from "react"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from './registration-styles.module.css'
import { Link, NavLink } from "react-router-dom"
import { sendEmail } from "../services/actions/routing"
import { useDispatch, useSelector } from "react-redux"

export default function ForgotPassword() {

    const dispatch = useDispatch()
    const [value, setValue] = React.useState('')
    const inputRef = React.useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }
    const emailValue = useSelector((state) => state.routeStore.email)
    const sendError = useSelector((state) => state.routeStore.error)

    const handleClick = () => {
        dispatch(sendEmail(value));
        <Link to='/reset-password' />

    }
    return (
        <main className={styles.main}>

            <section className={styles.inputs}>
                <p className={`${styles.text} text text_type_main-medium mb-6`}>Вход</p>
                <Input
                   
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => setValue(e.target.value)}

                    value={value}
                    name={'name'}
                    error={false}
                    ref={inputRef}

                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                />
                {!sendError ? <Link to='/reset-password'>
                    <Button htmlType="button" type="primary" size="medium" onClick={handleClick}>
                        Восстановить
                    </Button>
                </Link> :
                    <Button htmlType="button" type="primary" size="medium" onClick={handleClick}>
                        Восстановить
                    </Button>
                }
                <p className="text text_type_main-small text_color_inactive mt-20">Вспомнили пароль?<Link to="/login" className={styles.link}> Войти</Link></p>

            </section>
        </main>
    )
}