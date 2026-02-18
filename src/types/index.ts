export interface Pizza {
  id: number;
  title: string;
  price: number;
  imgURL: string;
  sizes: number[];
  types: number[];
  category: number;
  rating?: number;
}

export interface CartItem {
  id: string;
  pizzaId: number;
  title: string;
  price: number;
  imgURL: string;
  type: number;
  size: number;
  count: number;
}

export interface SortType {
  name: string;
  sortProperty: 'price' | 'rating';
}

export interface FilterState {
  categoryId: number;
  sortType: SortType;
  searchValue: string;
}

