# PetTech Matchmaking Platform

A premium pet-tech SaaS platform for dog & cat matchmaking, health summaries, and vet/breeder consulting, with multiple organization roles, premium UX, and built-in monetization.

## Features

- 🐾 **Pet Matchmaking**: Tinder-style swipe interface for finding matches for your pets
- 🏥 **Health Summaries**: AI-powered analysis of pet health records and genetic data
- 📅 **Booking & Scheduling**: Calendar integration for playdates and vet appointments
- 💬 **Real-time Messaging**: Chat with other pet owners and professionals
- 💰 **Built-in Monetization**: Premium tiers, concierge services, and platform fees

## Tech Stack

- **Frontend**: Next.js with Framer Motion animations and Tailwind CSS
- **Backend**: Supabase (Auth, DB, Storage, Realtime)
- **AI**: OpenAI integration via Groq or OpenRouter
- **Payments**: Stripe + PayPal
- **Email**: Resend API

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Supabase account
- Stripe account
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pet-matchmaking-platform.git
   cd pet-matchmaking-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   # Fill in your API keys and configuration
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Key Components

- Tinder-like swipe interface for pet matching
- AI-powered health analysis
- Real-time messaging system
- Role-based access control
- Premium subscription management
- Secure payment processing

## Database Schema

The platform uses Supabase Postgres with the following main tables:

- `users`: User accounts with role-based permissions
- `organizations`: Vet clinics, breeders, and individual pet owners
- `pets`: Pet profiles with detailed attributes and health data
- `matches`: Connections between pets with match scores
- `appointments`: Scheduled events between pets/owners
- `messages`: Communication between users
- `transactions`: Payment records for platform services

All tables implement Row Level Security (RLS) for data protection.

## Deployment

This application can be deployed on any Node-compatible hosting platform:

- Railway
- Fly.io
- Render
- Heroku
- AWS/Azure/GCP

The platform is designed to avoid Vercel vendor lock-in.

## License

This project is licensed under the MIT License. See the LICENSE file for details. 