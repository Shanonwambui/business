import { Type } from "../type/type.model";
export interface Item {
    id: string;
    name: string;
    price: number;
    category: string;
    hasType: boolean;
    hasAccompaniment: boolean;
    isAccompaniment: boolean;
    selectedType?: string; // optional property to store the selected type
    type?: Type; // Add this line to define the type property as optional
    selected: boolean;
    
    
    // ... other properties and methods
  }