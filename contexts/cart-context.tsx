"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"

// Tipos
export type CartItemType = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  type: "product" | "ticket"
  eventDate?: string
}

type CartContextType = {
  items: CartItemType[]
  addItem: (item: CartItemType) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

// Criando o contexto
const CartContext = createContext<CartContextType | undefined>(undefined)

// Hook personalizado para usar o contexto
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

// Provider do contexto
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemType[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // Carregar carrinho do localStorage quando o componente montar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart)
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Salvar carrinho no localStorage quando mudar
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items))
    }

    // Calcular totais
    const itemCount = items.reduce((total, item) => total + item.quantity, 0)
    const priceSum = items.reduce((total, item) => total + item.price * item.quantity, 0)

    setTotalItems(itemCount)
    setTotalPrice(priceSum)
  }, [items])

  // Adicionar item ao carrinho
  const addItem = (newItem: CartItemType) => {
    setItems((prevItems) => {
      // Verificar se o item já existe no carrinho
      const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id)

      if (existingItemIndex >= 0) {
        // Atualizar quantidade se o item já existir
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity

        toast({
          title: "Quantidade atualizada",
          description: `${newItem.name} agora tem ${updatedItems[existingItemIndex].quantity} unidades no carrinho`,
          duration: 3000,
        })

        return updatedItems
      } else {
        // Adicionar novo item
        toast({
          title: "Item adicionado",
          description: `${newItem.name} foi adicionado ao carrinho`,
          duration: 3000,
        })

        return [...prevItems, newItem]
      }
    })
  }

  // Remover item do carrinho
  const removeItem = (id: string) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id)
      if (itemToRemove) {
        toast({
          title: "Item removido",
          description: `${itemToRemove.name} foi removido do carrinho`,
          duration: 3000,
        })
      }

      const newItems = prevItems.filter((item) => item.id !== id)
      if (newItems.length === 0) {
        localStorage.removeItem("cart")
      }
      return newItems
    })
  }

  // Atualizar quantidade de um item
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Limpar carrinho
  const clearCart = () => {
    setItems([])
    localStorage.removeItem("cart")
    toast({
      title: "Carrinho limpo",
      description: "Todos os itens foram removidos do carrinho",
      duration: 3000,
    })
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
