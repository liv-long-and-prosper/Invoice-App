import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function InvoicesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Invoices</Text>
            <Text style={styles.subtitle}>Manage your invoices here</Text>
            {/* Add your invoice management features here */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});

export default InvoicesScreen;