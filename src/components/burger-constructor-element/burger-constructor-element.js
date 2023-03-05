import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { CHECK_DROPED_ELEMENT } from "../../services/actions/constructors-ingredients";
import { useRef } from "react";
import { useDrag } from "react-dnd";
import { DROP_MOVED_ELEMENT } from "../../services/actions/constructors-ingredients";
import PropTypes from "prop-types";

export default function BurgerConstructorElement({
  id,
  item,
  index,
  type,
  isLocked,
  toClose,
  typeOfText,
  className,
  toDrag,
}) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ isDrag }, drag] = useDrag({
    type: "element",
    item: { id, index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "element",
    hover: (item) => {
      const { id: draggedId, index: itemIndex } = item;
      const fromIndex = index;
      const toIndex = itemIndex;

      if (draggedId !== id) {
        dispatch({ type: DROP_MOVED_ELEMENT, payload: { fromIndex, toIndex } });
        dispatch({ type: CHECK_DROPED_ELEMENT });
      }
      if (fromIndex === toIndex) {
        return;
      }
    },
  });

  const opacity = isDrag ? 0 : 1;
  drag(drop(ref));

  return (
    !isDrag && (
      <li
        className={className}
        ref={item.type !== "bun" ? ref : null}
        style={{ opacity }}
        onDrag={toDrag}
      >
        {item.type !== "bun" && <DragIcon type="primary" />}

        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={typeOfText}
          price={item.price}
          thumbnail={item.image}
          handleClose={() => toClose(index)}
        />
      </li>
    )
  );
}

BurgerConstructorElement.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  id: PropTypes.string,
  isLocked: PropTypes.bool,
  typeOfText: PropTypes.string,
  className: PropTypes.string,
  toClose: PropTypes.func,
  toDrag: PropTypes.func,
  type: PropTypes.string,
};
