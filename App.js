import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/HomeScreen";
import EasyModeScreen from "./src/screens/EasyModeScreen";
import HardModeScreen from "./src/screens/HardModeScreen";


const navigator = createStackNavigator(
  {
      Home: HomeScreen,
      EasyMode: EasyModeScreen,
      HardMode: HardModeScreen
  },
  {
      initialRouteName: "Home",
      defaultNavigationOptions: {
          title: ""
      },
  }
);

export default createAppContainer(navigator);
