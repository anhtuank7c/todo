import { StackNavigator } from 'react-navigation';
import TodoList from '../screens/TodoList';
import TodoAdd from '../screens/TodoAdd';
import TodoEdit from '../screens/TodoEdit';

const RootNavigator = StackNavigator({
    List: {
        screen: TodoList
    },
    Add: {
        screen: TodoAdd
    },
    Edit: {
        screen: TodoEdit
    },
}, {
        mode: 'modal'
    });

export default RootNavigator;
