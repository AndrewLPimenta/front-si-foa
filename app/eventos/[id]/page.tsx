"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, Users, ArrowLeft, Share2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

// Definindo o tipo para os eventos
type Evento = {
  id: number
  titulo: string
  data: string
  horario: string
  local: string
  descricao: string
  imagem: string
  categoria: string
  participantes?: number
  detalhes?: string
  preco?: number
  galeria?: string[]
  organizador?: string
  contato?: string
}

// Lista de eventos
const eventos: Evento[] = [
  {
    id: 1,
    titulo: "Festa de Integração 2025",
    data: "15/03/2025",
    horario: "22:00",
    local: "Clube Universitário",
    descricao:
      "A maior festa de integração dos calouros de Sistemas de Informação. Venha conhecer seus colegas de curso e se divertir!",
    imagem: "/placeholder.svg?height=400&width=600",
    categoria: "Festa",
    participantes: 150,
    detalhes:
      "A Festa de Integração é o evento mais aguardado do ano! Com open bar, DJ's convidados e muitas surpresas. Traje: Esporte fino. Não é permitida a entrada de menores de 18 anos.",
    preco: 45.0,
    galeria: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    organizador: "Diretoria de Eventos da Atlética SI - FOA",
    contato: "eventos@atleticasifoa.com",
  },
  {
    id: 2,
    titulo: "Campeonato de E-Sports",
    data: "10/04/2025",
    horario: "14:00",
    local: "Laboratório de Informática",
    descricao: "Competição de jogos eletrônicos entre os alunos de SI. Modalidades: League of Legends, CS:GO e FIFA.",
    imagem: "/placeholder.svg?height=400&width=600",
    categoria: "Competição",
    participantes: 50,
    detalhes:
      "O Campeonato de E-Sports é aberto para todos os alunos do curso. As inscrições podem ser feitas em equipes ou individualmente, dependendo da modalidade. Haverá premiação para os primeiros colocados.",
    preco: 20.0,
    galeria: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    organizador: "Diretoria de Esportes da Atlética SI - FOA",
    contato: "esportes@atleticasifoa.com",
  },
  {
    id: 3,
    titulo: "Jogos Universitários 2025",
    data: "20/05/2025",
    horario: "08:00",
    local: "Ginásio Poliesportivo",
    descricao: "Competição esportiva entre as atléticas da região. Venha torcer pela Atlética SI - FOA!",
    imagem: "/placeholder.svg?height=400&width=600",
    categoria: "Esporte",
    participantes: 200,
    detalhes:
      "Os Jogos Universitários reúnem diversas atléticas da região em uma competição amistosa. As modalidades incluem futsal, vôlei, basquete, handebol e atletismo. Venha torcer e mostrar sua energia!",
    preco: 15.0,
    galeria: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    organizador: "Diretoria de Esportes da Atlética SI - FOA",
    contato: "esportes@atleticasifoa.com",
  },
  {
    id: 4,
    titulo: "Churrasco da Atlética",
    data: "12/06/2025",
    horario: "12:00",
    local: "Área de Lazer da FOA",
    descricao:
      "Churrasco de confraternização entre alunos, professores e ex-alunos do curso de Sistemas de Informação.",
    imagem: "/placeholder.svg?height=400&width=600",
    categoria: "Confraternização",
    participantes: 100,
    detalhes:
      "O tradicional Churrasco da Atlética é um momento de descontração e integração entre alunos, professores e ex-alunos. O ingresso inclui comida e bebida à vontade. Traga sua alegria e disposição para se divertir!",
    preco: 35.0,
    galeria: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    organizador: "Diretoria Social da Atlética SI - FOA",
    contato: "social@atleticasifoa.com",
  },
]

