import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏠 JL Moss Away</Text>
            <Text style={styles.subtitle}>Welcome James!</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Use the tabs below to navigate:</Text>
                <Text style={styles.tabInfo}>👥 Customers - Manage your clients</Text>
                <Text style={styles.tabInfo}>📄 Invoices - Handle billing</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7eee0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#2c9200',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#e0e0e0',
        width: '100%',
        maxWidth: 300,
    },
    infoText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
    },
    tabInfo: {
        fontSize: 16,
        marginBottom: 8,
        color: '#666',
        textAlign: 'center',
    },
});