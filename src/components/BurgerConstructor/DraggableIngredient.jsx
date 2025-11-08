import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import icon from "../../images/vector.svg";
import styles from "./BurgerConstructor.module.css";
import { useRef } from "react";

export default function DraggableIngredient({ elem, index, move, onRemove }) {
  const ingredientRef = useRef(null);

  const [{ isDrag }, dragIngredientRef] = useDrag({
    type: "constructor",
    item: { uuid: elem.uuid, index },
    collect: (monitor) => ({ isDrag: monitor.isDragging() })
  });

  const [, dropIngredientRef] = useDrop(
    {
      accept: "constructor",
      hover(item, monitor) {
        if (!monitor.isOver({ shallow: true })) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        const diff = monitor.getDifferenceFromInitialOffset();

        const goingDown = diff.y > 1 && dragIndex < hoverIndex;
        const goingUp = diff.y < -1 && dragIndex > hoverIndex;
        if (!goingDown && !goingUp) {
          return;
        }

        move(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
    []
  );

  dragIngredientRef(dropIngredientRef(ingredientRef));

  return (
    <li
      className={styles.cardIngredient}
      style={{ opacity: isDrag ? 0.2 : 1 }}
      ref={ingredientRef}
    >
      <img src={icon} alt="Иконка перетаскивания" />
      <ConstructorElement
        text={elem.name}
        thumbnail={elem.image}
        price={elem.price}
        handleClose={() => onRemove(elem.uuid)}
      />
    </li>
  );
}
