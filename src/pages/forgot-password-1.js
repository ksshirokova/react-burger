import React, { useEffect } from "react"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from './registration-styles.module.css'
import { Link, NavLink, useNavigate } from "react-router-dom"
import { sendEmail, VISITED_FORGOT_PASSWORD } from "../services/actions/routing"
import { useDispatch, useSelector } from "react-redux"

export default function ForgotPassword() {

    const dispatch = useDispatch()
    const [value, setValue] = React.useState('')
    const inputRef = React.useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }
    const navigate = useNavigate()
    const emailValue = useSelector((state) => state.routeStore.email)
    const sendError = useSelector((state) => state.routeStore.error)

    const handleClick = (e) => {
        e.preventDefault()
        value && dispatch(sendEmail(value));
        value && navigate('/reset-password')
        }
        useEffect(()=>{
           dispatch({type: VISITED_FORGOT_PASSWORD})
        }, [])
    return (
        <main className={styles.main}>

            <section className={styles.inputs}>
                <form onSubmit={handleClick}>
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
                {/* {value ? <Link to='/reset-password'>
                    <Button htmlType="submit" type="primary" size="medium" >
                        Восстановить
                    </Button>
                </Link> : */}
                    <Button htmlType="submit" type="primary" size="medium" >
                        Восстановить
                    </Button>
                
                </form>
                <p className="text text_type_main-small text_color_inactive mt-20">Вспомнили пароль?<Link to="/login" className={styles.link}> Войти</Link></p>

            </section>
        </main>
    )
}