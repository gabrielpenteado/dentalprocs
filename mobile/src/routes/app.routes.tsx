import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();


import { Home } from '../screens/Home';
import { New } from '../screens/New';
import { Procedure } from '../screens/Procedure';
import { Chart } from '../screens/Chart';

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="home"
        component={Home}
      />

      <Screen
        name="new"
        component={New}
      />

      <Screen
        name="chart"
        component={Chart}
      />

      <Screen
        name="procedure"
        component={Procedure}
      />

    </Navigator>
  );
}