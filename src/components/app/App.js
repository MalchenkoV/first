import React from 'react'

import { Forecast } from '../forecast/Forecast'
import { Holidays } from '../holidays/Holidays'
import { NewsArticles } from '../news/NewsArticles'
import { Library } from '../library/Library'
import { UserForm } from '../userForm/UserForm'
import { UploadFile } from '../uploadFile/UploadFile'
import { Maps } from '../map/Maps'

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
            <li><a href='#upload' className={styles.link}>Upload Files</a></li>
            <li><a href='#maps' className={styles.link}>Maps</a></li>
          </ul>
        </nav>
        <section className={styles.add_info}>
          <UserForm />
        </section>
      </header>
      <main className={styles.App_main}>
        <section className={styles.weather} id='weather'>
          {/* <Forecast /> */}
        </section>
        <section className={styles.holiday} id='holiday'>
          {/* <Holidays /> */}
        </section>
        <section className={styles.news} id='news'>
          {/* <NewsArticles /> */}
        </section>
        <section className={styles.library} id='library'>
          {/* <Library /> */}
        </section>
        <section className={styles.upload} id='upload'>
          <UploadFile />
        </section>
        <section className={styles.maps} id='maps'>
          <Maps />
        </section>
      </main>
      <footer className={styles.App_footer}>@Created by MalchenkoV</footer>
    </div>
  )
}

