"use client"

import { useCart, type CartItemType } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus, ShoppingBag, Ticket, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const { toast } = useToast()

  const handleCheckout = () => {
    setIsCheckingOut(true)

    // Simulando processamento de pagamento
    setTimeout(() => {
      toast({
        title: "Pedido realizado com sucesso!",
        description: "Você receberá um email com os detalhes do seu pedido.",
        duration: 5000,
      })
      clearCart()
      setIsCheckingOut(false)
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mb-8">
              Parece que você ainda não adicionou nenhum item ao seu carrinho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg" asChild>
                <Link href="/produtos">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Ver Produtos
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/eventos">
                  <Ticket className="mr-2 h-5 w-5" />
                  Ver Eventos
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Seu Carrinho</h1>
          <Button variant="outline" size="sm" onClick={clearCart} disabled={isCheckingOut}>
            <Trash2 className="mr-2 h-4 w-4" />
            Limpar Carrinho
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id)}
                onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
                disabled={isCheckingOut}
              />
            ))}
          </div>

          <div className="bg-card rounded-2xl shadow-md p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.quantity}x {item.name}
                  </span>
                  <span>R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</span>
                </div>
              ))}

              <div className="border-t border-border pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>
            </div>

            <Button variant="premium" size="lg" className="w-full" onClick={handleCheckout} disabled={isCheckingOut}>
              {isCheckingOut ? "Processando..." : "Finalizar Compra"}
            </Button>

            <div className="mt-4">
              <Link
                href="/produtos"
                className="text-sm text-secondary flex items-center justify-center hover:underline"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
  disabled,
}: {
  item: CartItemType
  onRemove: () => void
  onUpdateQuantity: (quantity: number) => void
  disabled: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-card rounded-2xl shadow-md overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-32 sm:h-auto sm:w-32 md:w-40">
          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          {item.type === "ticket" && (
            <div className="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-1 rounded-full">Ingresso</div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                {item.eventDate && <p className="text-sm text-muted-foreground mb-1">Data: {item.eventDate}</p>}
              </div>
              <span className="font-bold">R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</span>
            </div>

            <p className="text-sm text-muted-foreground">
              Preço unitário: R$ {item.price.toFixed(2).replace(".", ",")}
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => onUpdateQuantity(item.quantity - 1)}
                disabled={disabled}
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="mx-3 w-8 text-center">{item.quantity}</span>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => onUpdateQuantity(item.quantity + 1)}
                disabled={disabled}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <Button variant="ghost" size="sm" onClick={onRemove} disabled={disabled}>
              <Trash2 className="h-4 w-4 mr-1" />
              Remover
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
