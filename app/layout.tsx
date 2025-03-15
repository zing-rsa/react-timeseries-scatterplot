
import { DM_Sans } from 'next/font/google'
 
const dmSans = DM_Sans({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" className={dmSans.className}>
        <body>{children}</body>
      </html>
    )
  }