"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, ShoppingCart, Share2, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"

// Definindo o tipo para os produtos
type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
  descricao: string
  categoria: string
  destaque?: boolean
  detalhes?: string
  tamanhos?: string[]
  cores?: string[]
  material?: string
  estoque?: number
  galeria?: string[]
}

// Lista de produtos (mesma da página de produtos)
const produtos: Produto[] = [
  {
    id: 1,
    nome: "Caneca Tiranos",
    preco: 40.0,
    imagem: "/caneca-tiranos.png",
    descricao: "Caneca oficial da Atlética. perfeita para seus momentos mais importantes na universidade.",
    categoria: "Acessórios",
    destaque: true,
    detalhes:
      "Caneca de metal com capacidade de 800ml, estampada com o mascote da Atlética. Produto de alta qualidade, resistente e durável.",
    material: "Metal",
    estoque: 25,
    galeria: [
      "/galeria-caneca-1.png?height=300&width=300",
      "/galeria-caneca-2.png?height=300&width=300",
      "/galeria-caneca-3.png?height=300&width=300",
    ],
  },
  {
    id: 3,
    nome: "Tiranos Basic Preta",
    preco: 89.9,
    imagem: "/camisa-preta.png?height=300&width=300",
    descricao: "Blusa preta com logo da Atlética SI - FOA.",
    categoria: "Vestuário",
    detalhes:
      "A Tiranos Basic é a peça essencial para quem busca estilo e conforto no dia a dia. Com design minimalista e elegante, essa blusa é feita com tecido de alta qualidade, oferecendo caimento leve e toque macio.",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Preto"],
    material: "100% Algodão",
    estoque: 15,
    galeria: ["/bpreta-1.png?height=300&width=300", "/bpreta-2.png?height=300&width=300"],
  },
  {
    id: 2,
    nome: "Tiranos Basic Branca",
    preco: 89.9,
    imagem: "/camisa-branca.png?height=300&width=300",
    descricao: "A Tiranos Basic é a peça essencial para quem busca estilo e conforto no dia a dia. Com design minimalista e elegante, essa blusa é feita com tecido de alta qualidade, oferecendo caimento leve e toque macio.",
    categoria: "Vestuário",
    detalhes:
      "Blusa de algodão de alta qualidade com estampa do logo da Atlética de Sistemas de Informação - UniFOA. Confortável e estilosa, perfeita para mostrar seu orgulho pela atlética.",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Branco"],
    material: "100% Algodão",
    estoque: 12,
    galeria: ["/bbranca-1.png?height=300&width=300", "/bbranca-2.png?height=300&width=300"],
  },
  {
    id: 4,
    nome: "Hoodie Tiranos",
    preco: 149.9,
    imagem: "/casaco.png?height=300&width=300",
    descricao: "O Casaco Tiranos é o item essencial para quem quer se manter aquecido com estilo e atitude. Produzido com materiais de alta qualidade, ele oferece conforto térmico e resistência, ideal para os dias frios",
    categoria: "Vestuário",
    destaque: true,
    detalhes:
      "Casaco de moletom com capuz, bolsos frontais e estampa do logo da Atlética de Sistemas de Informação - UniFOA. Perfeito para os dias frios, confortável e estiloso.",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Preto"],
    material: "80% Algodão, 20% Poliéster",
    estoque: 8,
    galeria: [
      "/casaco-1.png?height=300&width=300",
      "/casaco-2.png?height=300&width=300",
    ],
  },
  {
    id: 6,
    nome: "Calça Tiranos",
    preco: 119.9,
    imagem: "/calca.png?height=300&width=300",
    descricao: "A Calça Tiranos combina conforto, estilo e identidade atlética em uma peça versátil para o dia a dia ou atividades esportivas e estampa do logo da Atlética de Sistemas de Informação - UniFOA.",
    categoria: "Vestuário",
    detalhes:
      "Calça esportiva de moletom com elástico na cintura.",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Preto", "Cinza"],
    material: "70% Algodão, 30% Poliéster",
    estoque: 10,
    galeria: ["/calca-1.png?height=300&width=300", "/calca-2.png?height=300&width=300"],
  },
  {
    id: 5,
    nome: "Top Tiranos Preto",
    preco: 69.9,
    imagem: "/top.png?height=300&width=300",
    descricao: "O Top Tiranos foi desenvolvido especialmente para as mulheres da tecnologia que encaram desafios com garra dentro e fora da faculdade.",
    categoria: "Vestuário",
    detalhes:
      "Top feminino esportivo com tecido respirável e estampa do logo da Atlética de Sistemas de Informação - UniFOA. Ideal para atividades físicas.",
    tamanhos: ["P", "M", "G"],
    cores: ["Preto", "Azul"],
    material: "85% Poliamida, 15% Elastano",
    estoque: 7,
    galeria: ["/top-1.png?height=300&width=300", "/top-2.png?height=300&width=300"],
  },
]

