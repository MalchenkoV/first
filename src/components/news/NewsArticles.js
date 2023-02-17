import { LinkOutlined } from '@ant-design/icons'
import { Button, List } from 'antd'
import Link from 'antd/es/typography/Link'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchNews, newsSlice } from '../../store/reducers/news'

import styles from './styles.module.css'

export default function NewsArticles () {
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
    <>
      <div className={styles.databox}>
        <Link strong href={url} className={styles.title} target="_blank" rel="noopener noreferrer">{title}: Last 10 articles</Link>
        <List
          dataSource={latestNews}
          itemLayout='horizontal'
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<LinkOutlined />}
                description={<Link type='secondary' href={item.url} className={styles.url} target="_blank">{item.title}</Link>}
              />
            </List.Item>
          )}
        >
        </List>
        <Button type='primary' onClick={handleClearAndReFetch}>Clear & reFetch</Button>
      </div>
    </>
  )
}

// добавить к статьям иконки в качестве аватаров
