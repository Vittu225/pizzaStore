import React, { use, useCallback, useState } from 'react'
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
  const [inputValue, setInputValue] = useState<string>('')
  const searchValue = useAppSelector((state) => state.filter.searchValue)


  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 500),
    [] 
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); 
    updateSearchValue(e.target.value); // 
  };

  return (
    <div className={styles.root}>
      <input
        onChange={onChangeInput}
        type="text"
        placeholder="Поиск пиццы..."
        value={inputValue}
      />

      {searchValue && (
        <img
          onClick={() => dispatch(setSearchValue(''), setInputValue(''))}
          src={clear}
          className={styles.clearIcon}
          alt="Clear"
        />
      )}
    </div>
  )
}

export default Search

