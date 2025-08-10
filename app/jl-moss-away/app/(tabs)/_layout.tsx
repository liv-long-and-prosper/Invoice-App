import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#2c9200',
                tabBarInactiveTintColor: '#666',
                headerStyle: {
                    backgroundColor: '#2c9200',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={24} name="home" color={color} />
                    ),
                    headerTitle: 'Welcome James!',
                }}
            />
            <Tabs.Screen
                name="customers"
                options={{
                    title: 'Customers',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={24} name="users" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="invoices"
                options={{
                    title: 'Invoices',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={24} name="file-text-o" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}