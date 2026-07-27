import { createContext, useState } from 'react'

// 1. Criamos o Contexto
export const CarrinhoContext = createContext()

// 2. Criamos o Provider (o componente "nuvem" que guarda o estado)
export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([])

  // Função para adicionar lanche ao carrinho
  function adicionarAoCarrinho(lanche) {
    setCarrinho((prev) => {
      // Verifica se o lanche já está no carrinho
      const itemExistente = prev.find(item => item._id === lanche._id)

      if (itemExistente) {
        // Se já existe, apenas aumenta a quantidade
        return prev.map(item =>
          item._id === lanche._id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      } else {
        // Se é novo, adiciona com quantidade 1
        return [...prev, { ...lanche, quantidade: 1 }]
      }
    })
  }

  // Função para remover um item do carrinho
  function removerDoCarrinho(id) {
    setCarrinho(prev => prev.filter(item => item._id !== id))
  }

  // Função para limpar o carrinho inteiro
  function limparCarrinho() {
    setCarrinho([])
  }

  // Calculando o total de itens e o valor total
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0)
  const valorTotal = carrinho.reduce((total, item) => total + (Number(item.preco) * item.quantidade), 0)

  return (
    <CarrinhoContext.Provider value={{
      carrinho,
      adicionarAoCarrinho,
      removerDoCarrinho,
      limparCarrinho,
      totalItens,
      valorTotal
    }}>
      {children}
    </CarrinhoContext.Provider>
  )
}