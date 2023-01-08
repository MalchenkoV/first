import React from 'react'

import './App.css'
import { Forecast } from './components/Forecast'
import { Holidays } from './components/Holidays'
import { NewsArticles } from './components/NewsArticles'

export default function App () {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Info</h1>
        <nav className='menu'>
          <ul className='link'>
            <li><a href='#weather' className='link'>Weather</a></li>
            <li><a href='#holiday' className='link'>Holiday</a></li>
            <li><a href='#news' className='link'>News</a></li>
          </ul>
        </nav>
        <div className='add-info'>
          <p>Здесь будут интересные вещи</p>
        </div>
      </header>
      <main className='App-main'>
        <section className='weather' id='weather'>
          <Forecast />
        </section>
        <section className='holiday' id='holiday'>
          <Holidays />
        </section>
        <section className='news' id='news'>
          <NewsArticles />
        </section>
      </main>
      <footer className='App-footer'>@Created by MalchenkoV</footer>
    </div>
  )
}

