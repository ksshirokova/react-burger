import React from "react"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './registration-styles.module.css'
import { Navigate, NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../services/actions/routing"

export default function RegistrationPage() {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [icon, setIcon] = React.useState('HideIcon')
    const inputRef = React.useRef(null)
    const passInput = document.getElementById("passwordInput");
    const isRegistred = useSelector(state=>state.routeStore.isRegistred)
    console.log(isRegistred)
    const navigate = useNavigate()
    const dispatch = useDispatch()
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

    const sendData = () => {
       
            dispatch(registerUser(name, email, password))
       
        setTimeout(()=>{
            isRegistred ? navigate('/login', {replace: true}) : navigate('/register')
        },1000)
        
       
    }

    return (
        <main className={styles.main}>

            <section className={styles.inputs}>
                <p className={`${styles.text} text text_type_main-medium mb-6`}>Регистрация</p>
                <Input

                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}

                    value={name}
                    name={'name'}
                    error={false}
                    ref={inputRef}

                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                />
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => setEmail(e.target.value)}

                    value={email}
                    name={'name'}
                    error={false}
                    ref={inputRef}

                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                />
                <Input
                    id="passwordInput"
                    type={'password'}
                    placeholder={'Пароль'}
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
                <Button htmlType="button" type="primary" size="medium" onClick={sendData}>
                    Зарегистрироваться
                </Button>
                <p className="text text_type_main-small text_color_inactive mt-20">Уже зарегистрированны?<NavLink to='/login' className={styles.link}> Войти</NavLink></p>
            </section>
        </main>
    )
}