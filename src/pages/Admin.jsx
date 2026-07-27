import { useState, useEffect } from 'react'
import CardLanche from '../components/CardLanche'
import FormularioLanche from '../components/FormularioLanche'

function Admin() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const [idEditando, setIdEditando] = useState(null)
  const [lancheParaEditar, setLancheParaEditar] = useState(null)

  useEffect(() => {
    async function buscarProdutos() {
      try {
        setCarregando(true)
        setErro(null)
        const resposta = await fetch('http://localhost:3000/dados-produtos')
        if (!resposta.ok) throw new Error('Não foi possível carregar os produtos.')
        const dados = await resposta.json()
        setProdutos(dados)
      } catch (err) {
        setErro("Ops! Não conseguimos conectar ao servidor.")
      } finally {
        setCarregando(false)
      }
    }
    buscarProdutos()
  }, [])

  async function lidarComSalvar(dadosLanche) {
    try {
      if (idEditando) {
        const resposta = await fetch(`http://localhost:3000/editar-produto/${idEditando}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosLanche)
        })
        if (!resposta.ok) throw new Error('Falha ao atualizar o lanche.')
        const produtoAtualizado = await resposta.json()
        setProdutos(produtos.map(p => p._id === idEditando ? produtoAtualizado : p))
        cancelarEdicao()
        alert("✏️ Lanche atualizado com sucesso!")
      } else {
        const resposta = await fetch('http://localhost:3000/cadastrar-produto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosLanche)
        })
        if (!resposta.ok) throw new Error('Falha ao cadastrar novo lanche.')
        const produtoSalvo = await resposta.json()
        setProdutos([...produtos, produtoSalvo])
        alert("🎉 Lanche cadastrado com sucesso!")
      }
    } catch (err) {
      alert(`⚠️ Erro: ${err.message}`)
    }
  }

  async function lidarComDeletar(id, nomeLanche) {
    if (!window.confirm(`Tem certeza que deseja remover o "${nomeLanche}"?`)) return
    try {
      const resposta = await fetch(`http://localhost:3000/deletar-produto/${id}`, { method: 'DELETE' })
      if (!resposta.ok) throw new Error('Falha ao remover.')
      setProdutos(produtos.filter(prod => prod._id !== id))
    } catch (err) {
      alert("⚠️ Erro ao excluir lanche.")
    }
  }

  function prepararEdicao(prod) {
    setIdEditando(prod._id)
    setLancheParaEditar(prod)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelarEdicao() {
    setIdEditando(null)
    setLancheParaEditar(null)
  }

  return (
    <div style={estilos.container}>
      <header style={estilos.header}>
        <h1 style={estilos.titulo}>DevLanches 🍔 • Painel Administrativo</h1>
        <p style={estilos.totalTexto}>Total: <strong>{produtos.length}</strong></p>
      </header>

      <FormularioLanche 
        onSalvar={lidarComSalvar}
        idEditando={idEditando}
        lancheParaEditar={lancheParaEditar}
        onCancelar={cancelarEdicao}
      />

      <hr style={estilos.divisor} />

      {carregando && <p style={{ textAlign: 'center', color: '#ffc107' }}>⏳ Carregando produtos...</p>}
      {erro && <div style={estilos.caixaErro}><p style={{ margin: 0 }}>{erro}</p></div>}

      {!carregando && !erro && (
        <main style={estilos.painel}>
          {produtos.map((prod) => (
            <CardLanche 
              key={prod._id} 
              prod={prod} 
              onEditar={prepararEdicao} 
              onDeletar={lidarComDeletar} 
            />
          ))}
        </main>
      )}
    </div>
  )
}

const estilos = {
  container: { backgroundColor: '#121212', color: '#f5f5f5', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '20px' },
  titulo: { margin: 0, fontSize: '1.8rem' },
  totalTexto: { margin: 0, fontSize: '1.1rem', backgroundColor: '#1e1e1e', padding: '10px 20px', borderRadius: '8px', border: '1px solid #333' },
  divisor: { border: '0', borderTop: '1px solid #333', margin: '30px 0' },
  painel: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  caixaErro: { backgroundColor: '#721c24', color: '#f8d7da', padding: '15px', borderRadius: '8px', textAlign: 'center' }
}

export default Admin