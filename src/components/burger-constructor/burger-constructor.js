import React, { useEffect } from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-constructor.module.css';
import { IngredientPropTypes } from '../../utils/types';
import PropType from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { DELITE_ELEMENT } from '../../services/actions/constructors-ingredients';
import { useMemo, useRef } from 'react';
import { addDraggedConstructorElement } from '../../services/actions/constructors-ingredients';
import { moveIngridient } from '../../services/actions/constructors-ingredients';
import { useDrop } from 'react-dnd';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import { dropElement } from '../../services/actions/constructors-ingredients';
import { DROP_CONSTRUCTOR_ELEMENT } from '../../services/actions/constructors-ingredients';



export default function BurgerConstructor({toOpen, toDrop, onDragOverHandler, onDelite }) {
    const dispatch = useDispatch;

    const draggedFilling = useSelector((state) => state.constructorStore.draggedFilling)
    const draggedBuns = useSelector((state) => state.constructorStore.draggedBuns)
    const draggedElement = useSelector((state)=>state.constructorStore.draggedElement)
    const movedElement = useSelector((state)=>state.constructorStore.movedElement)



    const fillingPrice = draggedFilling.map((item) => {
        return item.price
    })

    const bunPrice = draggedBuns.map((item) => {
        return item.price
    })
    const initialValue = 0
    
    let fillingsPrice = fillingPrice.reduce((acc, i) => acc + i, initialValue)

    const totalPriceCounter = useMemo(() => {
        let totalPrice = 0
        if (!bunPrice[0]) {
            totalPrice = fillingsPrice
        }
        else {
            totalPrice = fillingsPrice + bunPrice[0] + bunPrice[0]
        }
        return totalPrice

    }, [draggedFilling])

    // const [, dropTarget] = useDrop({
    //     accept: 'ingridient',
    //     drop: {
    //         dispatch({type: DROP_CONSTRUCTOR_ELEMENT})
    //     }
    // })
    

    




    
    



    
    return (
        <>
            <section >
                <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className={style.section} 
     onDragOver={onDragOverHandler} onDrop = {toDrop}
                    
                >
                    <ul className={style.ul} >
                        {draggedBuns && draggedBuns.map((item) => (
                            <BurgerConstructorElement item={item} typeOfText = {`${item.name} (верх)`} index={0} type={'top'} isLocked={true} className={'mb-4 ml-8'}  key={item.uuid} />
                            
                        ))}

                        <div >
                            {draggedFilling && draggedFilling.map((item, index) => (
                                <BurgerConstructorElement item={item} index={index} isLocked={false} id = {item._id} className={'mb-4 ml-2'}  toClose = {onDelite} typeOfText = {item.name}  key={item.uuid} />
                                
                            ))}
                        </div>


                        {draggedBuns && draggedBuns.map((item) => (
                              <BurgerConstructorElement item={item}  key={item.uuid} typeOfText = {`${item.name} (низ)`} index={0} type={'bottom'} isLocked={true} className={'mb-4 ml-8'} />
                       
                        ))}
                    </ul>
                </section>
                <section className={`${style.total} mt-10`}>
                    <p className="text text_type_digits-medium">{totalPriceCounter}</p>
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