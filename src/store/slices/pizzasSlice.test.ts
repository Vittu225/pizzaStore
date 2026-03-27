import { describe, expect, it, vi, beforeEach } from 'vitest';
import { UnknownAction } from '@reduxjs/toolkit';
import axios from 'axios';

import pizzasReducer, { fetchPizzas } from './pizzasSlice';
import type { Pizza } from '../../types';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

type PizzasState = ReturnType<typeof pizzasReducer>;

const mockedAxiosGet = vi.mocked(axios.get);

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

function reduce(state: PizzasState | undefined, action: UnknownAction): PizzasState {
  return pizzasReducer(state, action);
}

describe('pizzasSlice reducer', () => {
  it('возвращает initial state при неизвестном экшене', () => {
    const state = reduce(undefined, { type: 'unknown_action' });

    expect(state).toEqual({
      items: [],
      isLoading: false,
      error: null,
    });
  });

  it('fetchPizzas.pending: включает загрузку и очищает ошибку', () => {
    const prevState: PizzasState = {
      items: [createPizza()],
      isLoading: false,
      error: 'old error',
    };

    const nextState = reduce(prevState, fetchPizzas.pending('', undefined));

    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
    expect(nextState.items).toEqual(prevState.items);
  });

  it('fetchPizzas.fulfilled: сохраняет items и выключает загрузку', () => {
    const prevState: PizzasState = {
      items: [],
      isLoading: true,
      error: null,
    };
    const payload = [createPizza({ id: 2 }), createPizza({ id: 3, title: 'BBQ' })];

    const nextState = reduce(prevState, fetchPizzas.fulfilled(payload, '', undefined));

    expect(nextState.isLoading).toBe(false);
    expect(nextState.items).toEqual(payload);
    expect(nextState.error).toBeNull();
  });

  it('fetchPizzas.rejected: выключает загрузку и пишет сообщение ошибки', () => {
    const prevState: PizzasState = {
      items: [],
      isLoading: true,
      error: null,
    };

    const nextState = reduce(
      prevState,
      fetchPizzas.rejected(new Error('Network Error'), '', undefined),
    );

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe('Network Error');
  });
});

describe('fetchPizzas thunk', () => {
  beforeEach(() => {
    mockedAxiosGet.mockReset();
  });

  it('строит params из filter state (category/search/sort) и возвращает payload', async () => {
    const pizzas = [createPizza({ id: 10, title: 'Margarita' })];
    mockedAxiosGet.mockResolvedValueOnce({ data: pizzas });

    const dispatch = vi.fn();
    const getState = () =>
      ({
        filter: {
          categoryId: 2,
          sortType: { name: 'по рейтингу', sortProperty: 'rating' },
          searchValue: 'pep',
        },
      }) as never;

    const resultAction = await fetchPizzas()(dispatch, getState, undefined);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      'https://xdohmfsrkglvtqpislgx.supabase.co/rest/v1/pizzas',
      expect.objectContaining({
        params: {
          select: '*',
          category: 'eq.2',
          title: 'ilike.*pep*',
          order: 'rating.desc',
        },
      }),
    );
    expect(resultAction.type).toBe(fetchPizzas.fulfilled.type);
    expect(resultAction.payload).toEqual(pizzas);
  });

  it('при categoryId=0 и пустом searchValue не добавляет category/title в params', async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: [] });

    const dispatch = vi.fn();
    const getState = () =>
      ({
        filter: {
          categoryId: 0,
          sortType: { name: 'по цене', sortProperty: 'price' },
          searchValue: '',
        },
      }) as never;

    await fetchPizzas()(dispatch, getState, undefined);

    const callArgs = mockedAxiosGet.mock.calls[0]?.[1] as
      | { params?: Record<string, string> }
      | undefined;
    expect(callArgs?.params).toBeDefined();
    expect(callArgs?.params).toEqual({
      select: '*',
      order: 'price.asc',
    });
  });
});
