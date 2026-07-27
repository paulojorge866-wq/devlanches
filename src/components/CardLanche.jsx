import React from 'react';

// O nosso componente recebe "prod" (os dados do lanche) 
// e as funções "onEditar" e "onDeletar" como propriedades (Props)
function CardLanche({ prod, onEditar, onDeletar }) {
  return (
    <div style={estilos.card}>
      {prod.img && (
        <img 
          src={prod.img} 
          alt={prod.nome} 
          style={estilos.imagemLanche} 
        />
      )}

      <div style={estilos.cardHeader}>
        <h3 style={estilos.cardTitulo}>{prod.nome}</h3>
        <span style={estilos.badge}>Ativo</span>
      </div>
      
      <p style={estilos.itens}>{prod.desc}</p>
      
      <div style={estilos.cardFooter}>
        <p style={estilos.valor}>
          Preço: <strong>R$ {Number(prod.preco).toFixed(2)}</strong>
        </p>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Quando clicado, avisa o arquivo App.jsx passando o lanche atual */}
          <button onClick={() => onEditar(prod)} style={estilos.botaoEditar}>
            ✏️ Editar
          </button>
          
          {/* Quando clicado, avisa o arquivo App.jsx passando o ID e o Nome */}
          <button onClick={() => onDeletar(prod._id, prod.nome)} style={estilos.botaoDeletar}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

// Os estilos específicos que esse card usa saíram do App.jsx e vieram para cá
const estilos = {
  card: { backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '5px solid #ffc107', overflow: 'hidden' },
  imagemLanche: { width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px', marginBottom: '15px' },
  cardHeader: { display: 'flex', justifycontent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' },
  cardTitulo: { margin: 0, fontSize: '1.2rem' },
  badge: { padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', backgroundColor: '#28a745', color: '#fff' },
  itens: { color: '#ccc', fontSize: '0.95rem', lineHeight: '1.4', margin: '0 0 15px 0' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', gap: '10px' },
  valor: { fontSize: '1.1rem', margin: '0' },
  botaoEditar: { backgroundColor: '#17a2b8', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 12px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer' },
  botaoDeletar: { backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 12px', fontSize: '0.9rem', cursor: 'pointer' }
};

export default CardLanche;