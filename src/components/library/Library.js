import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchPopularBooks, fetchSearchResults, librarySlice } from '../../store/reducers/library'

import styles from './styles.module.css'

export function Library () {
  const dispatch = useDispatch()
  const books = useSelector((state) => state.library.books)
  const popularBooks = books.slice(0, 8)

  const [pageNumber, setPageNumber] = useState(1)
  const [searchLineValue, setSearchLineValue] = useState()

  useEffect(() => {
    dispatch(fetchPopularBooks(pageNumber))
  }, [])

  function handleChange (evt) {
    setSearchLineValue(evt.target.value)
  }

  const handleSearchBooks = useCallback(() => {
    dispatch(librarySlice.actions.clearState())
    setPageNumber(1)
    if (searchLineValue === undefined) {
      dispatch(fetchPopularBooks(1))
    } else {
      dispatch(fetchSearchResults({ searchLineValue, pageNumber: 1 }))
    }
  }, [searchLineValue, pageNumber])

  const handleNextPage = useCallback(() => {
    if (searchLineValue === undefined) {
      setPageNumber(pageNumber + 1)
      dispatch(fetchPopularBooks(pageNumber + 1))
    } else {
      setPageNumber(pageNumber + 1)
      dispatch(fetchSearchResults({ searchLineValue, pageNumber: pageNumber + 1 }))
    }
  }, [pageNumber, searchLineValue])

  const handlePrevPage = useCallback(() => {
    if (searchLineValue === undefined) {
      setPageNumber(pageNumber - 1)
      dispatch(fetchPopularBooks(pageNumber - 1))
    } else {
      setPageNumber(pageNumber - 1)
      dispatch(fetchSearchResults({ searchLineValue, pageNumber: pageNumber - 1 }))
    }
  }, [pageNumber, searchLineValue])

  const handleMainPage = useCallback(() => {
    setSearchLineValue(undefined)
    document.getElementById('searchInput').value = ''
    dispatch(fetchPopularBooks(1))
  }, [])

  return (
    <div className={styles.databox}>
      <form className={styles.search}>
        <input type='search' id='searchInput' placeholder='Search books' className={styles.search_line} onChange={handleChange}></input>
        <input type='submit' value='Search' className={styles.search_button} onClick={handleSearchBooks}></input>
      </form>
      <div className={styles.buttons}>
        <button className={styles.page_button} value='Previous' onClick={handlePrevPage}>Previous</button>
        <button className={styles.page_button} value='Main' onClick={handleMainPage}>Main</button>
        <button className={styles.page_button} value='Next' onClick={handleNextPage}>Next</button>
      </div>
      <div className={styles.booksgrid}>
        {popularBooks.map((item) => (
          <div key={item.id} className={styles.book}>
            <a href={`https://www.gutenberg.org/ebooks/${item.id}`} className={styles.link} target="_blank">
              <img className={styles.book_image} src={item.image}></img>
              <div>
                <h3 className={styles.book_title}>{item.title}</h3>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
