import Navbar from "./shared/navbar"
import { Provider } from "./components/Provider"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Good Deeds',
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Navbar/>
          {children}
        </Provider>
      </body>
    </html>
  )
}
