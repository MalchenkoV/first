import React, { useEffect, useState } from 'react'

import { getNews } from '../../api'

import styles from './styles.module.css'

export function NewsArticles () {
  const [newsParam, setNewsParam] = useState({})
  const [news, setNews] = useState([])

  useEffect(() => {
    async function fetchNews () {
      const { data } = await getNews()

      setNewsParam({
        title: data.response.edition.webTitle,
        url: data.response.edition.webUrl,
      })

      const result = []
      for (const key in data.response.results) {
        result.push({
          title: data.response.results[key].webTitle,
          url: data.response.results[key].webUrl,
        })
      }
      setNews(result)
    }

    fetchNews()
  }, [])

  return (
    <div className='data-box'>
      <a href={newsParam.url} className={styles.title} target="_blank" rel="noopener noreferrer">{newsParam.title}: Last 5 articles</a>
      <ul>
        {news.map((item) => (
          <li className={styles.url} key={item.url}>
            <a href={item.url} className={styles.url} target="_blank">{item.title}</a>
          </li>
        ))}
      </ul>
      <button>load more</button>
    </div>
  )
}
