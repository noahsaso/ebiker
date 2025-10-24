# 🚴‍♂️ eBiker - Citibike E-Bike Finder

Find Citibike e-bikes available near you in real-time.

## Features

- 📍 **Real-time Location**: Uses browser geolocation to find your current position
- 🔍 **Smart Filtering**: Filter stations by distance and minimum e-bikes available
- 📊 **Live Stats**: View total stations, e-bikes available, and nearest distance
- 🗺️ **Maps Integration**: Get directions or view stations on Google Maps
- ⚡ **Real-time Data**: Fetches live data from Citibike's GBFS API
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **GBFS API** - Real-time Citibike data

## Project Structure

```
ebiker/
├── app/                      # Next.js app directory
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── CitibikeEBikeFinder.tsx  # Main app component
│   ├── Controls.tsx         # Search controls and filters
│   ├── ErrorMessage.tsx     # Error display component
│   ├── Filters.tsx          # Distance and bike filters
│   ├── LoadingSpinner.tsx   # Loading state component
│   ├── LocationStatus.tsx   # Location status indicator
│   ├── NoResults.tsx        # No results message
│   ├── StationCard.tsx      # Station information card
│   └── Stats.tsx            # Statistics display
├── utils/                   # Utility functions
│   ├── citibike.ts         # Citibike API calls
│   ├── distance.ts         # Distance calculations
│   └── geolocation.ts      # Browser geolocation
└── types/                   # TypeScript types
    └── station.ts          # Station and location types
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Building for Production

```bash
# Build the app
pnpm build

# Start production server
pnpm start
```

## How It Works

1. **Location Detection**: The app requests your browser location using the Geolocation API
2. **Data Fetching**: Fetches station information and real-time status from Citibike's GBFS API
3. **Distance Calculation**: Uses the Haversine formula to calculate distances from your location
4. **Filtering**: Filters stations based on your selected distance and minimum e-bikes
5. **Display**: Shows up to 20 nearest stations with available e-bikes

## API

This app uses the [Citibike GBFS API](https://gbfs.lyft.com/gbfs/2.3/bkn/en/):

- `/station_information.json` - Static station information
- `/station_status.json` - Real-time availability data

## License

MIT
