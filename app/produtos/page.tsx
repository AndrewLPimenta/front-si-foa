"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Instagram, ShoppingBag, Search, Filter, X, Heart, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/contexts/cart-context"

// Definindo o tipo para os produtos
type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
  descricao: string
  categoria: string
  destaque?: boolean
}

// Lista de produtos
const produtos: Produto[] = [
  {
    id: 1,
    nome: "Caneca Tiranos",
    preco: 35.9,
    imagem: "/caneca-tiranos.png",
    descricao: "Caneca oficial da Atlética SI - FOA, perfeita para seu café.",
    categoria: "Acessórios",
    destaque: true,
  },
  {
    id: 2,
    nome: "Tiranos Basic - Branca",
    preco: 89.9,
    imagem: "/camisa-branca.png",
    descricao: "Blusa preta com logo da Atlética SI - FOA.",
    categoria: "Vestuário",
  },
  {
    id: 3,
    nome: "Tiranos Basic - Preta",
    preco: 89.9,
    imagem: "/camisa-preta.png",
    descricao: "Blusa branca com logo da Atlética SI - FOA.",
    categoria: "Vestuário",
  },
  {
    id: 4,
    nome: "Casaco Tiranos",
    preco: 149.9,
    imagem: "/casaco.png",
    descricao: "Casaco oficial da Atlética SI - FOA para os dias frios.",
    categoria: "Vestuário",
    destaque: true,
  },
  {
    id: 5,
    nome: "Calça Tiranos",
    preco: 119.9,
    imagem: "/calca.png",
    descricao: "Calça esportiva com logo da Atlética SI - FOA.",
    categoria: "Vestuário",
  },
  {
    id: 6,
    nome: "Top Feminino Tiranos - Preto",
    preco: 69.9,
    imagem: "/top-fem.png",
    descricao: "Top feminino esportivo da Atlética SI - FOA.",
    categoria: "Vestuário",
  }
]

// Categorias únicas
const categorias = ["Todos", ...new Set(produtos.map((produto) => produto.categoria))]

export default function ProdutosPage() {
  const [filtroCategoria, setFiltroCategoria] = useState("Todos")
  const [busca, setBusca] = useState("")
  const [produtosFiltrados, setProdutosFiltrados] = useState(produtos)
  const [isFiltering, setIsFiltering] = useState(false)
  const { addItem } = useCart()

  // Função para filtrar produtos
  const filtrarProdutos = (categoria: string, termoBusca: string) => {
    setIsFiltering(true)

    let resultado = produtos

    // Filtrar por categoria
    if (categoria !== "Todos") {
      resultado = resultado.filter((produto) => produto.categoria === categoria)
    }

    // Filtrar por termo de busca
    if (termoBusca) {
      resultado = resultado.filter(
        (produto) =>
          produto.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
          produto.descricao.toLowerCase().includes(termoBusca.toLowerCase()),
      )
    }

    setTimeout(() => {
      setProdutosFiltrados(resultado)
      setIsFiltering(false)
    }, 300)
  }

  // Aplicar filtro quando categoria ou busca mudar
  const aplicarFiltro = (categoria: string, termo: string) => {
    setFiltroCategoria(categoria)
    setBusca(termo)
    filtrarProdutos(categoria, termo)
  }

  // Adicionar produto ao carrinho
  const adicionarAoCarrinho = (produto: Produto) => {
    addItem({
      id: `product-${produto.id}`,
      name: produto.nome,
      price: produto.preco,
      quantity: 1,
      image: produto.imagem,
      type: "product",
    })
  }

  return (
    <div>
      {/* Banner da página */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 to-secondary/90 dark:from-primary/30 dark:to-secondary/30 text-white py-16 md:py-24">
        <div
  className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
  style={{ backgroundImage: "url('/dino.png')" }}
></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-white/20 text-white text-sm font-medium">
              Loja Oficial
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Produtos Oficiais</h1>
            <p className="text-lg max-w-3xl mx-auto text-white/90">
              Vista-se com orgulho e represente a Atlética SI - FOA com nossa linha exclusiva de produtos.
            </p>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            className="w-full h-auto fill-background"
            preserveAspectRatio="none"
          >
            <path d="M0,96L80,85.3C160,75,320,53,480,53.3C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Filtros e Busca */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="w-full md:w-auto flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="bg-transparent border-none focus:outline-none text-foreground w-full"
              value={busca}
              onChange={(e) => aplicarFiltro(filtroCategoria, e.target.value)}
            />
            {busca && (
              <button
                onClick={() => aplicarFiltro(filtroCategoria, "")}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Limpar busca"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto hide-scrollbar py-2">
            <Filter className="h-5 w-5 text-muted-foreground mr-1 flex-shrink-0" />
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => aplicarFiltro(categoria, busca)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  filtroCategoria === categoria
                    ? "bg-secondary text-white"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de produtos */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {isFiltering ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-[400px]"
              >
                <div className="relative w-16 h-16">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-secondary/20 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-secondary rounded-full animate-spin"></div>
                </div>
              </motion.div>
            ) : produtosFiltrados.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col justify-center items-center h-[400px] text-center"
              >
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground mb-6">
                  Não encontramos produtos que correspondam aos seus filtros.
                </p>
                <Button variant="premium" onClick={() => aplicarFiltro("Todos", "")}>
                  Ver todos os produtos
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {produtosFiltrados.map((produto, index) => (
                  <ProductCard
                    key={produto.id}
                    produto={produto}
                    index={index}
                    onAddToCart={() => adicionarAoCarrinho(produto)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Informações adicionais */}
      <section className="bg-muted/30 dark:bg-muted/10 py-16 md:py-24 mt-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
              Informações de Compra
            </div>
            <h2 className="text-2xl font-bold mb-4 text-primary">Como Adquirir Nossos Produtos</h2>
            <p className="text-muted-foreground mb-8">
              Para adquirir nossos produtos, entre em contato através do nosso Instagram ou WhatsApp. Também realizamos
              vendas presenciais durante o horário de funcionamento da faculdade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="premium" asChild>
                <Link href="https://instagram.com/atleticasifoa" target="_blank">
                  <Instagram className="mr-2 h-5 w-5" />
                  Instagram
                </Link>
              </Button>
              <Button variant="premium-outline" size="premium" asChild>
                <Link href="https://wa.me/5518999999999" target="_blank">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  WhatsApp
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function ProductCard({
  produto,
  index,
  onAddToCart,
}: {
  produto: Produto
  index: number
  onAddToCart: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { toast } = useToast()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card text-card-foreground rounded-2xl shadow-md overflow-hidden hover-lift group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={produto.imagem || "/placeholder.svg"}
          alt={produto.nome}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {produto.destaque && (
          <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
            Destaque
          </div>
        )}

        <button
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-black/50 flex items-center justify-center transition-all hover:bg-white dark:hover:bg-black/70"
          onClick={(e) => {
            e.stopPropagation()
            setIsFavorite(!isFavorite)
            toast({
              title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
              description: isFavorite
                ? `${produto.nome} foi removido dos seus favoritos`
                : `${produto.nome} foi adicionado aos seus favoritos`,
              duration: 3000,
            })
          }}
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart
            className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"}`}
          />
        </button>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center p-4"
            >
              <Button
                variant="premium"
                className="w-full"
                size="default"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToCart()
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Comprar Agora
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-primary">{produto.nome}</h3>
          <span className="text-lg font-bold text-secondary">R$ {produto.preco.toFixed(2).replace(".", ",")}</span>
        </div>
        <p className="text-muted-foreground mb-4">{produto.descricao}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">{produto.categoria}</span>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart()
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
