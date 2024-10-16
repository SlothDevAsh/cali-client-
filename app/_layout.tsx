import config from "@/config/swr.config";
import { SocketProvider } from "@/services/socket";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SWRConfig } from "swr";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SWRConfig value={config}>
      <SocketProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="job-details" />
        </Stack>
      </SocketProvider>
    </SWRConfig>
  );
}
