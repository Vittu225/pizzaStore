import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCategoryId } from '../store/slices/filterSlice'
import { CATEGORIES } from '../constants'

const Categories = () => {
  const dispatch = useAppDispatch()
  const categoryId = useAppSelector((state) => state.filter.categoryId)

  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((item, index) => (
          <li
            key={index}
            onClick={() => dispatch(setCategoryId(index))}
            className={categoryId === index ? 'active' : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories

