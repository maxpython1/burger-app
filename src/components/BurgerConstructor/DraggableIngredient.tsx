import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import icon from "../../images/vector.svg";
import { TConstructorIngredient } from "../../utils/types";
import styles from "./BurgerConstructor.module.css";

type DraggableIngredientProps = {
  elem: TConstructorIngredient;
  index: number;
  move: (from: number, to: number) => void;
  onRemove: (uuid: string) => void;
};

export default function DraggableIngredient({
  elem,
  index,
  move,
  onRemove
}: DraggableIngredientProps) {
  const ingredientRef = useRef<HTMLLIElement | null>(null);

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
        const dragIndex = (item as { index: number }).index;
        const hoverIndex = index;

        const diff = monitor.getDifferenceFromInitialOffset();

        if (!diff) {
          return;
        }

        const goingDown = diff.y > 1 && dragIndex < hoverIndex;
        const goingUp = diff.y < -1 && dragIndex > hoverIndex;
        if (!goingDown && !goingUp) {
          return;
        }

        move(dragIndex, hoverIndex);
        (item as { index: number }).index = hoverIndex;
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
