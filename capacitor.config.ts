
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.trackitall',
  appName: 'Track It All',
  webDir: 'dist',
  server: {
    // Using the specified Lovable app domain
    url: 'https://72fc86e8-f3f5-4392-b249-0e41880e71df.lovableproject.com?forceHideBadge=true', 
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
    },
  },
};

export default config;
