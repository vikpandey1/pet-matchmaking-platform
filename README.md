# PetMatch - Pet Matchmaking Platform

PetMatch is a Tinder-like web application for pet owners, helping them find compatible companions for their furry friends. This application includes features for pet management, health tracking, and matchmaking.

## Features

- **Pet Profiles**: Create and manage pet profiles with breed, age, and preferences
- **Matchmaking**: Swipe right/left to find matches for your pets
- **Health Dashboard**: Track your pet's health metrics and get recommendations
- **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/pet-match.git
cd pet-match
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment on Vercel

The easiest way to deploy this application is using Vercel:

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install the Vercel CLI:
```bash
npm install -g vercel
```

3. Run the following command in the project directory:
```bash
vercel
```

4. Follow the prompts to connect your GitHub repository and deploy

## Project Structure

```
/app                     # Next.js App Router pages
  /dashboard             # Dashboard pages
  /pets                  # Pet management pages
  /matches               # Matchmaking pages
  /health                # Health tracking pages
  layout.tsx             # Root layout
  page.tsx               # Home page
/components              # Reusable components
/public                  # Static assets
```

## Development Roadmap

- [ ] User authentication with Supabase
- [ ] Real-time chat between matched pet owners
- [ ] AI-powered pet compatibility algorithm
- [ ] Integration with veterinary services
- [ ] Mobile app with React Native

## License

MIT License - see the LICENSE file for details

## Acknowledgments

- This project was created as a demonstration of Next.js and Tailwind CSS capabilities
- Pet icons provided by Emoji 