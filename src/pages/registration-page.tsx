import { useState, useRef, FormEvent } from "react"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './registration-styles.module.css'
import { NavLink } from "react-router-dom"
import { registerUser } from "../services/actions/routing"
import { useTypeDispatch } from "../utils/hooks-types"



export default function RegistrationPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const inputRef = useRef<HTMLInputElement>(null!)
    const [icon, setIcon] = useState<"HideIcon" | "ShowIcon">('HideIcon')
    const [inputType, setInputType] = useState<"password" | "text" | undefined>('password');
    
    const dispatch = useTypeDispatch()
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

    const sendData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(registerUser(name, email, password))
        
        
    }
    
    return (
        <main className={styles.main}>

            <section className={styles.inputs}>
                <form onSubmit={sendData}>
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
                        type={inputType}
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
                    <Button htmlType="submit" type="primary" size="medium" >
                        Зарегистрироваться
                    </Button>
                </form>
                <p className="text text_type_main-small text_color_inactive mt-20">Уже зарегистрированны?<NavLink to='/login' className={styles.link}>Войти</NavLink></p>
            </section>
        </main>
    )
}