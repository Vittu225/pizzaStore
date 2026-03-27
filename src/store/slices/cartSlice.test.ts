import { describe, expect, it } from 'vitest';
import { UnknownAction } from '@reduxjs/toolkit';

import cartReducer, {
  addItem,
  clearCart,
  decrementItem,
  incrementItem,
  removeItem,
} from './cartSlice';
import type { Pizza } from '../../types';

type CartState = ReturnType<typeof cartReducer>;

function createPizza(overrides: Partial<Pizza> = {}): Pizza {
  return {
    id: 1,
    title: 'Pepperoni',
    price: 500,
    imgURL: '/pepperoni.png',
    sizes: [26, 30],
    types: [0, 1],
    category: 0,
    rating: 5,
    ...overrides,
  };
}

function reduce(state: CartState | undefined, action: UnknownAction): CartState {
  return cartReducer(state, action);
}

describe('cartSlice', () => {
  it('addItem: добавляет новую позицию и пересчитывает totalCount/totalPrice', () => {
    const pizza = createPizza({ id: 10, price: 700 });

    const state = reduce(undefined, addItem({ pizza, type: 0, size: 26 }));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({
      id: '10_0_26',
      pizzaId: 10,
      title: pizza.title,
      price: 700,
      imgURL: pizza.imgURL,
      type: 0,
      size: 26,
      count: 1,
    });
    expect(state.totalCount).toBe(1);
    expect(state.totalPrice).toBe(700);
  });

  it('addItem: если itemId совпадает — увеличивает count, не создаёт новую строку', () => {
    const pizza = createPizza({ id: 2, price: 100 });

    const state1 = reduce(undefined, addItem({ pizza, type: 1, size: 30 }));
    const state2 = reduce(state1, addItem({ pizza, type: 1, size: 30 }));

    expect(state2.items).toHaveLength(1);
    expect(state2.items[0].id).toBe('2_1_30');
    expect(state2.items[0].count).toBe(2);
    expect(state2.totalCount).toBe(2);
    expect(state2.totalPrice).toBe(200);
  });

  it('addItem: разные type/size создают разные позиции', () => {
    const pizza = createPizza({ id: 3, price: 250 });

    const state1 = reduce(undefined, addItem({ pizza, type: 0, size: 26 }));
    const state2 = reduce(state1, addItem({ pizza, type: 1, size: 26 }));
    const state3 = reduce(state2, addItem({ pizza, type: 1, size: 30 }));

    expect(state3.items.map((i) => i.id).sort()).toEqual(['3_0_26', '3_1_26', '3_1_30'].sort());
    expect(state3.totalCount).toBe(3);
    expect(state3.totalPrice).toBe(750);
  });

  it('incrementItem: увеличивает count и пересчитывает totals', () => {
    const pizza = createPizza({ id: 4, price: 400 });

    const state1 = reduce(undefined, addItem({ pizza, type: 0, size: 26 })); // count = 1
    const state2 = reduce(state1, incrementItem('4_0_26')); // count = 2

    expect(state2.items).toHaveLength(1);
    expect(state2.items[0].count).toBe(2);
    expect(state2.totalCount).toBe(2);
    expect(state2.totalPrice).toBe(800);
  });

  it('decrementItem: при count>1 уменьшает count, при count=1 удаляет позицию', () => {
    const pizza = createPizza({ id: 5, price: 300 });

    const state1 = reduce(undefined, addItem({ pizza, type: 0, size: 26 })); // 1
    const state2 = reduce(state1, addItem({ pizza, type: 0, size: 26 })); // 2
    const state3 = reduce(state2, decrementItem('5_0_26')); // 1

    expect(state3.items).toHaveLength(1);
    expect(state3.items[0].count).toBe(1);
    expect(state3.totalCount).toBe(1);
    expect(state3.totalPrice).toBe(300);

    const state4 = reduce(state3, decrementItem('5_0_26')); // remove
    expect(state4.items).toHaveLength(0);
    expect(state4.totalCount).toBe(0);
    expect(state4.totalPrice).toBe(0);
  });

  it('removeItem: удаляет позицию и пересчитывает totals', () => {
    const pizzaA = createPizza({ id: 6, price: 100 });
    const pizzaB = createPizza({ id: 7, price: 200, title: 'BBQ' });

    const state1 = reduce(undefined, addItem({ pizza: pizzaA, type: 0, size: 26 })); // 100
    const state2 = reduce(state1, addItem({ pizza: pizzaB, type: 1, size: 30 })); // 200

    const state3 = reduce(state2, removeItem('6_0_26'));

    expect(state3.items).toHaveLength(1);
    expect(state3.items[0].id).toBe('7_1_30');
    expect(state3.totalCount).toBe(1);
    expect(state3.totalPrice).toBe(200);
  });

  it('clearCart: очищает items и сбрасывает totals', () => {
    const pizza = createPizza({ id: 8, price: 999 });

    const state1 = reduce(undefined, addItem({ pizza, type: 0, size: 26 }));
    const state2 = reduce(state1, addItem({ pizza, type: 0, size: 26 }));
    const state3 = reduce(state2, clearCart());

    expect(state3.items).toHaveLength(0);
    expect(state3.totalCount).toBe(0);
    expect(state3.totalPrice).toBe(0);
  });

  it('remove/increment/decrement: если id не найден — state не меняется', () => {
    const pizza = createPizza({ id: 12, price: 123 });
    const state1 = reduce(undefined, addItem({ pizza, type: 0, size: 26 }));

    const state2 = reduce(state1, incrementItem('no_such_id'));
    const state3 = reduce(state2, decrementItem('no_such_id'));
    const state4 = reduce(state3, removeItem('no_such_id'));

    expect(state4).toEqual(state1);
  });
});
