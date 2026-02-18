import { useAppDispatch } from '../../store/hooks'
import { removeItem, incrementItem, decrementItem } from '../../store/slices/cartSlice'
import { CartItem as CartItemType } from '../../types'
import { MinusIcon, PlusIcon, RemoveIcon } from '../Icons'
import { TYPE_NAMES } from '../../constants'
import { formatPrice } from '../../utils/formatPrice'
import { FC } from 'react'

interface CartItemProps {
  item: CartItemType
}

const CartItem: FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch()

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={item.imgURL} alt={item.title} />
      </div>
      <div className="cart__item-info">
        <h3>{item.title}</h3>
        <p>
          {TYPE_NAMES[item.type]} тесто, {item.size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          className="button button--outline button--circle cart__item-count-minus"
          onClick={() => dispatch(decrementItem(item.id))}
          aria-label="Уменьшить количество"
        >
          <MinusIcon />
        </button>
        <b>{item.count}</b>
        <button
          className="button button--outline button--circle cart__item-count-plus"
          onClick={() => dispatch(incrementItem(item.id))}
          aria-label="Увеличить количество"
        >
          <PlusIcon />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{formatPrice(item.price * item.count)}</b>
      </div>
      <div className="cart__item-remove">
        <button
          className="button button--outline button--circle"
          onClick={() => dispatch(removeItem(item.id))}
          aria-label="Удалить из корзины"
        >
          <RemoveIcon />
        </button>
      </div>
    </div>
  )
}

export default CartItem

