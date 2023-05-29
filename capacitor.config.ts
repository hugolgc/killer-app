import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'killer-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
