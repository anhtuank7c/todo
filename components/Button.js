import React, { PropTypes } from 'react';
import {
    TouchableOpacity,
    Text
} from 'react-native';
import Styles from '../constants/Styles';

const Button = ({ label, onPress, style }) => {
    return (
        <TouchableOpacity style={[Styles.btn, style]} onPress={onPress}>
            <Text style={{ color: '#fff' }}>{label}</Text>
        </TouchableOpacity>
    );
};
Button.propTypes = {
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object,
    ])
};
Button.defaultProps = {
    label: 'Button'
};

export { Button };
