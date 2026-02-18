import { Link } from 'react-router'
import { ArrowLeftIcon } from '../Icons'
import { formatPrice } from '../../utils/formatPrice'

interface CartBottomProps {
  totalCount: number
  totalPrice: number
}

const CartBottom = ({ totalCount, totalPrice }: CartBottomProps) => {
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
        <button className="button pay-btn">
          <span>Оплатить сейчас</span>
        </button>
      </div>
    </div>
  )
}

export default CartBottom