export default function ProdutoDetalhePage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [produto, setProduto] = useState<Produto | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState("")
  const [quantidade, setQuantidade] = useState(1)
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string | null>(null)
  const [corSelecionada, setCorSelecionada] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // Simular carregamento
    setLoading(true)

    // Buscar produto pelo ID
    const id = Number(params.id)
    const produtoEncontrado = produtos.find((p) => p.id === id)

    if (produtoEncontrado) {
      setProduto(produtoEncontrado)
      setSelectedImage(produtoEncontrado.imagem)

      // Inicializar tamanho e cor se disponíveis
      if (produtoEncontrado.tamanhos && produtoEncontrado.tamanhos.length > 0) {
        setTamanhoSelecionado(produtoEncontrado.tamanhos[0])
      }

      if (produtoEncontrado.cores && produtoEncontrado.cores.length > 0) {
        setCorSelecionada(produtoEncontrado.cores[0])
      }
    } else {
      // Redirecionar para a página de produtos se não encontrar
      router.push("/produtos")
    }

    setLoading(false)
  }, [params.id, router])

  const adicionarAoCarrinho = () => {
    if (!produto) return

    // Verificar se tamanho foi selecionado quando necessário
    if (produto.tamanhos && produto.tamanhos.length > 0 && !tamanhoSelecionado) {
      toast({
        title: "Selecione um tamanho",
        description: "Por favor, selecione um tamanho antes de adicionar ao carrinho",
        duration: 3000,
      })
      return
    }

    // Verificar se cor foi selecionada quando necessária
    if (produto.cores && produto.cores.length > 0 && !corSelecionada) {
      toast({
        title: "Selecione uma cor",
        description: "Por favor, selecione uma cor antes de adicionar ao carrinho",
        duration: 3000,
      })
      return
    }

    // Criar nome do produto com variações selecionadas
    let nomeProduto = produto.nome
    if (tamanhoSelecionado) nomeProduto += ` - ${tamanhoSelecionado}`
    if (corSelecionada) nomeProduto += ` - ${corSelecionada}`

    addItem({
      id: `product-${produto.id}-${tamanhoSelecionado || ""}-${corSelecionada || ""}`,
      name: nomeProduto,
      price: produto.preco,
      quantity: quantidade,
      image: produto.imagem,
      type: "product",
    })

    toast({
      title: "Produto adicionado",
      description: `${nomeProduto} foi adicionado ao carrinho`,
      duration: 3000,
    })
  }

  const incrementarQuantidade = () => {
    if (produto?.estoque && quantidade >= produto.estoque) {
      toast({
        title: "Quantidade máxima",
        description: `Apenas ${produto.estoque} unidades disponíveis em estoque`,
        duration: 3000,
      })
      return
    }
    setQuantidade(quantidade + 1)
  }

  const decrementarQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1)
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: produto
        ? isFavorite
          ? `${produto.nome} foi removido dos seus favoritos`
          : `${produto.nome} foi adicionado aos seus favoritos`
        : "",
      duration: 3000,
    })
  }

  if (loading || !produto) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-secondary/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-secondary rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Banner do produto */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 to-secondary/90 dark:from-primary/30 dark:to-secondary/30 text-white py-16 md:py-24">
<div
  className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
  style={{ backgroundImage: "url('/dino.png')" }}
