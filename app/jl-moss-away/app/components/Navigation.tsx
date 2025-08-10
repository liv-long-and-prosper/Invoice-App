import * as React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import CustomersScreen from './CustomersScreen';
import InvoicesScreen from './InvoicesScreen';

const RootStack = createNativeStackNavigator({
    screens: {
        Home: {
            screen: HomeScreen,
            options: {title: 'Welcome James!'},
        },
        Customers: {
            screen: CustomersScreen,
            options: {title: 'Customers Page'}
        },
        Invoices: {
            screen: InvoicesScreen,
            options: {title: 'Invoices Page'}
        },
    },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation;