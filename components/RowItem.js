import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Styles from '../constants/Styles';

const RowItem = ({ item, onPress, onLongPress, style }) => {
    return (
        <TouchableOpacity
            onLongPress={onLongPress}
            onPress={onPress}
            style={[Styles.row, style]}
        >
            <Ionicons
                name={item.completed ? 'ios-close-circle-outline' : 'ios-checkmark-circle-outline'}
                size={32}
                style={[Styles.rowIcon, item.completed ? Styles.rowCompleted : Styles.rowIncompleted]} />
            <Text
                style={[Styles.rowText, item.completed ? Styles.rowTextCompleted : Styles.rowTextIncompleted]}
            >
                {item.title}
            </Text>
        </TouchableOpacity>
    );
};
RowItem.propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    style: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object,
    ]),
};

export { RowItem };
