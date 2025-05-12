"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Calendar, Users, ArrowRight, Star } from "lucide-react"
import { useRef } from "react"

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 dark:from-primary/10 dark:via-background dark:to-secondary/10 py-20 md:py-28 lg:py-32">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-secondary/30 to-accent/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={0}
              className="text-center lg:text-left"
            >
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                Bem-vindo à Atlética SI - FOA
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                A união do <span className="gradient-text">esporte</span>,{" "}
                <span className="gradient-text">amizade</span> e <span className="gradient-text">conhecimento</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Junte-se à Atlética de Sistemas de Informação da FOA e faça parte de uma comunidade vibrante e cheia de
                energia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="premium" size="premium" asChild>
                  <Link href="/produtos">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Nossos Produtos
                  </Link>
                </Button>
                <Button variant="premium-outline" size="premium" asChild>
                  <Link href="/eventos">
                    <Calendar className="mr-2 h-5 w-5" />
                    Eventos
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                <Image
                  src="/foa.jpg"
                  alt="Atlética SI - FOA"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating badges - Only show on larger screens */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 glass p-4 rounded-xl shadow-lg animate-float hidden sm:flex"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Próximo Evento</div>
                    <div className="text-xs text-muted-foreground">15 de Março</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -top-6 -right-6 glass p-4 rounded-xl shadow-lg animate-float animation-delay-200 hidden sm:flex"
              >
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <div className="text-sm font-medium">Avaliações</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-16 lg:mt-24"
          >
            <StatCard number="10+" label="Anos de História" />
            <StatCard number="500+" label="Alunos Impactados" />
            <StatCard number="20+" label="Eventos por Ano" />
            <StatCard number="15+" label="Produtos Exclusivos" />
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

      {/* Sobre a Atlética */}
      <section ref={targetRef} className="container mx-auto px-4 py-20 md:py-28 lg:py-32 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div style={{ opacity, y }} className="order-2 md:order-1">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/Escudo 1.png"
                alt="Atlética SI - FOA"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* Overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="glass rounded-xl p-4 backdrop-blur-md max-w-xs mx-auto md:mx-0">
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold mb-2">Nossa Missão</h3>
                    <p className="text-sm text-foreground/80">
                      Promover a integração dos alunos através de atividades esportivas e culturais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ opacity, scale }} className="order-1 md:order-2">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
              Sobre Nós
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 leading-tight">
              Conheça a <span className="gradient-text">Atlética SI - FOA</span>
            </h2>
            <p className="text-base sm:text-lg mb-6 text-muted-foreground leading-relaxed">
              A Atlética SI - FOA é a associação atlética acadêmica do curso de Sistemas de Informação da UNIFOA.
            </p>
            <p className="text-base sm:text-lg mb-8 text-muted-foreground leading-relaxed">
              Nossa missão é promover a integração dos alunos através de atividades esportivas, eventos sociais e
              culturais, fortalecendo o espírito universitário e criando memórias inesquecíveis durante a graduação.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">10+</div>
                <div className="text-muted-foreground">Anos de tradição</div>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">20+</div>
                <div className="text-muted-foreground">Eventos realizados</div>
              </div>
            </div>

            <Button variant="premium" size="premium" asChild>
              <Link href="/integrantes">
                <Users className="mr-2 h-5 w-5" />
                Conheça Nossa Equipe
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Destaques */}
      <section className="bg-muted/30 dark:bg-muted/10 py-20 md:py-28 lg:py-32 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
              Destaques
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
              O que a <span className="gradient-text">Atlética SI - FOA</span> oferece
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto text-muted-foreground">
              Conheça o que a Atlética SI - FOA tem a oferecer para você
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <FeatureCard
              image="produtos--oficiais.png"
              title="Produtos Oficiais"
              description="Conheça nossa linha de produtos oficiais e represente a Atlética SI - FOA com estilo."
              link="/produtos"
              linkText="Ver produtos"
              delay={0}
              icon={<ShoppingBag className="h-5 w-5" />}
            />

            <FeatureCard
              image="/eventos.png"
              title="Próximos Eventos"
              description="Fique por dentro dos próximos eventos e não perca nenhuma festa ou competição."
              link="/eventos"
              linkText="Ver eventos"
              delay={0.1}
              icon={<Calendar className="h-5 w-5" />}
            />

            <FeatureCard
              image="/time.png"
              title="Nossa Equipe"
              description="Conheça os integrantes que fazem a Atlética SI - FOA acontecer."
              link="/integrantes"
              linkText="Ver integrantes"
              delay={0.2}
              icon={<Users className="h-5 w-5" />}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20 md:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
            Depoimentos
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
            O que nossos <span className="gradient-text">membros</span> dizem
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-muted-foreground">
            Veja o que os alunos e ex-alunos falam sobre a Atlética SI - FOA
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="A Atlética SI - FOA mudou minha experiência universitária. "
            name="Ana Silva"
            role="Aluna de SI"
            image="/usuario.png"
            delay={0}
          />
          <TestimonialCard
            quote="A recepção feita pela Atlética é incrível! Não perco nenhuma."
            name="Carlos Oliveira"
            role="Ex-aluno"
            image="/usuario.png"
            delay={0.1}
          />
          <TestimonialCard
            quote="Fazer parte da diretoria da Atlética foi uma experiência sem igual."
            name="Mariana Santos"
            role="Ex-diretora"
            image="/usuario.png"
            delay={0.2}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent opacity-90 dark:opacity-80"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white">Faça parte da nossa história!</h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 text-white/90">
            Participe dos nossos eventos, adquira nossos produtos e junte-se à família Atlética SI - FOA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="premium-dark" size="premium" asChild>
              <Link href="/produtos">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Comprar Produtos
              </Link>
            </Button>
            <Button
              variant="premium-outline"
              size="premium"
              asChild
              className="border-white text-white hover:bg-white/10 hover:border-white/80"
            >
              <Link href="/eventos">
                <Calendar className="mr-2 h-5 w-5" />
                Ver Eventos
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

function FeatureCard({
  image,
  title,
  description,
  link,
  linkText,
  delay,
  icon,
}: {
  image: string
  title: string
  description: string
  link: string
  linkText: string
  delay: number
  icon: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-card text-card-foreground rounded-2xl shadow-md overflow-hidden hover-lift group"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=200&width=400"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/70 p-2 rounded-full">{icon}</div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link
          href={link}
          className="inline-flex items-center text-secondary font-medium hover:text-secondary/80 transition-colors group"
        >
          {linkText}{" "}
          <ArrowRight className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="glass p-4 sm:p-6 rounded-2xl text-center">
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2">{number}</div>
      <div className="text-muted-foreground text-xs sm:text-sm md:text-base">{label}</div>
    </div>
  )
}

function TestimonialCard({
  quote,
  name,
  role,
  image,
  delay,
}: {
  quote: string
  name: string
  role: string
  image: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-card text-card-foreground rounded-2xl shadow-md p-6 gradient-border hover-lift"
    >
      <div className="mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="inline-block h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
        ))}
      </div>
      <p className="text-muted-foreground mb-6 italic text-sm sm:text-base">"{quote}"</p>
      <div className="flex items-center">
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-4">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div>
          <div className="font-medium text-sm sm:text-base">{name}</div>
          <div className="text-xs sm:text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
    </motion.div>
  )
}
