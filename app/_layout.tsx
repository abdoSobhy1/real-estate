import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../src/constants/theme";
import { FavoritesProvider } from "../src/context/FavoritesContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <StatusBar style="light" backgroundColor={theme.background} />
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: theme.background,
              },
            }}
          />
        </SafeAreaView>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
