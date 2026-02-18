import { useAppSelector } from '../store/hooks'
import CartEmpty from '../components/Cart/CartEmpty'
import CartHeader from '../components/Cart/CartHeader'
import CartItem from '../components/Cart/CartItem'
import CartBottom from '../components/Cart/CartBottom'

const Cart = () => {
  const { items, totalPrice, totalCount } = useAppSelector((state) => state.cart)

  if (items.length === 0) {
    return <CartEmpty />
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <CartHeader />
        <div className="content__items">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <CartBottom totalCount={totalCount} totalPrice={totalPrice} />
      </div>
    </div>
  )
}

export default Cart
