import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Alert
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import Styles from '../constants/Styles';
import { Button, RowItem } from '../components';

@inject('store') @observer
class TodoList extends React.Component {
    static navigationOptions = {
        title: 'List Task',
        header: (navigation) => ({
            backTitle: null,
            right: <Button label='Add' onPress={() => navigation.navigate('Add')} style={{ backgroundColor: 'grey', marginRight: 10 }} />
        })
    }

    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
    }

    componentWillMount() {
        this.props.store.fetchTodos();
    }

    get dataSource() {
        const { todos } = this.props.store;
        const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return dataSource.cloneWithRows(todos.slice());
    }

    renderRow = (task) => {
        return (
            <RowItem
                item={task}
                onPress={() => this.props.navigation.navigate('Edit', { task })}
                onLongPress={() => Alert.alert(null, task.title, [
                    { text: 'Cancel' },
                    {
                        text: !task.completed ? 'Close Task' : 'Reopen Task',
                        onPress: () => this.props.store.markTaskAs(task.id, task.completed),
                        style: {
                            color: 'green'
                        }
                    },
                ], {
                        cancelable: true
                    })}
            />
        );
    }

    render() {
        if (this.props.store.todos.length === 0) {
            return (
                <View style={Styles.emptyContainer}>
                    <Text style={Styles.emptyText}>EMPTY TASK</Text>
                </View>
            );
        }
        return (
            <View style={Styles.container}>
                <ListView
                    enableEmptySections
                    pageSize={12}
                    pagingEnabled
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={Styles.separator} />}
                    renderFooter={() => <View style={Styles.footer}><Text style={Styles.footerText}>THE END</Text></View>}
                />
            </View>
        );
    }
}

export default TodoList;
