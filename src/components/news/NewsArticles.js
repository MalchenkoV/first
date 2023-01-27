import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchNews, newsSlice } from '../../store/reducers/news'

import styles from './styles.module.css'

export function NewsArticles () {
  const dispatch = useDispatch()

  const news = useSelector((state) => state.articles.articles)
  const latestNews = news.slice(-10, news.length)
  const title = useSelector((state) => state.articles.title)
  const url = useSelector((state) => state.articles.url)
  const lastFetchAt = useSelector((state) => state.articles.lastFetchAt)
  const currentDate = Date.now()

  const timeDif = ((currentDate - lastFetchAt) / 1000) / 60
  const isNeedFetch = timeDif >= 5

  useEffect(() => {
    if (isNeedFetch) {
      dispatch(fetchNews())
    }
  }, [])

  const handleClearAndReFetch = useCallback(() => {
    dispatch(newsSlice.actions.clearState())
    dispatch(fetchNews())
  }, [])

  return (
    <div className={styles.databox}>
      <a href={url} className={styles.title} target="_blank" rel="noopener noreferrer">{title}: Last 10 articles</a>
      <ul>
        {latestNews.map((item) => (
          <li className={styles.url} key={item.url}>
            <a href={item.url} className={styles.url} target="_blank">{item.title}</a>
          </li>
        ))}
      </ul>
      <button onClick={handleClearAndReFetch}>Clear & reFetch</button>
    </div>
  )
}
