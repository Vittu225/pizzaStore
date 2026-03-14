import React, { useCallback, useState } from 'react'
import styles from './Search.module.scss'
import clear from './clear.svg'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setSearchValue } from '../../store/slices/filterSlice'


function debounce<T extends (...args: never[]) => void>(fn: T, delay: number) {
  let timeoutID: ReturnType<typeof setTimeout>

  return function(this: unknown, ...args: Parameters<T>) {

    clearTimeout(timeoutID)

    timeoutID = setTimeout(() => {
      fn.call(this, ...args)
    }, delay)
  }
}

const Search = () => {
  const dispatch = useAppDispatch()
  const searchValue = useAppSelector((state) => state.filter.searchValue)
  const [inputValue, setInputValue] = useState<string>(searchValue)


  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 500),
    [dispatch],
  )

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  const onClear = () => {
    setInputValue('')
    dispatch(setSearchValue(''))
  }

  return (
    <div className={styles.root}>
      <input
        type="text"
        placeholder="Поиск пиццы..."
        onChange={onChangeInput}
        value={inputValue}
      />

      {searchValue && (
        <button
          type="button"
          onClick={onClear}
          className={styles.clearButton}
          aria-label="Очистить поиск"
        >
          <img src={clear} className={styles.clearIcon} alt="" />
        </button>
      )}
    </div>
  )
}

export default Search

