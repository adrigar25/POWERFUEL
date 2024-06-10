import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es" >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta charSet="UTF-8"/>
        <meta name="description" content="Página de compra de productos online."/>
        <meta name="keywords" content="compra, producto, productos, online, ofertas"/>
        <meta name="author" content="Adrián García Torrente y Adrián Escribano Pérez"/>

      </Head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
