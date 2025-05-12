import type React from "react"
import Link from "next/link"
import { Instagram, Mail, Phone, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

export default function Footer() {
  return (
    <footer className="bg-muted/30 dark:bg-muted/10 text-foreground pt-16 pb-8 border-t border-border relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-secondary/30 to-accent/10"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5 space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Atlética SI - FOA
              </h3>
              <div className="h-1 w-16 bg-gradient-to-r from-secondary to-accent rounded-full"></div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A Atlética de Sistemas de Informação da UniFOA, promovendo integração,
              esporte e cultura para todos os alunos.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com/atleticasifoa"
                target="_blank"
                className="w-10 h-10 rounded-full bg-muted/50 dark:bg-muted/30 flex items-center justify-center text-foreground/70 hover:text-secondary hover:bg-muted/80 transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="mailto:atleticasifoa@gmail.com"
                className="w-10 h-10 rounded-full bg-muted/50 dark:bg-muted/30 flex items-center justify-center text-foreground/70 hover:text-secondary hover:bg-muted/80 transition-colors"
              >
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </Link>
              <Link
                href="tel:+5518999999999"
                className="w-10 h-10 rounded-full bg-muted/50 dark:bg-muted/30 flex items-center justify-center text-foreground/70 hover:text-secondary hover:bg-muted/80 transition-colors"
              >
                <Phone size={20} />
                <span className="sr-only">Telefone</span>
              </Link>
            </div>
          </div>

          <div className="md:col-span-3 space-y-6">
            <h3 className="text-lg font-bold">Links Rápidos</h3>
            <ul className="space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/produtos">Produtos</FooterLink>
              <FooterLink href="/eventos">Eventos</FooterLink>
              <FooterLink href="/integrantes">Integrantes</FooterLink>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-6">
            <h3 className="text-lg font-bold">Newsletter</h3>
            <p className="text-muted-foreground">
              Inscreva-se para receber novidades sobre eventos, produtos e muito mais!
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Seu email"
                className="px-4 py-2 rounded-full bg-background border border-border focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-all"
              />
              <Button variant="premium" size="default" className="rounded-full whitespace-nowrap">
                Inscrever
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              Ao se inscrever, você concorda com nossa política de privacidade.
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Atlética SI - FOA. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="/privacidade" className="hover:text-foreground transition-colors">
              Privacidade
            </Link>
            <Link href="/termos" className="hover:text-foreground transition-colors">
              Termos de Uso
            </Link>
            <Link href="/contato" className="hover:text-foreground transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-muted-foreground hover:text-foreground transition-colors flex items-center group"
      >
        <ChevronRight
          size={16}
          className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"
        />
        <span>{children}</span>
      </Link>
    </li>
  )
}
