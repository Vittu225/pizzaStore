import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addItem } from '../../store/slices/cartSlice'
import { Pizza } from '../../types'
import { AddIcon } from '../Icons'
import { TYPE_NAMES } from '../../constants'
import { formatPrice } from '../../utils/formatPrice'

interface PizzaBlockProps {
  id: number
  title: string
  price: number
  imgUrl: string
  sizes: number[]
  types: number[]
}

const PizzaBlock: FC<PizzaBlockProps> = ({ id, title, price, imgUrl, sizes, types }) => {
  const dispatch = useAppDispatch()
  const [activeType, setActiveType] = useState<number>(0)
  const [activeSize, setActiveSize] = useState<number>(0)

  const pizza: Pizza = {
    id,
    title,
    price,
    imgURL: imgUrl,
    sizes,
    types,
    category: 0,
  }

  const cartItems = useAppSelector((state) => state.cart.items)
  const currentItemId = `${id}_${activeType}_${sizes[activeSize]}`
  const cartItem = cartItems.find((item) => item.id === currentItemId)
  const cartItemCount = cartItem ? cartItem.count : 0

  const onClickAdd = () => {
    dispatch(addItem({ pizza, type: activeType, size: sizes[activeSize] }))
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imgUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
                {types.map((item, index) => (
              <li
                key={index}
                className={activeType === index ? 'active' : ''}
                onClick={() => setActiveType(index)}
              >
                {TYPE_NAMES[item]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((item, index) => (
              <li
                key={index}
                className={activeSize === index ? 'active' : ''}
                onClick={() => setActiveSize(index)}
              >
                {item} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {formatPrice(price)}</div>
          <button className="button button--outline button--add" onClick={onClickAdd}>
            <AddIcon />
            <span>Добавить</span>
            {cartItemCount > 0 && <i>{cartItemCount}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock

