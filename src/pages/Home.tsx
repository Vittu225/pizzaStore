import { useEffect } from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchPizzas } from '../store/slices/pizzasSlice'

const Home = () => {
  const dispatch = useAppDispatch()
  const { items, isLoading } = useAppSelector((state) => state.pizzas)
  const { categoryId, sortType, searchValue } = useAppSelector((state) => state.filter)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchPizzas())
  }, [dispatch, categoryId, sortType, searchValue])

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => (
              <PizzaBlock
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                imgUrl={item.imgURL}
                sizes={item.sizes}
                types={item.types}
              />
            ))}
      </div>
    </div>
  )
}

export default Home

