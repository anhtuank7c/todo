import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import Styles from '../constants/Styles';
import { Button } from '../components';

@inject('store') @observer
class TodoEdit extends React.Component {
    constructor(props) {
        super(props);

        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        const { task } = this.props.navigation.state.params;
        this.state = {
            taskId: task.id,
            title: task.title
        }
    }

    static navigationOptions = {
        title: ({ state }) => `Edit ${state.params.task.title}`
    }

    onSave = () => {
        const { taskId, title } = this.state;
        this.props.store.updateTask(taskId, title);
        this.props.navigation.goBack();
    }

    onCancel = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={Styles.container}>
                <View style={Styles.form}>
                    <TextInput
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title })}
                        autoCapitalize="none"
                        autoFocus
                        autoCorrect={false}
                        style={Styles.textArea}
                        multiline
                    />
                    <View style={Styles.formGroup}>
                        <Button label='Save' onPress={this.onSave} style={Styles.btnSuccess} />
                        <Button label='Cancel' onPress={this.onCancel} style={Styles.btnDanger} />
                    </View>
                </View>
            </View>
        );
    }
}

export default TodoEdit;
