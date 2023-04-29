import { ReactElement } from 'react'

import Hero from './components/Hero/Hero';
import Summarize from './components/Summarize/Summarize';
import './App.scss'

function App(): ReactElement {

  return (
    <main>
      <div className='main'>
        <div className='gradient'></div>
      </div>
      <div className='app'>
        <Hero />
        <Summarize />
      </div>
    </main>
  )
}

export default App
