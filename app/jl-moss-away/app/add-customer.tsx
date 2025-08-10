import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Button from './components/Button';

export default function AddCustomer() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const handleSaveCustomer = () => {


        // TODO: Save customer to database
        console.log('Saving customer:', {
            firstName,
            lastName,
            phone,
            email,
            streetAddress,
            city,
            state,
            zipCode
        });
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'New Customer',
                    headerStyle: { backgroundColor: '#2c9200' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
            <ScrollView style={styles.container}>
                {/* Custom back button at top of content */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.inlineBackButton}
                >
                    <FontAwesome name="chevron-left" size={20} color="#2c9200" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>

                <View style={styles.formContainer}>
                    <Text style={styles.title}>Add New Customer</Text>

                    {/* First Name & Last Name Row */}
                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>First Name</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="First Name"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Last Name</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Last Name"
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>
                    </View>

                    {/* Phone & Email Row */}
                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Phone Number"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                        </View>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Street Address Full Width */}
                    <View style={styles.fullInput}>
                        <Text style={styles.label}>Street Address</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Street Address"
                            value={streetAddress}
                            onChangeText={setStreetAddress}
                        />
                    </View>

                    {/* City, State, Zip Row */}
                    <View style={styles.row}>
                        <View style={styles.cityInput}>
                            <Text style={styles.label}>City</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="City"
                                value={city}
                                onChangeText={setCity}
                            />
                        </View>
                        <View style={styles.stateInput}>
                            <Text style={styles.label}>State</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="State"
                                value={state}
                                onChangeText={setState}
                                maxLength={2}
                                autoCapitalize="characters"
                            />
                        </View>
                        <View style={styles.zipInput}>
                            <Text style={styles.label}>Zip Code</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Zip Code"
                                value={zipCode}
                                onChangeText={setZipCode}
                                keyboardType="numeric"
                                maxLength={5}
                            />
                        </View>
                    </View>

                    {/* Save Button */}
                    <View style={styles.buttonContainer}>
                        <Button
                            label="Save Customer"
                            theme="primary"
                            onPress={handleSaveCustomer}
                            icon="save"
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7eee0',
    },
    formContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c9200',
        textAlign: 'center',
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 15,
    },
    halfInput: {
        flex: 1,
    },
    fullInput: {
        marginBottom: 20,
    },
    cityInput: {
        flex: 2,
    },
    stateInput: {
        flex: 1,
    },
    zipInput: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    textInput: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    backButton: {
        padding: 8,
        marginLeft: 10,
        borderRadius: 5,
    },
    inlineBackButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#f7eee0',
        marginHorizontal: 20,
        marginTop: 75,
    },
    backText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#2c9200',
        fontWeight: '600',
    },
});