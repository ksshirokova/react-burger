import React from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-constructor.module.css';
import { IngredientPropTypes } from '../../utils/types';
import PropType from 'prop-types';
import { useSelector } from 'react-redux';
import { DELITE_ELEMENT } from '../../services/actions/constructors-ingredients';


export default function BurgerConstructor({ toOpen, toDrop, onDragOverHandler, dragHandler }) {
    
    const draggedElements = useSelector((state) => state.constructor.draggedElements)
    const ingredient = useSelector((state)=>state.ingredients.data.data)
    // const handleClose = ()=>{
    //     dispatch({type: DELITE_ELEMENT, payload: index})
    // }
    // const buns = draggedElements.filter(el => el.type === 'bun')
    // const mains = draggedElements.filter(el => el.type === 'main')
    // const sauces = ingredient.filter(el => el.type === 'sauce')


    console.log(draggedElements)
    // const data = useSelector((state)=> state.ingredients.data)


    return (
        <>
            <section >
                <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className={style.section} onDragOver={onDragOverHandler} onDrop={toDrop}  >
                    <ul className={style.ul}>
                        {draggedElements && draggedElements.map((item, index) => (

                            <li key={item._id} className='mb-4 ml-8'>
                                <ConstructorElement
                                    type="top"
                                    isLocked={true}
                                    text={`${item.name} (верх)`}
                                    dropTargetIndex={index}
                                    index={index}
                                    key = {item.uuid}
                                    price={item.price}
                                    thumbnail={item.image}
                                    // ingredients = {ingredient}
                                    // onDelite = {callback}
                                />


                            </li>))}
                        {/* {mains && mains.map((item) => (<li key={item._id} className='mb-4 ml-2' > 

                            
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={`${item.name} (верх)`}
                                price={item.price}
                                thumbnail={item.image}
                            />

                        </li>))}

                        {sauces && sauces.map((item) => (<li key={item._id} className='mb-4 ml-2'  >


                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={`${item.name} (верх)`}
                                price={item.price}
                                thumbnail={item.image}
                            />

                        </li>))} */}
                        {/* {buns && buns.map((item) => (<li key={item._id} className='mb-4 ml-8'  draggable onDrag={(e) => dragHandler(e, item)}>

                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${item.name} (низ)`}
                                price={item.price}
                                thumbnail={item.image}
                            />

                        </li>))} */}
                    </ul>
                </section>
                <section className={`${style.total} mt-10`}>
                    <p className="text text_type_digits-medium">610</p>
                    <div className={style.icon}>
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