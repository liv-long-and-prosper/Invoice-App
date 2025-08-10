import React from 'react';
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const Touchables = () => {
    const onPressButton = () => {
        Alert.alert('You tapped the button!');
    };

    const onLongPressButton = () => {
        Alert.alert('You long-pressed the button!');
    };

    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={onPressButton} underlayColor="white">
                <View style={styles.button}>
                    <Text style={styles.buttonText}>TouchableHighlight</Text>
                </View>
            </TouchableHighlight>
            <TouchableOpacity onPress={onPressButton}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>TouchableOpacity</Text>
                </View>
            </TouchableOpacity>
            <TouchableNativeFeedback
                onPress={onPressButton}
                background={
                    Platform.OS === 'android'
                        ? TouchableNativeFeedback.SelectableBackground()
                        : undefined
                }>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        TouchableNativeFeedback{' '}
                        {Platform.OS !== 'android' ? '(Android only)' : ''}
                    </Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableWithoutFeedback onPress={onPressButton}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableHighlight
                onPress={onPressButton}
                onLongPress={onLongPressButton}
                underlayColor="white">
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Touchable with Long Press</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        alignItems: 'center',
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2c9200',
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: '#000',
    },
});

export default Touchables;