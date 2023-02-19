import { Button, Card, Space } from 'antd'
import Meta from 'antd/es/card/Meta'
import Search from 'antd/es/input/Search'
import Link from 'antd/es/typography/Link'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchPopularBooks, fetchSearchResults, librarySlice } from '../../store/reducers/library'

import styles from './styles.module.css'

export default function Library () {
  const dispatch = useDispatch()
  const books = useSelector((state) => state.library.books)
  const [pageNumber, setPageNumber] = useState(1)
  const [searchLineValue, setSearchLineValue] = useState()

  // здесь получаем список популярных книг для главной страницы

  useEffect(() => {
    dispatch(fetchPopularBooks(pageNumber))
  }, [])

  // собираем значение из поисковой строки

  function handleChange (evt) {
    setSearchLineValue(evt.target.value)
  }

  // запускаем поиск

  const handleSearchBooks = useCallback(() => {
    dispatch(librarySlice.actions.clearState())
    setPageNumber(1)
    if (searchLineValue === undefined) {
      dispatch(fetchPopularBooks(1))
    } else {
      dispatch(fetchSearchResults({ searchLineValue, pageNumber: 1 }))
    }
  }, [searchLineValue, pageNumber])

  // функции для кнопок - перелистываем страницы

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
    <>
      <Space direction='vertical' className={styles.databox}>
        <Search placeholder="Search books" onSearch={handleSearchBooks} id='searchInput' onChange={handleChange} enterButton />
        <Space className={styles.buttons}>
          <Button type='primary' value='Previous' onClick={handlePrevPage}>Previous</Button>
          <Button type='primary' value='Main' onClick={handleMainPage}>Main</Button>
          <Button type='primary' value='Next' onClick={handleNextPage}>Next</Button>
        </Space>
        <Space className={styles.booksgrid}>
          {books.map((item) => (
            <Link href={`https://www.gutenberg.org/ebooks/${item.id}`} className={styles.link} target="_blank">
              <Card
                hoverable
                className={styles.book}
                cover={<img alt='book' src={item.image} className={styles.book_image} />}>
                <Meta title={item.title} />
              </Card> </Link>),
          )}
        </Space>
      </Space>
    </>
  )
}
