# 🚴‍♂️ eBiker - Citibike E-Bike Finder

Find Citibike e-bikes available near you in real-time.

## Features

- 📍 **Auto-Loading**: Automatically searches for nearby e-bikes on page load if location permission was previously granted
- 🔍 **Smart Filtering**: Filter stations by distance (0.5-10 miles) and minimum e-bikes available (defaults to 3)
- 📊 **Live Stats**: View total stations, e-bikes available, and nearest distance
- 🗺️ **Inline Map View**: Toggle inline Google Maps for each station with one click
- 🧭 **Walking Directions**: Get turn-by-turn directions in Google Maps
- 📏 **Smart Distance Display**: Shows distance in feet for nearby stations (<0.3 mi), miles for farther ones
- ⚡ **Real-time Data**: Fetches live data from Citibike's GBFS API
- 📱 **Mobile Responsive**: Optimized for mobile with viewport-aware map sizing
- 🎨 **Modern UI**: Beautiful gradient design with inline Tailwind CSS and smooth animations

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
│   ├── globals.css          # Tailwind imports and theme config
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

1. **Auto-Load**: On page load, the app automatically requests your location if permissions were previously granted
2. **Location Detection**: Uses the browser Geolocation API to find your current position
3. **Data Fetching**: Fetches station information and real-time status from Citibike's GBFS API
4. **Distance Calculation**: Uses the Haversine formula to calculate distances from your location
5. **Smart Display**: Shows distances in feet (<0.3 mi) or miles, making it easy to gauge proximity
6. **Filtering**: Filters stations based on your selected distance and minimum e-bikes (default: 3)
7. **Results**: Displays up to 20 nearest stations with available e-bikes, sorted by distance
8. **Interactive Maps**: Click "View Map" to see each station's location in an inline embedded map

## API

This app uses the [Citibike GBFS API](https://gbfs.lyft.com/gbfs/2.3/bkn/en/):

- `/station_information.json` - Static station information
- `/station_status.json` - Real-time availability data

## License

MIT
