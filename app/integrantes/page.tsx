"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Mail, Linkedin, Twitter, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Definindo o tipo para os integrantes
type Integrante = {
  id: number
  nome: string
  cargo: string
  curso: string
  imagem: string
  instagram?: string
  email?: string
  linkedin?: string
  twitter?: string
  bio?: string
  categoria: string
}

// Lista de integrantes
const integrantes: Integrante[] = [
  {
    id: 1,
    nome: "Guilherme Esperança",
    cargo: "Presidente",
    curso: "Sistemas de Informação",
    imagem: "/perfil-provisorio.png",
    instagram: "@inserir_instagram",
    email: "inserir_email@exemplo.com",
    linkedin: "inserir_linkedin",
    bio: "Estudante de Sistemas de Informação, apaixonado por tecnologia e gestão de equipes. Lidera a Atlética SI - FOA desde 202X.",
    categoria: "Diretor",
  },
  {
    id: 2,
    nome: "Matheus",
    cargo: "Vice-Presidente",
    curso: "Sistemas de Informação",
    imagem: "/perfil-provisorio.png",
    instagram: "@inserir_instagram",
    email: "inserir_email@exemplo.com",
    linkedin: "inserir_linkedin",
    bio: "Estudante de Sistemas de Informação com foco em desenvolvimento web. Auxilia na gestão da Atlética e coordena projetos especiais.",
    categoria: "Diretoria",
  },
  {
    id: 3,
    nome: "Paulo",
    cargo: "Tesoureiro",
    curso: "Sistemas de Informação",
    imagem: "/perfil-provisorio.png",
    instagram: "@inserir_instagram",
    email: "inserir_email@exemplo.com",
    linkedin: "inserir_linkedin",
    bio: "Responsável pelas finanças da Atlética, Paulo é estudante de SI com interesse em gestão financeira e análise de dados.",
    categoria: "Diretoria",
  },
  {
    id: 4,
    nome: "Luke",
    cargo: "Diretor de Esportes 1",
    curso: "Sistemas de Informação",
    imagem: "/perfil-provisorio.png",
    instagram: "@inserir_instagram",
    email: "inserir_email@exemplo.com",
    linkedin: "inserir_linkedin",
    bio: "Atleta e entusiasta de esportes, Pedro coordena todas as atividades esportivas da Atlética SI - FOA.",
    categoria: "Esportes",
  },
  {
    id: 5,
    nome: "Samuel Mageste",
    cargo: "Diretor de Esportes 2",
    curso: "Sistemas de Informação",
    imagem: "/perfil-provisorio.png",
    instagram: "@inserir_instagram",
    email: "inserir_email@exemplo.com",
    linkedin: "inserir_linkedin",
    bio: "Atleta e entusiasta de esportes, Pedro coordena todas as atividades esportivas da Atlética SI - FOA.",
    categoria: "Esportes",
  },
  {
    id: 6,
    nome: "Lucas",
    cargo: "Diretor de Eventos",
    curso: "Sistemas de Informação",
    imagem: "/perfil-provisorio.png",
    instagram: "@inserir_instagram",
    email: "inserir_email@exemplo.com",
    linkedin: "inserir_linkedin",
    bio: "Organiza e coordena todos os eventos da Atlética, desde festas até competições esportivas.",
    categoria: "Eventos",
  },
  {
    id: 7,
    nome: "Andrew ",
    cargo: "Diretor de Front-End",
    curso: "Sistemas de Informação",
    imagem: "/perfil-provisorio.png",
    instagram: "@inserir_instagram",
    email: "inserir_email@exemplo.com",
    linkedin: "inserir_linkedin",
    bio: "Responsável por liderar o front-end da Atlética, unindo design visual e desenvolvimento para criar interfaces impactantes e funcionais. Atua no desenvolvimento das páginas, na criação de artes e identidade visual, garantindo uma comunicação digital coerente, moderna e criativa.",
    categoria: "Diretoria",
  },
  {
    id: 8,
    nome: "David",
    cargo: "Diretor de Marketing",
    curso: "Sistemas de Informação",
    imagem: "/perfil-provisorio.png",
    instagram: "@inserir_instagram",
    email: "inserir_email@exemplo.com",
    linkedin: "inserir_linkedin",
    bio: "Responsável por planejar e executar as estratégias de comunicação e marketing da Atlética. Atua na divulgação de eventos, gerenciamento de redes sociais e fortalecimento da imagem da equipe dentro e fora da faculdade.",
    categoria: "Marketing",
  },
]

// Categorias únicas
const categorias = ["Todos", ...new Set(integrantes.map((integrante) => integrante.categoria))]

