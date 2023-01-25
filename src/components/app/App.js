import React from 'react'

import { Forecast } from '../forecast/Forecast'
import { Holidays } from '../holidays/Holidays'
import { NewsArticles } from '../news/NewsArticles'
import { Library } from '../library/Library'

import styles from './styles.module.css'

export default function App () {
  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <h1>Info</h1>
        <nav className={styles.menu}>
          <ul className={styles.linkUl}>
            <li><a href='#weather' className={styles.link}>Weather</a></li>
            <li><a href='#holiday' className={styles.link}>Holiday</a></li>
            <li><a href='#news' className={styles.link}>News</a></li>
            <li><a href='#library' className={styles.link}>Library</a></li>
          </ul>
        </nav>
        <div className={styles.add_info}>
          <p>Здесь будут интересные вещи</p>
        </div>
      </header>
      <main className={styles.App_main}>
        <section className={styles.weather} id='weather'>
          <Forecast />
        </section>
        <section className={styles.holiday} id='holiday'>
          <Holidays />
        </section>
        <section className={styles.news} id='news'>
          <NewsArticles />
        </section>
        <section className={styles.library} id='library'>
          <Library />
        </section>
      </main>
      <footer className={styles.App_footer}>@Created by MalchenkoV</footer>
    </div>
  )
}