export default function EventoDetalhePage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [evento, setEvento] = useState<Evento | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState("")

  useEffect(() => {
    // Simular carregamento
    setLoading(true)

    // Buscar evento pelo ID
    const id = Number(params.id)
    const eventoEncontrado = eventos.find((e) => e.id === id)

    if (eventoEncontrado) {
      setEvento(eventoEncontrado)
      setSelectedImage(eventoEncontrado.imagem)
    } else {
      // Redirecionar para a página de eventos se não encontrar
      router.push("/eventos")
    }

    setLoading(false)
  }, [params.id, router])

  const adicionarIngressoAoCarrinho = () => {
    if (!evento) return

    addItem({
      id: `ticket-${evento.id}`,
      name: `Ingresso: ${evento.titulo}`,
      price: evento.preco || 0,
      quantity: 1,
      image: evento.imagem,
      type: "ticket",
      eventDate: `${evento.data} às ${evento.horario}`,
    })
  }

  if (loading || !evento) {
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
      {/* Banner do evento */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 to-secondary/90 dark:from-primary/30 dark:to-secondary/30 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              href="/eventos"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Eventos
            </Link>

            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/20 text-white text-sm font-medium">
              {evento.categoria}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6">{evento.titulo}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center gap-3 text-white/90">
                <Calendar size={20} className="text-white" />
                <span>{evento.data}</span>
              </div>

              <div className="flex items-center gap-3 text-white/90">
                <Clock size={20} className="text-white" />
                <span>{evento.horario}</span>
              </div>

              <div className="flex items-center gap-3 text-white/90">
                <MapPin size={20} className="text-white" />
                <span>{evento.local}</span>
              </div>
            </div>

            {evento.participantes && (
              <div className="flex items-center gap-2 text-white/90">
                <Users className="h-5 w-5" />
                <span>{evento.participantes} participantes confirmados</span>
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

      {/* Conteúdo do evento */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Galeria de imagens */}
            <div className="space-y-4">
              <div className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden">
                <Image src={selectedImage || "/placeholder.svg"} alt={evento.titulo} fill className="object-cover" />
              </div>

              {evento.galeria && evento.galeria.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                  <button
                    onClick={() => setSelectedImage(evento.imagem)}
                    className={`relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 ${
                      selectedImage === evento.imagem ? "ring-2 ring-secondary" : ""
                    }`}
                  >
                    <Image
                      src={evento.imagem || "/placeholder.svg"}
                      alt={evento.titulo}
                      fill
                      className="object-cover"
                    />
                  </button>

                  {evento.galeria.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 ${
                        selectedImage === img ? "ring-2 ring-secondary" : ""
                      }`}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${evento.titulo} - imagem ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Descrição do evento */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Sobre o Evento</h2>
                <p className="text-muted-foreground leading-relaxed">{evento.descricao}</p>
              </div>

              {evento.detalhes && (
                <div>
                  <h3 className="text-xl font-bold mb-3">Detalhes</h3>
                  <p className="text-muted-foreground leading-relaxed">{evento.detalhes}</p>
                </div>
              )}

              {evento.organizador && (
                <div>
                  <h3 className="text-xl font-bold mb-3">Organização</h3>
                  <p className="text-muted-foreground">{evento.organizador}</p>
                  {evento.contato && (
                    <p className="text-muted-foreground">
                      Contato:{" "}
                      <a href={`mailto:${evento.contato}`} className="text-secondary hover:underline">
                        {evento.contato}
                      </a>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Card de ingresso */}
          <div>
            <div className="bg-card rounded-2xl shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Ingresso</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Preço</span>
                  <span className="text-xl font-bold">
                    R$ {evento.preco?.toFixed(2).replace(".", ",") || "Gratuito"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Data</span>
                  <span>{evento.data}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Horário</span>
                  <span>{evento.horario}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Local</span>
                  <span>{evento.local}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="premium" size="lg" className="w-full" onClick={adicionarIngressoAoCarrinho}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Comprar Ingresso
                </Button>

                <Button variant="outline" size="lg" className="w-full">
                  <Share2 className="mr-2 h-5 w-5" />
                  Compartilhar
                </Button>
              </div>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>Ao comprar, você concorda com os termos e condições do evento.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eventos relacionados */}
      <section className="bg-muted/30 dark:bg-muted/10 py-16 mt-8 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Outros Eventos</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos
              .filter((e) => e.id !== evento.id)
              .slice(0, 3)
              .map((eventoRelacionado) => (
                <Link
                  key={eventoRelacionado.id}
                  href={`/eventos/${eventoRelacionado.id}`}
                  className="bg-card rounded-xl overflow-hidden shadow-md hover-lift"
                >
                  <div className="relative h-48">
                    <Image
                      src={eventoRelacionado.imagem || "/placeholder.svg"}
                      alt={eventoRelacionado.titulo}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-1 rounded-full">
                      {eventoRelacionado.categoria}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{eventoRelacionado.titulo}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {eventoRelacionado.data}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {eventoRelacionado.local}
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
