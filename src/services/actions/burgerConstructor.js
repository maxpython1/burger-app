export const CONSTRUCTOR_SET_BUN = "CONSTRUCTOR_SET_BUN";
export const CONSTRUCTOR_ADD_INGREDIENT = "CONSTRUCTOR_ADD_INGREDIENT";
export const CONSTRUCTOR_REMOVE_INGREDIENT = "CONSTRUCTOR_REMOVE_INGREDIENT";
export const CONSTRUCTOR_MOVE_INGREDIENT = "CONSTRUCTOR_MOVE_INGREDIENT";
export const CONSTRUCTOR_CLEAR = "CONSTRUCTOR_CLEAR";

export const setBun = (bun) => {
  return {
    type: CONSTRUCTOR_SET_BUN,
    payload: bun
  };
};

export const addItem = (item) => {
  return {
    type: CONSTRUCTOR_ADD_INGREDIENT,
    payload: {
      ...item,
      uuid: crypto.randomUUID?.() || String(Date.now() + Math.random())
    }
  };
};

export const moveItem = (fromIndex, toIndex) => {
  return {
    type: CONSTRUCTOR_MOVE_INGREDIENT,
    payload: { fromIndex, toIndex }
  };
};

export const removeItem = (uuid) => {
  return {
    type: CONSTRUCTOR_REMOVE_INGREDIENT,
    payload: uuid
  };
};
