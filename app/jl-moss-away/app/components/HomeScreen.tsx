import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from './Button';

function HomeScreen() {
    const navigation = useNavigation();

    const navigateToCustomers = () => {
        navigation.navigate('Customers' as never);
    };

    const navigateToInvoices = () => {
        navigation.navigate('Invoices' as never);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Roof Cleaning Business</Text>
            <Text style={styles.subtitle}>Manage your customers and invoices</Text>

            <View style={styles.buttonContainer}>
                <Button
                    label="Customers"
                    theme="primary"
                    onPress={ () => navigation.navigate('Customers' as never)
                    }
                />
                <Button
                    label="Invoices"
                    onPress={navigateToInvoices}
                />
            </View>
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
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
    buttonContainer: {
        gap: 20,
    },
});

export default HomeScreen;