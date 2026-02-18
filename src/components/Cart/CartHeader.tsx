import { useAppDispatch } from '../../store/hooks'
import { clearCart } from '../../store/slices/cartSlice'
import { CartIcon, TrashIcon } from '../Icons'

const CartHeader = () => {
  const dispatch = useAppDispatch()

  return (
    <div className="cart__top">
      <h2 className="content__title">
        <CartIcon />
        Корзина
      </h2>
      <button className="cart__clear" onClick={() => dispatch(clearCart())}>
        <TrashIcon />
        <span>Очистить корзину</span>
      </button>
    </div>
  )
}

export default CartHeader

