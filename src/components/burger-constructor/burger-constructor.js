import React from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorStyle from './burger-constructor.module.css';
import { IngredientPropTypes } from '../../utils/types';
import PropType from 'prop-types'


export default function BurgerConstructor({ ingredients, toOpen, buns, main, sauce}) {
    return (
        <>
            <section >
                <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className={ConstructorStyle.section}>
                    <ul className={ConstructorStyle.ul}>
                        {buns && buns.map((item) => (<li key={item._id} className='mb-4 ml-8'>

                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${item.name} (верх)`}
                                price={item.price}
                                thumbnail={item.image}
                            />

                        </li>))}
                        {main && main.map((item) => (<li key={item._id} className='mb-4 ml-2'>


                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={`${item.name} (верх)`}
                                price={item.price}
                                thumbnail={item.image}
                            />

                        </li>))}

                        {sauce && sauce.map((item) => (<li key={item._id} className='mb-4 ml-2'>


                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={`${item.name} (верх)`}
                                price={item.price}
                                thumbnail={item.image}
                            />

                        </li>))}
                        {buns && buns.map((item) => (<li key={item._id} className='mb-4 ml-8'>

                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${item.name} (низ)`}
                                price={item.price}
                                thumbnail={item.image}
                            />

                        </li>))}
                    </ul>
                </section>
                <section className={`${ConstructorStyle.total} mt-10`}>
                    <p className="text text_type_digits-medium">610</p>
                    <div className={ConstructorStyle.icon}>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="large" onClick={toOpen}>
                        Оформить заказ
                    </Button>
                </section>







            </section>

        </>
    )
}

BurgerConstructor.propType = {
    ingredients: PropType.arrayOf(IngredientPropTypes).isRequired
} 