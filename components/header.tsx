"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { ThemeToggle } from "./theme-toggle"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"

const links = [
  { href: "/", label: "Home" },
  { href: "/produtos", label: "Produtos" },
  { href: "/eventos", label: "Eventos" },
  { href: "/integrantes", label: "Integrantes" },
]

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
    const handleScroll = () => setScrolled(window.scrollY > 10)
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
    <>
      <header
        className={cn(
          "sticky top-0 w-full z-50 transition-all duration-500",
          scrolled
            ? "bg-background/70 backdrop-blur-xl shadow-sm dark:bg-background/70 py-3"
            : "bg-background dark:bg-background py-5"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold tracking-tight flex items-center">
              <motion.img
                src="/logo-header.png"
                alt="Logo"
                className="h-8 mr-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Atlética S.I. - UniFOA
              </span>
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

              {/* Botão do menu mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>

              {/* Navegação desktop com bolinha */}
              <nav className="hidden md:flex space-x-4 ml-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-2 py-1 text-sm font-medium transition-colors"
                  >
                    {link.label}
                    {pathname === link.href && (
                      <motion.span
                        layoutId="active-dot"
                        className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
                      />
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile animado com framer-motion */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998]"
              onClick={toggleMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-background dark:bg-background border-l border-border z-[999] p-4"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Menu</span>
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  <X size={24} />
                </Button>
              </div>

              <nav className="flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={toggleMenu}
                    className={cn(
                      "text-base transition-colors",
                      pathname === link.href ? "font-semibold text-primary" : ""
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
