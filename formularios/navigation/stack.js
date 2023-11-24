import { createStackNavigator } from '@react-navigation/stack';
import Main from 'formularios/Main';
import CensoForm from 'formularios/censoForm';

const Stack = createStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="censoForm" component={CensoForm} />
  </Stack.Navigator>
  );
}