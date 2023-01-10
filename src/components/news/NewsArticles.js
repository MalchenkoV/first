import { async } from 'q'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import { getNews } from '../../api'

import styles from './styles.module.css'

export function NewsArticles () {
  const savedNews = localStorage.getItem('result')
  const newsValue = JSON.parse(savedNews)

  const [newsParam, setNewsParam] = useState({})
  const [news, setNews] = useState(newsValue.slice(0, 5))

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
      localStorage.setItem('result', JSON.stringify(result))
    }

    fetchNews()
  }, [])

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
      <button onClick={() => setNews(newsValue)}>load more</button>
    </div>
  )
}