></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              href="/produtos"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Produtos
            </Link>

            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/20 text-white text-sm font-medium">
              {produto.categoria}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6">{produto.nome}</h1>

            {produto.destaque && (
              <div className="inline-block px-3 py-1 rounded-full bg-secondary/80 text-white text-sm font-medium">
                Produto em Destaque
              </div>
            )}
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

      {/* Conteúdo do produto */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Galeria de imagens */}
          <div className="space-y-4">
            <div className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden">
              <Image src={selectedImage || "/placeholder.svg"} alt={produto.nome} fill className="object-cover" />
            </div>

            {produto.galeria && produto.galeria.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                <button
                  onClick={() => setSelectedImage(produto.imagem)}
                  className={`relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 ${
                    selectedImage === produto.imagem ? "ring-2 ring-secondary" : ""
                  }`}
                >
                  <Image src={produto.imagem || "/placeholder.svg"} alt={produto.nome} fill className="object-cover" />
                </button>

                {produto.galeria.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 ${
                      selectedImage === img ? "ring-2 ring-secondary" : ""
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${produto.nome} - imagem ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detalhes do produto */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">{produto.nome}</h2>
                <button
                  onClick={toggleFavorite}
                  className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(12 avaliações)</span>
              </div>

              <div className="text-3xl font-bold text-secondary mb-4">
                R$ {produto.preco.toFixed(2).replace(".", ",")}
              </div>

              <p className="text-muted-foreground mb-6">{produto.descricao}</p>
            </div>

            {/* Opções de tamanho */}
            {produto.tamanhos && produto.tamanhos.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium">Tamanho</h3>
                <div className="flex flex-wrap gap-2">
                  {produto.tamanhos.map((tamanho) => (
                    <button
                      key={tamanho}
                      onClick={() => setTamanhoSelecionado(tamanho)}
                      className={`px-4 py-2 rounded-md border ${
                        tamanhoSelecionado === tamanho
                          ? "border-secondary bg-secondary/10 text-secondary"
                          : "border-border text-muted-foreground hover:border-secondary/50"
                      }`}
                    >
                      {tamanho}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Opções de cor */}
            {produto.cores && produto.cores.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium">Cor</h3>
                <div className="flex flex-wrap gap-2">
                  {produto.cores.map((cor) => (
                    <button
                      key={cor}
                      onClick={() => setCorSelecionada(cor)}
                      className={`px-4 py-2 rounded-md border ${
                        corSelecionada === cor
                          ? "border-secondary bg-secondary/10 text-secondary"
                          : "border-border text-muted-foreground hover:border-secondary/50"
                      }`}
                    >
                      {cor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantidade */}
            <div className="space-y-3">
              <h3 className="font-medium">Quantidade</h3>
              <div className="flex items-center">
                <button
                  onClick={decrementarQuantidade}
                  className="w-10 h-10 rounded-l-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  disabled={quantidade <= 1}
                >
                  -
                </button>
                <div className="w-16 h-10 border-t border-b border-border flex items-center justify-center">
                  {quantidade}
                </div>
                <button
                  onClick={incrementarQuantidade}
                  className="w-10 h-10 rounded-r-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  disabled={produto.estoque ? quantidade >= produto.estoque : false}
                >
                  +
                </button>

                {produto.estoque && (
                  <span className="ml-4 text-sm text-muted-foreground">{produto.estoque} unidades disponíveis</span>
                )}
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Button variant="default" size="lg" className="flex-2" onClick={adicionarAoCarrinho}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Adicionar ao Carrinho
              </Button>

              <Button variant="outline" size="lg">
                <Share2 className="mr-2 h-5 w-5" />
                Compartilhar
              </Button>
            </div>

            {/* Informações adicionais */}
            <div className="pt-6 space-y-4 border-t border-border">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <h4 className="font-medium">Entrega</h4>
                  <p className="text-sm text-muted-foreground">
                    Entrega em eventos da Atlética ou mediante combinação.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <h4 className="font-medium">Garantia</h4>
                  <p className="text-sm text-muted-foreground">Garantia de 30 dias contra defeitos de fabricação.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <h4 className="font-medium">Trocas e Devoluções</h4>
                  <p className="text-sm text-muted-foreground">Trocas em até 7 dias mediante avaliação.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição detalhada */}
        <div className="mt-16 border-t border-border pt-8">
          <h2 className="text-2xl font-bold mb-6">Detalhes do Produto</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-6">{produto.detalhes || produto.descricao}</p>

              {produto.material && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Material</h3>
                  <p className="text-muted-foreground">{produto.material}</p>
                </div>
              )}
            </div>

            <div className="bg-muted/30 dark:bg-muted/10 rounded-2xl p-6">
              <h3 className="font-bold mb-4">Informações do Produto</h3>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Categoria</span>
                  <span>{produto.categoria}</span>
                </div>

                {produto.material && (
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Material</span>
                    <span>{produto.material}</span>
                  </div>
                )}

                {produto.tamanhos && produto.tamanhos.length > 0 && (
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Tamanhos Disponíveis</span>
                    <span>{produto.tamanhos.join(", ")}</span>
                  </div>
                )}

                {produto.cores && produto.cores.length > 0 && (
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Cores Disponíveis</span>
                    <span>{produto.cores.join(", ")}</span>
                  </div>
                )}

                {produto.estoque !== undefined && (
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Disponibilidade</span>
                    <span>{produto.estoque > 0 ? `${produto.estoque} em estoque` : "Esgotado"}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos relacionados */}
      <section className="bg-muted/30 dark:bg-muted/10 py-16 mt-8 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Produtos Relacionados</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos
              .filter((p) => p.id !== produto.id && p.categoria === produto.categoria)
              .slice(0, 3)
              .map((produtoRelacionado, index) => (
                <Link
                  key={produtoRelacionado.id}
                  href={`/produtos/${produtoRelacionado.id}`}
                  className="bg-card rounded-xl overflow-hidden shadow-md hover-lift"
                >
                  <div className="relative h-48">
                    <Image
                      src={produtoRelacionado.imagem || "/placeholder.svg"}
                      alt={produtoRelacionado.nome}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-1 rounded-full">
                      {produtoRelacionado.categoria}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{produtoRelacionado.nome}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{produtoRelacionado.descricao}</p>
                    <div className="font-bold text-secondary">
                      R$ {produtoRelacionado.preco.toFixed(2).replace(".", ",")}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
