import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

type Invoice = {
    id: number;
    client_id: number;
    job_description: string;
    payment_terms: string;
    subtotal: number;
    total_amount: number;
    invoice_date: string;
    client_name?: string;
    is_paid: boolean;
    paid_date?: string;
};

export default function InvoicesPage() {
    const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchInvoices = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/invoices');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
            setInvoiceList(jsonData);
        } catch (error: unknown) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchInvoices();
        }, [fetchInvoices])
    );

    const renderInvoiceItem = ({ item }: { item: Invoice }) => (
        <View style={styles.invoiceRow}>
            <View style={styles.invoiceInfo}>
                <Text style={styles.invoiceId}>Invoice #{item.id}</Text>
                <Text style={styles.jobDescription} numberOfLines={1}>
                    {item.job_description || 'No description'}
                </Text>
                <Text style={styles.invoiceDate}>
                    {new Date(item.invoice_date).toLocaleDateString()}
                </Text>
            </View>
            <View style={styles.invoiceDetails}>
                <Text style={styles.amount}>${item.total_amount?.toFixed(2) || '0.00'}</Text>

                {item.is_paid ? (
                    <View style={styles.paidContainer}>
                        <Text style={styles.paidText}>✓ PAID</Text>
                        {item.paid_date && (
                            <Text style={styles.paidDate}>
                                {new Date(item.paid_date).toLocaleDateString()}
                            </Text>
                        )}
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.markPaidButton}
                        onPress={() => markInvoiceAsPaid(item.id)}
                    >
                        <Text style={styles.markPaidText}>Mark Paid</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    const markInvoiceAsPaid = async (invoiceId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/invoices/${invoiceId}/mark-paid`, {
                method: 'PUT',
            });

            if (!response.ok) {
                throw new Error(`Failed to mark invoice as paid`);
            }

            // Refresh the invoice list
            fetchInvoices();

        } catch (error) {
            console.error('Error marking invoice as paid:', error);
            alert('Failed to mark invoice as paid. Please try again.');
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Invoices',
                    headerStyle: { backgroundColor: '#2c9200' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
            <View style={styles.container}>
                <Text style={styles.title}>Invoice Management</Text>
                <Text style={styles.subtitle}>Create, search, and manage your invoices</Text>

                {/* Invoice List */}
                {loading ? (
                    <Text style={styles.loadingText}>Loading invoices...</Text>
                ) : (
                    <View style={styles.listContainer}>
                        <Text style={styles.listTitle}>Recent Invoices ({invoiceList.length})</Text>
                        {invoiceList.length > 0 ? (
                            <FlatList
                                data={invoiceList}
                                renderItem={renderInvoiceItem}
                                keyExtractor={(item) => item.id.toString()}
                                style={styles.list}
                                showsVerticalScrollIndicator={false}
                            />
                        ) : (
                            <Text style={styles.emptyText}>No invoices found</Text>
                        )}
                    </View>
                )}

                {/* Placeholder for future invoice features */}
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>📄 Invoice features coming soon:</Text>
                    <Text style={styles.feature}>• Generate invoices</Text>
                    <Text style={styles.feature}>• Search invoices</Text>
                    <Text style={styles.feature}>• Export to PDF</Text>
                    <Text style={styles.feature}>• Mark as paid</Text>
                    <Text style={styles.feature}>• Invoice templates</Text>
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
        marginBottom: 20,
        textAlign: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#2c9200',
        textAlign: 'center',
        marginVertical: 20,
    },
    listContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#e0e0e0',
        marginBottom: 20,
        maxHeight: 300,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    list: {
        paddingHorizontal: 15,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        padding: 20,
    },
    invoiceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    invoiceInfo: {
        flex: 1,
        marginRight: 10,
    },
    invoiceId: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    jobDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    invoiceDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    invoiceDetails: {
        alignItems: 'flex-end',
    },
    amount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c9200',
    },
    paymentTerms: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
        maxWidth: 100,
    },
    placeholder: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#e0e0e0',
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
    paidContainer: {
        alignItems: 'flex-end',
    },
    paidText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#28a745',
        backgroundColor: '#d4edda',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    paidDate: {
        fontSize: 10,
        color: '#666',
        marginTop: 2,
    },
    markPaidButton: {
        backgroundColor: '#2c9200',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        marginTop: 4,
    },
    markPaidText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
});