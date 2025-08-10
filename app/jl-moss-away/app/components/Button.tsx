import React from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
    label: string;
    theme?: 'primary' | 'secondary' | 'success' | 'danger';
    onPress: () => void;
    icon?: any;
    disabled?: boolean;
};

export default function Button({ label, theme = 'secondary', onPress, icon, disabled = false }: Props) {
    const getButtonStyle = () => {
        switch (theme) {
            case 'primary':
                return { backgroundColor: '#2c9200', borderColor: '#ffd33d' };
            case 'success':
                return { backgroundColor: '#28a745', borderColor: '#28a745' };
            case 'danger':
                return { backgroundColor: '#dc3545', borderColor: '#dc3545' };
            default:
                return { backgroundColor: '#6c757d', borderColor: '#6c757d' };
        }
    };

    const buttonStyle = getButtonStyle();

    return (
        <View style={styles.buttonContainer}>
            <Pressable
                style={[
                    styles.button,
                    { backgroundColor: buttonStyle.backgroundColor },
                    disabled && styles.disabled
                ]}
                onPress={disabled ? undefined : onPress}
                disabled={disabled}>
                {icon && (
                    <FontAwesome
                        name={icon}
                        size={18}
                        color="#fff"
                        style={styles.buttonIcon}
                    />
                )}
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 5,
    },
    button: {
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        minWidth: 120,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    disabled: {
        opacity: 0.5,
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});