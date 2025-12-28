export type TIngredient = {
  _id: string;
  name: string;
  type: "bun" | "main" | "sauce";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TConstructorIngredient = TIngredient & {
  uuid: string;
};

export type TUser = {
  name: string;
  email: string;
};

export type TOrderStatus = "created" | "pending" | "done";

export type TOrder = {
  _id: string;
  name: string;
  ingredients: string[];
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TOrderMessage = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};
