import HeaderPages from "./components/HeaderPages"
import FooterPages from "./components/FooterPages"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <HeaderPages />
        <main>{children}</main>
        <FooterPages />
      </body>
    </html>
  )
}