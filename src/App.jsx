import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

function App(){
  return(
    <div className='container'>
      <header className='cabecario'>
        <div className='logo'>
          <h1>TGC DEX</h1>
        </div>
      </header>
      <main className='cartas-layout'>
        <div className='area-carta' id='areacarta'>
          <div className='carta-post' id='cartapost'>
            <p>Lugar da Carta</p>
          </div>
          <img className='carta-img' id='cartaimg' alt='pokecarta'/>
        </div>
        <div className='procurar-carta'>
          <div className='pesquisar-carta'>
            <input type='text' className='form-control me-2' id='procurarcarta' placeholder='Digite a carta que você procura'/>
            <button className='btn-primary' id='butaocarta'>Pesquisar</button>
          </div>
          <div className='carta-info' id='cartainfo'>
            <div className='carta-informacao' id='cartainformacao'>
              <p>Informaçoes</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
