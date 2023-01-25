import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchPopularBooks, fetchSearchResults, librarySlice } from '../../store/reducers/library'

import styles from './styles.module.css'

export function Library () {
  const dispatch = useDispatch()
  const books = useSelector((state) => state.library.books)

  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    dispatch(fetchPopularBooks(pageNumber))
  }, [])

  function getValue () {
    return document.getElementById('searchLine').value
  }

  const handleSearchBooks = useCallback(() => {
    dispatch(librarySlice.actions.clearState())
    dispatch(fetchSearchResults(getValue()))
  }, [])

  const handleNextPage = useCallback(() => {
    setPageNumber(pageNumber + 1)
    dispatch(fetchPopularBooks(pageNumber + 1))
  }, [pageNumber])

  const handlePrevPage = useCallback(() => {
    setPageNumber(pageNumber - 1)
    dispatch(fetchPopularBooks(pageNumber - 1))
  }, [pageNumber])

  return (
    <div className={styles.databox}>
      <form className={styles.search}>
        <input type='search' placeholder='Search books' className={styles.search_line} id='searchLine'></input>
        <input type='submit' value='Search' className={styles.search_button} onClick={handleSearchBooks}></input>
      </form>
      <div className={styles.buttons}>
        <button className={styles.page_button} value='Previous' onClick={handlePrevPage}>Previous</button>
        <button className={styles.page_button} value='Next' onClick={handleNextPage}>Next</button>
      </div>
      <div className={styles.booksgrid}>
        {books.map((item) => (
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
