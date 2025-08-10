import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function CustomersPage() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Customers',
                    headerStyle: { backgroundColor: '#2c9200' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
            <View style={styles.container}>
                <Text style={styles.title}>Customer Management</Text>
                <Text style={styles.subtitle}>Add, search, and manage your customers</Text>

                {/* Placeholder for future customer features */}
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>🏠 Customer features coming soon:</Text>
                    <Text style={styles.feature}>• Add new customers</Text>
                    <Text style={styles.feature}>• Search customers</Text>
                    <Text style={styles.feature}>• View customer invoices</Text>
                    <Text style={styles.feature}>• Customer contact info</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7eee0',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c9200',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
    placeholder: {
        backgroundColor: '#f7eee0',
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#e0e0e0',
        width: '100%',
        maxWidth: 300,
    },
    placeholderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
    },
    feature: {
        fontSize: 16,
        marginBottom: 8,
        color: '#666',
        paddingLeft: 10,
    },
});