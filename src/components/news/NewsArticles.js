import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getNews } from '../../api'
import { addNewsFunc } from '../../store/toolkit'

import styles from './styles.module.css'

export function NewsArticles () {
  const [newsParam, setNewsParam] = useState({})
  const [news, setNews] = useState([])
  const dispatch = useDispatch()
  const articles = useSelector((state) => state.articles.articles[0])

  useLayoutEffect(() => {
    setNews(articles.slice(0, 5) || [])
  }, [])

  useEffect(() => {
    async function fetchTitle () {
      const { data } = await getNews()

      const title = data.response.edition
      setNewsParam({
        title: title.webTitle,
        url: title.webUrl,
      })
    }
    fetchTitle()
  }, [])

  useEffect(() => {
    async function fetchNews () {
      const { data } = await getNews()

      const result = []
      for (const key in data.response.results) {
        result.push({
          title: data.response.results[key].webTitle,
          url: data.response.results[key].webUrl,
        })
      }
      setNews(result.slice(0, 5))
      dispatch(addNewsFunc(result))
    }

    fetchNews()
  }, [])

  const newsButton = useCallback(
    () => {
      setNews(articles)
    }, [],
  )

  return (
    <div className={styles.databox}>
      <a href={newsParam.url} className={styles.title} target="_blank" rel="noopener noreferrer">{newsParam.title}: Last 5 articles</a>
      <ul>
        {news.map((item) => (
          <li className={styles.url} key={item.url}>
            <a href={item.url} className={styles.url} target="_blank">{item.title}</a>
          </li>
        ))}
      </ul>
      <button onClick={newsButton}>load more</button>
    </div>
  )
}
