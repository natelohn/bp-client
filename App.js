import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/HomeScreen";
import WinnerScreen from "./src/screens/WinnerScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Winner: WinnerScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App"
    }
  }
);

export default createAppContainer(navigator);
