import React, { useState, useEffect } from 'react';

function FormularioLanche({ onSalvar, idEditando, lancheParaEditar, onCancelar }) {
  // Estados para controlar os campos do formulário internamente
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [desc, setDesc] = useState('');
  const [imagem, setImagem] = useState('');

  // Sempre que mudar o lanche enviado para edição (ou se for limpo), atualiza os inputs
  useEffect(() => {
    if (lancheParaEditar) {
      setNome(lancheParaEditar.nome || '');
      setPreco(lancheParaEditar.preco || '');
      setDesc(lancheParaEditar.desc || '');
      setImagem(lancheParaEditar.img || '');
    } else {
      limparCampos();
    }
  }, [lancheParaEditar]);

  function limparCampos() {
    setNome('');
    setPreco('');
    setDesc('');
    setImagem('');
  }

 function handleSubmit(e) {
    e.preventDefault();

    if (!nome || !preco || !desc || !imagem) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    // Envia o objeto do lanche para o App.jsx
    onSalvar({ nome, preco, desc, img: imagem });

    // 🧹 SE NÃO ESTIVER EDITANDO, LIMPA OS CAMPOS APÓS O CADASTRO!
    if (!idEditando) {
      limparCampos();
    }
  }

  function handleCancelar() {
    limparCampos();
    onCancelar();
  }

  return (
    <section style={estilos.secaoForm}>
      <h2 style={estilos.subtitulo}>
        {idEditando ? "✏️ Editando Lanche" : "Cadastrar Novo Lanche"}
      </h2>
      <form onSubmit={handleSubmit} style={estilos.formulario}>
        <input 
          type="text" 
          placeholder="Nome do lanche (ex: X-Burguer)" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          style={estilos.input} 
        />
        <input 
          type="number" 
          step="0.01" 
          placeholder="Preço (ex: 22.90)" 
          value={preco} 
          onChange={(e) => setPreco(e.target.value)} 
          style={estilos.input} 
        />
        <input 
          type="text" 
          placeholder="Descrição / Ingredientes" 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
          style={estilos.input} 
        />
        <input 
          type="text" 
          placeholder="URL da Imagem" 
          value={imagem} 
          onChange={(e) => setImagem(e.target.value)} 
          style={estilos.input} 
        />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            style={{ 
              ...estilos.botaoCadastrar, 
              flex: 1, 
              backgroundColor: idEditando ? '#28a745' : '#ffc107', 
              color: idEditando ? '#fff' : '#000' 
            }}
          >
            {idEditando ? "Salvar Alterações" : "Salvar no Cardápio"}
          </button>
          
          {idEditando && (
            <button 
              type="button" 
              onClick={handleCancelar} 
              style={estilos.botaoCancelar}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

const estilos = {
  secaoForm: { backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px', border: '1px solid #333', marginBottom: '30px' },
  subtitulo: { margin: '0 0 15px 0', fontSize: '1.3rem', color: '#ffc107' },
  formulario: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: { backgroundColor: '#121212', border: '1px solid #444', borderRadius: '4px', padding: '12px', color: '#fff', fontSize: '1rem', outline: 'none' },
  botaoCadastrar: { border: 'none', borderRadius: '4px', padding: '12px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' },
  botaoCancelar: { backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', padding: '12px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};

export default FormularioLanche;