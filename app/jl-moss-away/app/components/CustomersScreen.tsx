import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from "@/app/components/Button";

function CustomersScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Customers</Text>
            <Text style={styles.subtitle}>Manage your customers here</Text>
            {/* Add your customer management features here */}
            <Button label={'add-customer'} onPress={alert}></Button>
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

export default CustomersScreen;