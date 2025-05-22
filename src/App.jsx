/*Nome do arquivo: README.MD
 Data de criação: 15/05/2025
 Autor: Matheus Alencar Cavalcante
 Matrícula: 01568969
 */

import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonTCG from 'pokemontcgsdk';
import './style.css'

function App() {

  const [cardId, setCardId] = useState('');
  const [message, setMessage] = useState('');
  const [pokemoncard, setpokemoncard] = useState('');
  const [loading, setLoading] = useState(false);
  const [saves, setSaves] = useState([]);


  const apiKey = import.meta.env.VITE_POKEMON_API_KEY;

  // Verificação da barra de busca 

  const searchCard = async () => {
    if (!cardId.trim()) {
      setMessage("Digite o ID da carta");
      return;
    }
    setLoading(true);
    setMessage('');
    setpokemoncard(null);

    try {

      const searchCarta = await PokemonTCG.card.find(cardId, { apiKey });

      // Verificação dos atributos caso não tenha

      const chekCard = {
        id: searchCarta.id || 'N/A',
        name: searchCarta.name || 'Nome desconhecido',
        images: {
          small: searchCarta.images?.small || '/pokebola.svg',
          large: searchCarta.images?.large || '/pokebola.svg'
        },
        hp: searchCarta.hp || 'N/A',
        types: searchCarta.types || [],
        evolvesFrom: searchCarta.evolvesFrom || 'Nenhuma',
        rules: searchCarta.rules || [],
        abilities: searchCarta.abilities || [],
        attacks: searchCarta.attacks || [],
        weaknesses: searchCarta.weaknesses || [],
        tcgplayer: {
          prices: {
            holofoil: {
              market: searchCarta.tcgplayer?.prices?.holofoil?.market || 'N/A'
            }
          }
        }
      };

      // Carta encontrada e mostra mensagem de sucesso

      setpokemoncard(chekCard);
      setMessage(`Carta com ID ${cardId}  Sucesso!`);
    } catch (error) {
      setMessage(`Carta com ID ${cardId} Invalido`);
      console.error('Erro');
    } finally {
      setLoading(false);
    }
  };

  // Verifica se a carta já foi salva antes
  const salvarCard = () => {
    if (!pokemoncard) return;

    const savedcarta = saves.some(pokemoncard => cardId == pokemoncard.id);

    if (savedcarta) {
      alert('Já foi salvo');
      return;
    }

    // Salva no localStorage

    const salvados = [...saves, pokemoncard];
    setSaves(salvados);
    localStorage.setItem(`pokemon`, JSON.stringify(salvarCard));
    alert('Carta salva!');
  }


  return (
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
              className='carta-img' id='cartaimg' alt={pokemoncard.name} />)}
          </div>
        </div>

        <div className='procurar-carta'>
          <div className='pesquisar-carta'>
            <input type='text' className='form-control me-2' id='procurarcarta' placeholder='Digite a carta que você procura' value={cardId} onChange={(e) => setCardId(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && searchCard()} />

            <button className='btn-primary' id='butaocarta1' onClick={searchCard} disabled={loading}>{loading ? 'Buscando...' : 'Pesquisar'}</button>

            <button className='btn-second' id='butaocarta2' onClick={salvarCard} disabled={loading}>Salvar</button>

          </div>
          {message && <p>{message}</p>}

          <div className='carta-info' id='cartainfo'>
            <div className='carta-informacao' id='cartainformacao'>
              <p><strong>Infomarções da carta</strong></p>
              {pokemoncard &&

                <ul>
                  <li><strong>NOME: </strong>{pokemoncard.name}</li>

                  <li><strong>ID: </strong>{pokemoncard.id}</li>

                  <li><strong>HP: </strong>{pokemoncard.hp}</li>

                  <li><strong>TIPO: </strong>{pokemoncard.types}</li>

                  <li><strong>EVOLUÇÔES: </strong>{pokemoncard.evolvesFrom}</li>

                  <li><strong>REGRAS: </strong>{pokemoncard.rules}</li>

                  <li><strong>ATAQUES: </strong>{pokemoncard.attacks.map((attack, index) => (<ul>
                    <li key={index}><strong>{attack.name}</strong> - Custo: {attack.cost} {attack.convertedEnergyCost} - Descrição: {attack.text} </li>
                  </ul>))}</li>

                  <li><strong>HABILIDADES:</strong>{pokemoncard.abilities.map((ability, index) => (<ul>
                    <li key={index}><strong>{ability.name}</strong> - {ability.text}</li>
                  </ul>))}</li>

                  <li><strong>FRAQUEZAS:</strong>{pokemoncard.weaknesses.map((weaknesse, index) => (<ul>
                    <li key={index}><strong></strong>{weaknesse.type} {weaknesse.value}</li>
                  </ul>))}</li>

                  <li><strong>VALOR: </strong>$ {pokemoncard.tcgplayer.prices.holofoil.market}</li>
                </ul>
              }

            </div>
          </div>
        </div>
      </main>
      <div className='salvados-cartas' id='salvadoscartas'>

        <h2>Cartas Salvas</h2>
        {saves.length > 0 ? (

          <div className='cartas-salvados' id='cartassalvados'>
            {saves.map((pokemoncard) => (
              <img src={pokemoncard.images.small} alt={pokemoncard.id} className='carta-img2' />
            ))}
          </div>
        ) : (<p>Nenhuma carta salva</p>)}
      </div>

    </div>
  )
}

export default App
