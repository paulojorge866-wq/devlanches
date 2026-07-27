import React from 'react'

function CardPedido({ pedido, onAtualizarStatus }) {
  // Cores dinâmicas para o status
  const corStatus = pedido.status === "Pendente" ? "#dc3545" : 
                    pedido.status === "Preparando" ? "#ffc107" : "#28a745"

  return (
    <div style={{
      ...estilos.card,
      borderLeft: `5px solid ${corStatus}`
    }}>
      <div style={estilos.cardHeader}>
        <h3 style={estilos.cardTitulo}>Pedido #{pedido.id} - {pedido.cliente}</h3>
        <span style={{
          ...estilos.badge,
          backgroundColor: corStatus,
          color: pedido.status === "Preparando" ? "#111" : "#fff"
        }}>{pedido.status}</span>
      </div>
      
      <p style={estilos.itens}>{pedido.itens}</p>
      <p style={estilos.valor}>Total: <strong>R$ {pedido.total.toFixed(2)}</strong></p>
      
      {pedido.status !== "Entregue" && (
        <div style={estilos.acoes}>
          {pedido.status === "Pendente" && (
            <button 
              onClick={() => onAtualizarStatus(pedido.id, "Preparando")} 
              style={estilos.btnPreparar}
            >
              Aceitar e Preparar
            </button>
          )}
          {pedido.status === "Preparando" && (
            <button 
              onClick={() => onAtualizarStatus(pedido.id, "Entregue")} 
              style={estilos.btnEntregar}
            >
              Finalizar e Entregar
            </button>
          )}
        </div>
      )}
    </div>
  )
}

const estilos = {
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px'
  },
  cardTitulo: {
    margin: 0,
    fontSize: '1.2rem'
  },
  badge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  itens: {
    color: '#ccc',
    fontSize: '0.95rem',
    lineHeight: '1.4',
    margin: '0 0 15px 0'
  },
  valor: {
    fontSize: '1.1rem',
    margin: '0 0 20px 0'
  },
  acoes: {
    display: 'flex',
    gap: '10px'
  },
  btnPreparar: {
    backgroundColor: '#ffc107',
    color: '#111',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    flex: 1
  },
  btnEntregar: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    flex: 1
  }
}

export default CardPedido