import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LaunchScreen from './src/screens/LaunchScreen'
import HomeScreen from "./src/screens/HomeScreen";
import EasyModeScreen from "./src/screens/EasyModeScreen";
import HardModeScreen from "./src/screens/HardModeScreen";


const navigator = createStackNavigator(
  {
      Launch: LaunchScreen,
      Home: HomeScreen,
      EasyMode: EasyModeScreen,
      HardMode: HardModeScreen
  },
  {
      initialRouteName: "Launch",
      defaultNavigationOptions: {
          title: ""
      },
  }
);

export default createAppContainer(navigator);
