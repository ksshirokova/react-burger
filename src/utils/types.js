import PropType from 'prop-types';

export const IngredientPropTypes = PropType.shape({
    _id: PropType.string.isRequired,
    calories: PropType.number.isRequired,
    carbohydrates: PropType.number.isRequired,
    fat: PropType.number.isRequired,
    image: PropType.string.isRequired,
    image_large: PropType.string.isRequired,
    image_mobile: PropType.string.isRequired,
    name: PropType.string.isRequired,
    price: PropType.number.isRequired,
    proteins: PropType.number.isRequired,
    type: PropType.string.isRequired
    
    
    
   
   

    

})