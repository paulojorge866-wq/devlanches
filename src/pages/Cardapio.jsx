import { useState, useEffect, useContext } from 'react'
import { CarrinhoContext } from '../context/CarrinhoContext'

function Cardapio() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)

  // Consumindo a função do nosso contexto global
  const { adicionarAoCarrinho } = useContext(CarrinhoContext)

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const resposta = await fetch('http://localhost:3000/dados-produtos')
        const dados = await resposta.json()
        setProdutos(dados)
      } catch (err) {
        console.error("Erro ao carregar cardápio:", err)
      } finally {
        setCarregando(false)
      }
    }
    buscarProdutos()
  }, [])

  return (
    <div style={estilos.container}>
      <header style={estilos.header}>
        <h1 style={estilos.titulo}>DevLanches 🍔 • Cardápio Digital</h1>
        <p style={{ color: '#aaa', margin: 0 }}>Faça o seu pedido online!</p>
      </header>

      {carregando ? (
        <p style={{ textAlign: 'center', color: '#ffc107' }}>Carregando delícias...</p>
      ) : (
        <main style={estilos.painel}>
          {produtos.map((prod) => (
            <div key={prod._id} style={estilos.card}>
              {prod.img && <img src={prod.img} alt={prod.nome} style={estilos.imagem} />}
              <h3 style={estilos.cardTitulo}>{prod.nome}</h3>
              <p style={estilos.desc}>{prod.desc}</p>
              <div style={estilos.cardFooter}>
                <span style={estilos.preco}>R$ {Number(prod.preco).toFixed(2)}</span>
                
                {/* Quando clica, executa a função global */}
                <button 
                  onClick={() => adicionarAoCarrinho(prod)} 
                  style={estilos.botaoAdicionar}
                >
                  🛒 Adicionar
                </button>
              </div>
            </div>
          ))}
        </main>
      )}
    </div>
  )
}

const estilos = {
  container: { backgroundColor: '#121212', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px' },
  header: { textAlign: 'center', borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '30px' },
  titulo: { margin: '0 0 10px 0', fontSize: '2rem', color: '#ffc107' },
  painel: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #333' },
  imagem: { width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' },
  cardTitulo: { margin: '0 0 8px 0', fontSize: '1.2rem' },
  desc: { color: '#aaa', fontSize: '0.9rem', marginBottom: '15px' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  preco: { fontSize: '1.2rem', fontWeight: 'bold', color: '#28a745' },
  botaoAdicionar: { backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', padding: '8px 12px', fontWeight: 'bold', cursor: 'pointer' }
}

export default Cardapio