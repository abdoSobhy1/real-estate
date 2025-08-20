import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "@/src/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tabBarActive,
        tabBarInactiveTintColor: theme.tabBarInactive,
        tabBarStyle: {
          height: 60,
          backgroundColor: theme.tabBarBackground,
          borderTopColor: theme.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
