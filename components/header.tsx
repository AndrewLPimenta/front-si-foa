"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ChevronRight, ShoppingCart } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { Badge } from "./ui/badge"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { totalItems } = useCart()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = !isMenuOpen ? "hidden" : "auto"
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.body.style.overflow = "auto"
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
        document.body.style.overflow = "auto"
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMenuOpen])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/70 backdrop-blur-xl shadow-sm dark:bg-background/70 py-3"
          : "bg-background dark:bg-background py-5",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <img src="/logo-header.png" alt="Logo" className="h-8 mr-3" />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Atlética S.I. - UniFOA
              </span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/carrinho">
              <Button variant="ghost" size="icon" className="relative" aria-label="Carrinho de compras">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            <nav className="hidden md:flex space-x-1">
              <NavLink href="/" isActive={pathname === "/"}>Home</NavLink>
              <NavLink href="/produtos" isActive={pathname === "/produtos"}>Produtos</NavLink>
              <NavLink href="/eventos" isActive={pathname === "/eventos" || pathname.startsWith("/eventos/")}>Eventos</NavLink>
              <NavLink href="/integrantes" isActive={pathname === "/integrantes"}>Integrantes</NavLink>
              <NavLink href="/carrinho" isActive={pathname === "/carrinho"}>Carrinho</NavLink>
            </nav>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={toggleMenu}
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-background dark:bg-background border-l border-border z-50 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-border">
                  <span className="font-bold text-lg gradient-text">Menu</span>
                  <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Fechar menu">
                    <X size={24} />
                  </Button>
                </div>

                <nav className="flex-1 py-4">
                  <MobileNavLink href="/" onClick={toggleMenu} isActive={pathname === "/"}>Home</MobileNavLink>
                  <MobileNavLink href="/produtos" onClick={toggleMenu} isActive={pathname === "/produtos"}>Produtos</MobileNavLink>
                  <MobileNavLink href="/eventos" onClick={toggleMenu} isActive={pathname === "/eventos" || pathname.startsWith("/eventos/")}>Eventos</MobileNavLink>
                  <MobileNavLink href="/integrantes" onClick={toggleMenu} isActive={pathname === "/integrantes"}>Integrantes</MobileNavLink>
                  <MobileNavLink href="/carrinho" onClick={toggleMenu} isActive={pathname === "/carrinho"}>Carrinho</MobileNavLink>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

function NavLink({
  href,
  isActive,
  children,
}: {
  href: string
  isActive: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "text-primary underline underline-offset-4 decoration-2"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  isActive,
  onClick,
  children,
}: {
  href: string
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center px-4 py-3 text-sm font-medium border-b border-border transition-colors",
        isActive
          ? "text-primary bg-muted"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <ChevronRight className="h-4 w-4 mr-2" />
      {children}
    </Link>
  )
}
