import React from 'react';

import  doneIcon  from '../../images/graphics.svg'

export default function OrderDetails() {
    return (
        <section style={{textAlign: 'center'}}>
            <p className="text text_type_digits-large mt-9 mb-8">034536</p>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <img src={doneIcon} />
            <p className="text text_type_main-small mt-15 mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive mb-15">Дождитесь готовности на орбитальной станции</p>
        </section>

    )
}