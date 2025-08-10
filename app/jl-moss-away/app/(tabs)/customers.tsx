import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Stack, router } from 'expo-router';
import Button from '../components/Button';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


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

    const handleDeleteCustomer = (customerId: number, customerName: string) => {
        Alert.alert(
            'Delete Customer',
            `Are you sure you want to delete ${customerName}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteCustomer(customerId)
                }
            ]
        );
    };

    const deleteCustomer = async (customerId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/clients/${customerId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete customer`);
            }

            // Remove from local state
            setCustomerList(prev => prev.filter(customer => customer.id !== customerId));

        } catch (error) {
            console.error('Error deleting customer:', error);
            Alert.alert('Error', 'Failed to delete customer. Please try again.');
        }
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

    const renderHiddenDelete = ({ item }: { item: Customer }) => (
        <View style={styles.hiddenItemContainer}>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteCustomer(item.id, item.name)}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    const fetchCustomers = useCallback(async () => {
        setLoading(true);
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
        } catch (error: unknown) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    useFocusEffect(
        useCallback(() => {
            fetchCustomers();
        }, [fetchCustomers])
    );

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
                    <SwipeListView
                        data={customerList}
                        renderItem={renderCustomerItem}
                        renderHiddenItem={renderHiddenDelete}
                        keyExtractor={(item) => item.id.toString()}
                        rightOpenValue={-80} // How far to swipe
                        disableRightSwipe={true} // Only allow left swipe
                        closeOnRowPress={true}
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
        marginVertical: .25,
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
    hiddenItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#f7eee0',
        paddingRight: 10,
    },
    deleteButton: {
        backgroundColor: '#ff3b30',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '90%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});