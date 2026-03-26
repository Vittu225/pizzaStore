import { Link, useNavigate } from 'react-router'
import { ArrowLeftIcon } from '../Icons'
import { formatPrice } from '../../utils/formatPrice'
import { FC } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { clearCart } from '../../store/slices/cartSlice'

interface CartBottomProps {
  totalCount: number
  totalPrice: number
}

const CartBottom: FC<CartBottomProps> = ({ totalCount, totalPrice }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onClickOrder = () => {
    if(window.confirm('Оплатить заказ?')) {
      dispatch(clearCart())
      navigate('/success')
    }
  }

  return (
    <div className="cart__bottom">
      <div className="cart__bottom-details">
        <span>
          Всего пицц: <b>{totalCount} шт.</b>
        </span>
        <span>
          Сумма заказа: <b>{formatPrice(totalPrice)}</b>
        </span>
      </div>
      <div className="cart__bottom-buttons">
        <Link to="/" className="button button--outline button--add go-back-btn">
          <ArrowLeftIcon />
          <span>Вернуться назад</span>
        </Link>
        <button className="button pay-btn" onClick={onClickOrder}>
          <span>Оплатить сейчас</span>
        </button>
      </div>
    </div>
  )
}

export default CartBottom

