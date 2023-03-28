import styles from './404-error.module.css'

export default function Error404(){
    return(
        <section className={styles.section}>
        <h2 className='text text_type_main-large mt-20 mb-10'>ОШИБКА 404</h2>
        <p className='text text_type_main-medium'>СТРАНИЦА НЕ НАЙДЕНА</p>
        </section>
    )
}