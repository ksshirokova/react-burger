import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { CHECK_DROPED_ELEMENT, DROP_MOVED_ELEMENT } from "../../services/constants";
import { FC, useRef } from "react";
import { useDrag } from "react-dnd";
import { TConstructorProps, TItem } from "../../utils/types";
import { useDispatch } from "../../utils";

export const BurgerConstructorElement: FC<TConstructorProps> = ({
  id,
  item,
  index,
  type,
  isLocked,
  toClose,
  typeOfText,
  className,
}) => {
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
    hover(item: TItem) {
      const { _id: draggedId, index: itemIndex } = item;
      // item = { id, index }

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

  return !isDrag ? (
    <li
      className={className}
      ref={item.type !== "bun" ? ref : null}
      style={{ opacity }}
    >
      {item.type !== "bun" && <DragIcon type="primary" />}

      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={`${typeOfText}`}
        price={item.price}
        thumbnail={`${item.image}`}
        handleClose={() => toClose(index)}
      />
    </li>
  ) : (
    <div></div>
  );
};
