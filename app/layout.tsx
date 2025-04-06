import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: 'PetTech - Premium Pet Matchmaking & Health Platform',
  description: 'Premium pet-tech SaaS platform for dog & cat matchmaking, health summaries, and vet/breeder consulting',
  keywords: 'pet, dog, cat, matchmaking, health, vet, breeder, SaaS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="bg-neutral-50">
        {children}
      </body>
    </html>
  );
} 