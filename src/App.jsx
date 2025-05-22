import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonTCG from 'pokemontcgsdk';
import './style.css'

function App(){
  
  const [cardId, setCardId] = useState('');
  const [message, setMessage] = useState('');
  const [pokemoncard, setpokemoncard] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey =import.meta.env.VITE_POKEMON_API_KEY;

  const searchCard = async () => {
    if(!cardId.trim()){
      setMessage("Digite o ID da carta");
      return;
    }
    setLoading(true);
    setMessage('');
    setpokemoncard(null);
    
    try{
      const infoCard = await PokemonTCG.card.find(cardId, {apiKey});
      setpokemoncard(infoCard);
      setMessage(`Carta com ID ${cardId}  Sucesso!`);
    } catch (error) {
      setMessage(`Carta com ID ${cardId} Invalido`);
      console.error('Erro');
    } finally {
      setLoading(false);
    }
  };
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
            {pokemoncard && (<img src={pokemoncard.images.large}
          className='carta-img' id='cartaimg' alt={pokemoncard.name}/>)}
          </div>
        </div>
        <div className='procurar-carta'>
          <div className='pesquisar-carta'>
            <input type='text' className='form-control me-2' id='procurarcarta' placeholder='Digite a carta que você procura' value={cardId} onChange={(e) => setCardId (e.target.value)} onKeyPress={(e) => e.key ==='Enter' && searchCard ()}/>

            <button className='btn-primary' id='butaocarta' onClick={searchCard} disabled={loading}>{loading ? 'Buscando...':'Pesquisar'}</button>
          </div>
          {message && <p>{message}</p>}
          
          <div className='carta-info' id='cartainfo'>
            <div className='carta-informacao' id='cartainformacao'>
              <p>Infomarções da carta</p>
             
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