export default function IntegrantesPage() {
  const [filtroCategoria, setFiltroCategoria] = useState("Todos")
  const [integrantesFiltrados, setIntegrantesFiltrados] = useState(integrantes)
  const [integranteSelecionado, setIntegranteSelecionado] = useState<Integrante | null>(null)

  // Função para filtrar integrantes
  const filtrarIntegrantes = (categoria: string) => {
    if (categoria === "Todos") {
      setIntegrantesFiltrados(integrantes)
    } else {
      setIntegrantesFiltrados(integrantes.filter((integrante) => integrante.categoria === categoria))
    }
  }

  // Aplicar filtro quando categoria mudar
  const aplicarFiltro = (categoria: string) => {
    setFiltroCategoria(categoria)
    filtrarIntegrantes(categoria)
  }

  // Abrir modal de detalhes
  const abrirDetalhes = (integrante: Integrante) => {
    setIntegranteSelecionado(integrante)
    document.body.style.overflow = "hidden"
  }

  // Fechar modal de detalhes
  const fecharDetalhes = () => {
    setIntegranteSelecionado(null)
    document.body.style.overflow = "auto"
  }

  return (
    <div>
      {/* Banner da página */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 to-secondary/90 dark:from-primary/30 dark:to-secondary/30 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-white/20 text-white text-sm font-medium">
              Equipe
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Nossa Equipe</h1>
            <p className="text-lg max-w-3xl mx-auto text-white/90">
              Conheça os integrantes que fazem a Atlética SI - FOA acontecer.
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
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => aplicarFiltro(categoria)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${filtroCategoria === categoria
                ? "bg-secondary text-white"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Lista de integrantes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {integrantesFiltrados.map((integrante, index) => (
            <TeamMemberCard
              key={integrante.id}
              integrante={integrante}
              index={index}
              onClick={() => abrirDetalhes(integrante)}
            />
          ))}
        </div>
      </section>

      {/* Modal de detalhes */}
      {integranteSelecionado && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-card text-card-foreground rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <div className="h-48 md:h-64 relative">
                <Image
                  src={integranteSelecionado.imagem || "/placeholder.svg"}
                  alt={integranteSelecionado.nome}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <button
                onClick={fecharDetalhes}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-6">
                <div className="px-3 py-1 rounded-full bg-secondary text-white text-xs font-medium inline-block mb-2">
                  {integranteSelecionado.categoria}
                </div>
                <h2 className="text-2xl font-bold text-white">{integranteSelecionado.nome}</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-lg font-medium text-secondary">{integranteSelecionado.cargo}</div>
                <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                <div className="text-muted-foreground">{integranteSelecionado.curso}</div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Sobre</h3>
                <p className="text-muted-foreground">{integranteSelecionado.bio || "Sem biografia disponível."}</p>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="text-lg font-bold mb-3">Contato</h3>
                <div className="flex flex-wrap gap-3">
                  {integranteSelecionado.email && (
                    <Link
                      href={`mailto:${integranteSelecionado.email}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Mail className="h-4 w-4 text-secondary" />
                      <span className="text-sm">Email</span>
                    </Link>
                  )}
                  {integranteSelecionado.instagram && (
                    <Link
                      href={`https://instagram.com/${integranteSelecionado.instagram}`}
                      target="_blank"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Instagram className="h-4 w-4 text-secondary" />
                      <span className="text-sm">Instagram</span>
                    </Link>
                  )}
                  {integranteSelecionado.linkedin && (
                    <Link
                      href={`https://linkedin.com/in/${integranteSelecionado.linkedin}`}
                      target="_blank"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Linkedin className="h-4 w-4 text-secondary" />
                      <span className="text-sm">LinkedIn</span>
                    </Link>
                  )}
                  {integranteSelecionado.twitter && (
                    <Link
                      href={`https://twitter.com/${integranteSelecionado.twitter}`}
                      target="_blank"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Twitter className="h-4 w-4 text-secondary" />
                      <span className="text-sm">Twitter</span>
                    </Link>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button variant="ghost" onClick={fecharDetalhes}>
                  Fechar
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Informações adicionais */}
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
              Junte-se a nós
            </div>
            <h2 className="text-2xl font-bold mb-4 text-primary">Quer fazer parte da nossa equipe?</h2>
            <p className="text-muted-foreground mb-8">
              A Atlética SI - FOA está sempre aberta a novos talentos. Se você tem interesse em fazer parte da nossa
              equipe, entre em contato conosco!
            </p>
            <Button variant="premium" size="premium" asChild>
              <Link href="mailto:atleticasifoa@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Entre em Contato
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function TeamMemberCard({
  integrante,
  index,
  onClick,
}: {
  integrante: Integrante
  index: number
  onClick: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-card text-card-foreground rounded-2xl shadow-md overflow-hidden hover-lift group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={integrante.imagem || "/placeholder.svg"}
          alt={integrante.nome}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <div className="flex justify-between items-center">
              <div className="text-white text-sm font-medium">Ver perfil</div>
              <ChevronRight className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <div className="px-2 py-1 rounded-full bg-secondary/90 text-white text-xs">{integrante.categoria}</div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary">{integrante.nome}</h3>
        <p className="text-secondary font-medium mb-1">{integrante.cargo}</p>
        <p className="text-muted-foreground text-sm mb-4">{integrante.curso}</p>

        <div className="flex gap-3">
          {integrante.instagram && (
            <Link
              href={`https://instagram.com/${integrante.instagram}`}
              target="_blank"
              className="text-muted-foreground hover:text-secondary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Instagram size={18} />
              <span className="sr-only">Instagram de {integrante.nome}</span>
            </Link>
          )}
          {integrante.email && (
            <Link
              href={`mailto:${integrante.email}`}
              className="text-muted-foreground hover:text-secondary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail size={18} />
              <span className="sr-only">Email de {integrante.nome}</span>
            </Link>
          )}
          {integrante.linkedin && (
            <Link
              href={`https://linkedin.com/in/${integrante.linkedin}`}
              target="_blank"
              className="text-muted-foreground hover:text-secondary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin size={18} />
              <span className="sr-only">LinkedIn de {integrante.nome}</span>
            </Link>
          )}
          {integrante.twitter && (
            <Link
              href={`https://twitter.com/${integrante.twitter}`}
              target="_blank"
              className="text-muted-foreground hover:text-secondary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Twitter size={18} />
              <span className="sr-only">Twitter de {integrante.nome}</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}
