import { useState, useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { CarrinhoContext } from './context/CarrinhoContext'
import Cardapio from './pages/Cardapio'
import Admin from './pages/Admin'

function App() {
  const { totalItens, carrinho, removerDoCarrinho, valorTotal, limparCarrinho } = useContext(CarrinhoContext)
  const [verCarrinho, setVerCarrinho] = useState(false)

  return (
    <div>
      {/* MENU DE NAVEGAÇÃO SUPERIOR */}
      <nav style={estilos.nav}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={estilos.link}>🍔 Cardápio</Link>
          <Link to="/admin" style={estilos.link}>⚙️ Painel Admin</Link>
        </div>
      </nav>

      {/* 🎈 BOTÃO FLUTUANTE DO CARRINHO (Sempre visível no canto inferior direito) */}
      <button onClick={() => setVerCarrinho(!verCarrinho)} style={estilos.botaoCarrinhoFlutuante}>
        🛒 Carrinho
        {totalItens > 0 && (
          <span style={estilos.badgeContador}>{totalItens}</span>
        )}
      </button>

      {/* ABA / MODAL LATERAL DO CARRINHO */}
      {verCarrinho && (
        <aside style={estilos.painelCarrinho}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>🛒 Seu Pedido</h2>
            <button onClick={() => setVerCarrinho(false)} style={estilos.fechar}>❌</button>
          </div>

          {carrinho.length === 0 ? (
            <p style={{ color: '#aaa', marginTop: '20px' }}>Seu carrinho está vazio.</p>
          ) : (
            <div>
              <div style={{ maxHeight: '60vh', overflowY: 'auto', marginTop: '15px' }}>
                {carrinho.map(item => (
                  <div key={item._id} style={estilos.itemCarrinho}>
                    <div>
                      <strong>{item.nome}</strong> (x{item.quantidade})
                      <br />
                      <small style={{ color: '#aaa' }}>R$ {(Number(item.preco) * item.quantidade).toFixed(2)}</small>
                    </div>
                    <button onClick={() => removerDoCarrinho(item._id)} style={estilos.btnRemover}>🗑️</button>
                  </div>
                ))}
              </div>

              <hr style={{ borderColor: '#333', margin: '15px 0' }} />
              <h3>Total: <span style={{ color: '#28a745' }}>R$ {valorTotal.toFixed(2)}</span></h3>
              
              <button 
                onClick={() => { 
                  alert('🎉 Pedido finalizado com sucesso!'); 
                  limparCarrinho(); 
                  setVerCarrinho(false); 
                }} 
                style={estilos.btnFinalizar}
              >
                ✅ Finalizar Pedido
              </button>
            </div>
          )}
        </aside>
      )}

      {/* ROTAS */}
      <Routes>
        <Route path="/" element={<Cardapio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

const estilos = {
  nav: { backgroundColor: '#1e1e1e', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' },
  link: { color: '#ffc107', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' },
  
  // Estilo Mágico do Botão Flutuante ✨
  botaoCarrinhoFlutuante: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    padding: '14px 22px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1.1rem',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
    zIndex: 999, // Garante que fica por cima dos cards de lanche
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  
  // Bolinha vermelha com a quantidade de itens
  badgeContador: {
    backgroundColor: '#dc3545',
    color: '#fff',
    borderRadius: '50%',
    padding: '2px 8px',
    fontSize: '0.85rem',
    fontWeight: 'bold'
  },

  painelCarrinho: { position: 'fixed', right: 0, top: 0, width: '320px', height: '100vh', backgroundColor: '#181818', borderLeft: '1px solid #333', padding: '20px', boxSizing: 'border-box', zIndex: 1000, color: '#fff', boxShadow: '-5px 0 15px rgba(0,0,0,0.5)' },
  fechar: { backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' },
  itemCarrinho: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0', padding: '10px', backgroundColor: '#222', borderRadius: '4px' },
  btnRemover: { backgroundColor: '#dc3545', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer', padding: '4px 8px' },
  btnFinalizar: { width: '100%', backgroundColor: '#ffc107', color: '#000', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginTop: '10px' }
}

export default App
