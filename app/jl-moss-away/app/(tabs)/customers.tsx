import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { Stack, router } from 'expo-router';
import Button from '../components/Button';

type Customer = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
};

export default function CustomersPage() {
    const [customerList, setCustomerList] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);

    const handleAddCustomer = () => {
        router.push('/add-customer'); // Fixed path
    };

    // Function for when someone clicks on the customer name/row
    const handleCustomerPress = (customer: Customer) => {
        // TODO: Navigate to customer profile page
        console.log('Customer pressed:', customer.name);
        // Later this will be: router.push(`/customer-profile/${customer.id}`);
    };

// Function for when someone clicks on the phone number
    const handlePhonePress = (phoneNumber: string) => {
        // TODO: Show option to call this number
        console.log('Phone pressed:', phoneNumber);
        // Later this will open phone dialer or show call confirmation
    };

    const renderCustomerItem = ({ item }: { item: Customer }) => (
        <TouchableOpacity style={styles.customerRow} onPress={() => handleCustomerPress(item)}>
            <Text style={styles.customerName}>{item.name}</Text>
            <TouchableOpacity onPress={() => handlePhonePress(item.phone)}>
                <Text style={styles.customerPhone}>📞 {item.phone}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );


    useEffect(() => {
        setLoading(true);

        const fetchCustomers = async () => {
            try {
                const response = await fetch('http://localhost:8080/clients');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();

                const customers: Customer[] = jsonData.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    phone: item.phone,
                    address: item.address
                }));
                setCustomerList(customers);

            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers(); // Call the async function
    }, []);

    if (loading) {
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
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading customers...</Text>
                </View>
            </>
        );
    }

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

                <View style={styles.listContainer}>
                <FlatList
                    data={customerList}
                    renderItem={renderCustomerItem}
                    keyExtractor={(item) => item.id.toString()}
                />
                </View>
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>🏠 Customer features coming soon!:</Text>
                    <Text style={styles.feature}>• Search customers</Text>
                    <Text style={styles.feature}>• View customer invoices</Text>
                    <Text style={styles.feature}>• Customer profile</Text>
                </View>

                <Button
                    label="Add Customer"
                    theme="primary"
                    onPress={handleAddCustomer}
                    icon="plus"
                />
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
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#e0e0e0',
        width: '100%',
        maxWidth: 325,
        marginBottom: 30,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7eee0',
    },
    loadingText: {
        fontSize: 18,
        color: '#2c9200',
        fontWeight: '600',
    },
    customerRow: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    customerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        paddingLeft: 20,
    },
    customerPhone: {
        fontSize: 14,
        color: '#2c9200',
        fontWeight: '500',
        paddingRight: 20,
    },
    listContainer: {
        flex: 1,
        width: '100%',
        marginBottom: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
});