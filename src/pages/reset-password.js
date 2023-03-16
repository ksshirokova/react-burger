import React from "react"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from './registration-styles.module.css'
import { NavLink } from "react-router-dom"
import { sendNewPassword } from "../services/actions/routing"
import { useDispatch } from "react-redux"

export default function ResetPassword() {
    const dispatch = useDispatch()
    const [password, setPassword] = React.useState('')
    const [code, setCode] =  React.useState('')
    const [icon, setIcon]= React.useState('HideIcon')
    const inputRef = React.useRef(null)
    const passInput = document.getElementById("resetPass");

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
    
    const handleClick=()=>{
        dispatch(sendNewPassword(password, code))
    }

    return (
        <main className={styles.main}>

            <section className={styles.inputs}>
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

                <Button htmlType="button" type="primary" size="medium" onClick={handleClick}>
                    Сохранить
                </Button>
                <p className="text text_type_main-small text_color_inactive mt-20">Вспомнили пароль?<NavLink to="/login" className={styles.link}> Войти</NavLink></p>

            </section>
        </main>
    )
}