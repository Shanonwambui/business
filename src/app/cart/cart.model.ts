import { Item } from "../items/item.model";
import { Type } from "../type/type.model";

export interface CartItem {
    itemId: Item;
    selectedType: Type;
    quantity: number;
    total: number;
  }
  