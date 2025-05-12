"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Clock, Mail, ChevronDown, ChevronUp, Users, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
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
}

// Lista de eventos
const eventos: Evento[] = [
  {
    id: 1,
    titulo: "Reçepção de Calouros 2025.2",
    data: "15/02/2025",
    horario: "19:00",
    local: "Pé Universitário",
    descricao:
      "A maior festa de integração dos calouros de Sistemas de Informação. Venha conhecer seus colegas de curso e se divertir!",
    imagem: "/calourada.png",
    categoria: "Festa",
    participantes: 150,
    detalhes:
      "A Festa de Integração é o evento mais aguardado do período! Com Venda de Bebidas no local e muita tinta nos calouros!",
    preco: 0,
  },
  {
    id: 2,
    titulo: "Campeonato de E-Sports",
    data: "10/04/2025",
    horario: "14:00",
    local: "Laboratório de Informática",
    descricao: "Competição de jogos eletrônicos entre os alunos de SI. Modalidades: League of Legends, CS:GO e FIFA.",
    imagem: "/e-sport.png",
    categoria: "Competição",
    participantes: 50,
    detalhes:
      "O Campeonato de E-Sports é aberto para todos os alunos do curso. As inscrições podem ser feitas em equipes ou individualmente, dependendo da modalidade. Haverá premiação para os primeiros colocados.",
    preco: 0,
  },
  {
    id: 3,
    titulo: "INTERFOA 2025.2",
    data: "20/05/2025",
    horario: "08:00",
    local: "Ginásio Poliesportivo",
    descricao: "Competição esportiva entre as atléticas da UNIFOA. Venha torcer pela unificada, ENFERNÃO SI!",
    imagem: "/interfoa.png",
    categoria: "Esporte",
    participantes: 200,
    detalhes:
      "Os Jogos Universitários reúnem diversas atléticas da região em uma competição amistosa. As modalidades incluem futsal, vôlei, basquete, handebol e atletismo. Venha torcer e mostrar sua energia!",
    preco: 0,
  },
  {
    id: 4,
    titulo: "Churrasco da Atlética",
    data: "12/06/2025",
    horario: "12:00",
    local: "Área de Lazer da FOA",
    descricao:
      "Churrasco de confraternização entre alunos, professores e ex-alunos do curso de Sistemas de Informação.",
    imagem: "/churrasco.png",
    categoria: "Confraternização",
    participantes: 100,
    detalhes:
      "O tradicional Churrasco da Atlética é um momento de descontração e integração entre alunos, professores e ex-alunos. O ingresso inclui comida e bebida à vontade. Traga sua alegria e disposição para se divertir!",
    preco: 35.0,
  },
]

// Categorias únicas
const categorias = ["Todos", ...new Set(eventos.map((evento) => evento.categoria))]

