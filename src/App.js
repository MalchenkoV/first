import './App.css';

function App() {
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
            <div className='data-box'>
              <h2 className='header'>Tbilisi</h2>
              <h2 className='dayToday'></h2>
              <h2 className='time'></h2>
              <h2 className='temp'></h2>
              <h2 className='wind'></h2>              
            </div>
        </section>
        <section className='holiday' id='holiday'>
          <div className='data-box'>
            <h2 className='header'>Today is</h2>
            <h2 className='today-is'></h2>
          </div>
        </section>
        <section className='news' id='news'>
          <div className='data-box'>
            <a href='' className='title' target="_blank" rel="noopener noreferrer"></a>
            <ul id='articles'></ul>
          </div>
        </section>
      </main>
      <footer className='App-footer'>@Created by MalchenkoV</footer>
    </div>
  );
}

export default App;
