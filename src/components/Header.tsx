import LogoSvg from '../assets/img/pizza-logo.svg'
import { Link } from 'react-router'
import Search from './Search/Search'
import { useAppSelector } from '../store/hooks'
import { CartIcon } from './Icons'
import { formatPrice } from '../utils/formatPrice'

const Header = () => {
  const { totalPrice, totalCount } = useAppSelector((state) => state.cart)

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={LogoSvg} alt="Pizza logo" />
            <div>
              <h1>Vittu Pizza</h1>
              <p>самая вкусная пицца в мире</p>
            </div>
          </div>
        </Link>
        <Search />
        <Link to="/cart" className="header__cart">
          <div className="button button--cart">
            <span>{formatPrice(totalPrice)}</span>
            <div className="button__delimiter"></div>
            <CartIcon />
            <span>{totalCount}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