export default function EventosPage() {
  const [filtroCategoria, setFiltroCategoria] = useState("Todos")
  const [eventosFiltrados, setEventosFiltrados] = useState(eventos)
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null)
  const { addItem } = useCart()

  // Função para filtrar eventos
  const filtrarEventos = (categoria: string) => {
    if (categoria === "Todos") {
      setEventosFiltrados(eventos)
    } else {
      setEventosFiltrados(eventos.filter((evento) => evento.categoria === categoria))
    }
  }

  // Aplicar filtro quando categoria mudar
  const aplicarFiltro = (categoria: string) => {
    setFiltroCategoria(categoria)
    filtrarEventos(categoria)
  }

  // Toggle expanded event
  const toggleEventDetails = (id: number) => {
    if (expandedEventId === id) {
      setExpandedEventId(null)
    } else {
      setExpandedEventId(id)
    }
  }

  // Adicionar ingresso ao carrinho
  const adicionarIngressoAoCarrinho = (evento: Evento) => {
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

  return (
    <div>
      {/* Banner da página */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 to-secondary/90 dark:from-primary/30 dark:to-secondary/30 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-white/20 text-white text-sm font-medium">
              Agenda
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Eventos</h1>
            <p className="text-lg max-w-3xl mx-auto text-white/90">
              Confira os próximos eventos da Atlética SI - FOA e não perca nenhuma oportunidade de diversão e
              integração.
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

      {/* Filtros */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-2 mb-8">
          <Calendar className="h-5 w-5 text-muted-foreground mr-1 flex-shrink-0" />
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => aplicarFiltro(categoria)}
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

        {/* Lista de eventos */}
        <div className="space-y-12">
          <AnimatePresence>
            {eventosFiltrados.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col justify-center items-center h-[400px] text-center"
              >
                <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">Nenhum evento encontrado</h3>
                <p className="text-muted-foreground mb-6">Não encontramos eventos que correspondam aos seus filtros.</p>
                <Button variant="premium" onClick={() => aplicarFiltro("Todos")}>
                  Ver todos os eventos
                </Button>
              </motion.div>
            ) : (
              eventosFiltrados.map((evento, index) => (
                <EventCard
                  key={evento.id}
                  evento={evento}
                  index={index}
                  isExpanded={expandedEventId === evento.id}
                  toggleExpand={() => toggleEventDetails(evento.id)}
                  onAddToCart={() => adicionarIngressoAoCarrinho(evento)}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 dark:bg-muted/10 py-16 md:py-24 mt-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
              Sugestões
            </div>
            <h2 className="text-2xl font-bold mb-4 text-primary">Quer sugerir um evento?</h2>
            <p className="text-muted-foreground mb-8">
              Tem alguma ideia de evento para a Atlética SI - FOA? Entre em contato conosco e compartilhe sua sugestão!
            </p>
            <Button variant="premium" size="premium" asChild>
              <Link href="mailto:atleticasifoa@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Enviar Sugestão
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function EventCard({
  evento,
  index,
  isExpanded,
  toggleExpand,
  onAddToCart,
}: {
  evento: Evento
  index: number
  isExpanded: boolean
  toggleExpand: () => void
  onAddToCart: () => void
}) {
  const { toast } = useToast()
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-card text-card-foreground rounded-2xl shadow-md overflow-hidden hover-lift"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative h-64 md:h-auto overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
          <Image
            src={evento.imagem || "/placeholder.svg"}
            alt={evento.titulo}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-4 left-4 z-20">
            <div className="px-3 py-1 rounded-full bg-secondary text-white text-xs font-medium">{evento.categoria}</div>
          </div>
          {evento.participantes && (
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
              <Users className="h-3 w-3" />
              <span>{evento.participantes} participantes</span>
            </div>
          )}

          {evento.preco !== undefined && (
            <div className="absolute bottom-4 right-4 z-20 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold">
              {evento.preco > 0 ? `R$ ${evento.preco.toFixed(2).replace(".", ",")}` : "Gratuito"}
            </div>
          )}
        </div>
        <div className="p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary">{evento.titulo}</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar size={18} className="text-secondary" />
                <span>{evento.data}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock size={18} className="text-secondary" />
                <span>{evento.horario}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin size={18} className="text-secondary" />
                <span>{evento.local}</span>
              </div>
            </div>
            <p className="text-foreground/80">{evento.descricao}</p>

            <AnimatePresence>
              {isExpanded && evento.detalhes && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-border"
                >
                  <h4 className="font-bold mb-2">Detalhes do Evento</h4>
                  <p className="text-muted-foreground">{evento.detalhes}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <Button
              variant="premium"
              size="default"
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart()
                toast({
                  title: "Ingresso adicionado",
                  description: `Ingresso para ${evento.titulo} adicionado ao carrinho`,
                  duration: 3000,
                })
              }}
            >
              <Ticket className="mr-2 h-4 w-4" />
              Comprar Ingresso
            </Button>

            <Button variant="outline" size="default" asChild>
              <Link href={`/eventos/${evento.id}`}>Ver Detalhes</Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpand}
              className="ml-auto flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              {isExpanded ? (
                <>
                  <span>Menos detalhes</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Mais detalhes</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
