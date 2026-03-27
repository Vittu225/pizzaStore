import { describe, expect, it } from 'vitest';
import { UnknownAction } from '@reduxjs/toolkit';
import filterReducer, {
  setCategoryId,
  setSearchValue,
  setSortType,
} from './filterSlice';

type FilterState = ReturnType<typeof filterReducer>;

function reduce(state: FilterState | undefined, action: UnknownAction): FilterState {
  return filterReducer(state, action);
}

describe('filterSlice', () => {
  it('возвращает initial state при неизвестном экшене', () => {
    const state = reduce(undefined, { type: 'unknown_action' });

    expect(state).toEqual({
      categoryId: 0,
      sortType: { name: 'по цене', sortProperty: 'price' },
      searchValue: '',
    });
  });

  it('setCategoryId: обновляет categoryId', () => {
    const state = reduce(undefined, setCategoryId(3));

    expect(state.categoryId).toBe(3);
    expect(state.sortType).toEqual({ name: 'по цене', sortProperty: 'price' });
    expect(state.searchValue).toBe('');
  });

  it('setSortType: обновляет sortType', () => {
    const state = reduce(
      undefined,
      setSortType({ name: 'по рейтингу', sortProperty: 'rating' }),
    );

    expect(state.sortType).toEqual({ name: 'по рейтингу', sortProperty: 'rating' });
    expect(state.categoryId).toBe(0);
    expect(state.searchValue).toBe('');
  });

  it('setSearchValue: обновляет searchValue', () => {
    const state = reduce(undefined, setSearchValue('pepperoni'));

    expect(state.searchValue).toBe('pepperoni');
    expect(state.categoryId).toBe(0);
    expect(state.sortType).toEqual({ name: 'по цене', sortProperty: 'price' });
  });

  it('последовательные экшены корректно комбинируют изменения', () => {
    const state1 = reduce(undefined, setCategoryId(2));
    const state2 = reduce(
      state1,
      setSortType({ name: 'по рейтингу', sortProperty: 'rating' }),
    );
    const state3 = reduce(state2, setSearchValue('margarita'));

    expect(state3).toEqual({
      categoryId: 2,
      sortType: { name: 'по рейтингу', sortProperty: 'rating' },
      searchValue: 'margarita',
    });
  });
});
