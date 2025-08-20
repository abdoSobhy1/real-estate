# Real Estate App Prototype

© 2025 Abdelrahman Sobhy

This project is for **test/evaluation purposes only**.  
No part of this project may be used, distributed, or sold commercially without written permission.

A modern, user-friendly real estate mobile application built with Expo React Native.
This app serves as a digital catalog of available properties, allowing potential buyers to browse listings, view details, and contact agents instantly.

## Features

### ✅ Implemented Features

- **🏠 Home Screen**: Scrollable property listings with pull-to-refresh support
- **💖 Favorites**: Persistent favorites using AsyncStorage
- **🔍 Search & Filter**: Real-time search by title/location and price range filtering
- **📱 Property Details**: Full property information with image carousel
- **📞 Contact Agent**: WhatsApp deep linking with pre-filled messages
- **📱 Responsive UI**: Optimized for both Android and iOS
- **⚡ Performance**: Smooth scrolling and fast navigation
- **🔄 Loading States**: Loading indicators and error handling
- **📍 Empty States**: User-friendly messages when no data is found

### 🎨 UI/UX Features

- Modern, clean design with intuitive navigation
- Bottom tab navigation (Home and Favorites)
- Property cards with images, prices, and key details
- Image carousels in property details
- Smooth transitions and animations
- Consistent color scheme and typography

### 🛠️ Technical Features

- **Framework**: Expo React Native (SDK 53)
- **Navigation**: Expo Router with file-based routing
- **State Management**: React hooks and context
- **Data Persistence**: AsyncStorage for favorites
- **Image Handling**: Expo Image with caching
- **Deep Linking**: WhatsApp integration
- **TypeScript**: Full type safety

## Setup and Installation

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on device)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd realEstate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on device or simulator**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android device/emulator
- `npm run ios` - Start on iOS device/simulator
- `npm run web` - Start web version
- `npm run lint` - Run ESLint

## Key Libraries Used

- **@expo/vector-icons** - Icon library
- **@react-native-async-storage/async-storage** - Local storage for favorites
- **react-native-reanimated-carousel** - Clean Animated Carousel for images
- **expo-image** - Optimized image component with caching
- **expo-router** - File-based navigation

## App Features in Detail

### Home Screen

- Grid layout of property cards
- Real-time search functionality
- Price range filtering (Low, Midiun, High)
- Pull-to-refresh support
- Loading and error states

### Property Details

- Full-width image carousel with indicators
- Detailed description
- Favorite toggle
- Contact agent via WhatsApp

### Favorites

- Persistent storage of favorite properties
- Same grid layout as home screen
- Empty state when no favorites
- Real-time updates when favorites change

### Search & Filter

- Real-time text search by property title and location
- Price range filter modal
- Clear search functionality
- Filter indicator on search bar

## Performance Optimizations

- Image caching with Expo Image
- FlatList for efficient rendering of large lists
- Memoized components and callbacks
- Optimized state management
- Lazy loading of property details

## Disclaimer

- All rights remain with the developer (Abdelrahman Sobhy).
- The app uses mock/sample data and does not represent real properties or clients.
- This project must not be reused or repurposed for commercial activities.

---
