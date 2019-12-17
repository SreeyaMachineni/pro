//import * as React from 'react';
//import { Button, View, Text } from 'react-native';
//import { createAppContainer } from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';
//import Home from './screens/Home';
//import Welcome from './screens/Welcome';
//import Contact from './screens/Contact';
//import Packages from './screens/Packages';
//import AddOrEditPackage from './screens/AddOrEditPackage';
//
//const RootStack = createStackNavigator(
//  {
//    Home: {screen:Home,navigationOptions:{header:null}},
//    Welcome:Welcome,
//    Contact:Contact,
//    Packages:Packages,
//    AddOrEditPackage:AddOrEditPackage
//  },
//  {
//    initialRouteParams: 'Home',
//  }
//);
//
//const AppContainer = createAppContainer(RootStack);
//
//export default class App extends React.Component {
//  render() {
//    return <AppContainer />;
//  }
//}

import * as React from 'react';
import { Button, View, Text,TouchableOpacity,Platform,ImageBackground } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from './screens/Home';
import Packages from './screens/Packages';
import Contact from './screens/Contact';
import Claims from './screens/Claims';
import Welcome from './screens/Welcome';
import Register from './screens/Registration';



class HomeScreen extends React.Component {
//  static navigationOptions = ({ navigation }) => {
//    return {
//      gesturesEnabled: false,
//      title: "News Feed",
//      headerLeft: null,
//      headerTitleStyle: { color: '#FFFFFF' },
//      headerStyle: { backgroundColor: "#00D8A2" },
//      headerLeft:(
//          <View style={Platform.OS == 'ios' ? { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' } : { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//            <View style={{ width: 12 }}>
//            </View>
//
//            <TouchableOpacity activeOpacity={0.5} style={{ flex: 1, width: 54, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
//              onPress={() => {
//                  console.log(navigation);
//                  navigation.openDrawer()
//                  GLOBAL.DRAWER_OPEN = true
//              }}>
//              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', width: 60 }}>
//                <ImageBackground
//                  style={Platform.OS == 'ios' ? {
//                    flex: 1,
//                    marginTop: 10,
//                    marginLeft: 12,
//                    marginRight: 10,
//                    padding: 10,
//                    height: 25,
//                    width: 23,
//                    justifyContent: 'center',
//                    alignContent: 'center'
//                  } : {
//                    flex: 1,
//                    padding: 10,
//                    marginTop: 15,
//                    height: 24,
//                    width: 24,
//                    marginLeft: 12,
//                    justifyContent: 'center',
//                    alignContent: 'center'
//                  }}
//                  source={require('./assets/images/hamburgerIcon.png')}
//                >
//                </ImageBackground>
//              </View>
//            </TouchableOpacity>
//          </View>
//        )
//    };
//  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title="Go to Details" onPress={() => this.props.navigation.navigate('Details')}/>
      </View>
    );
  }
}



class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button title="Go to Details... again" onPress={() => this.props.navigation.push('Details')}/>
        <Button title="Go to Home" onPress={() => this.props.navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}



class DrawerScreen extends React.Component {
  static navigationOptions = {
    title: 'Drawer Screen',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Package Screen</Text>
      </View>
    );
  }
}

const myStackNavigator = createStackNavigator(
  {
    HomeScreen: {
        screen: Home,
        navigationOptions: {
            header:null,
            drawerLabel: 'Home',
            drawerIcon :()=>null,
            // drawerLockMode: 'locked-closed'
             },
    },
  }
);

const myStackNavigator1 = createStackNavigator(
  {
    PackageScreen: {screen: Packages},
  }
);

const myStackNavigator2 = createStackNavigator(
  {
    ContactScreen: {screen: Contact},
  }
);

const myStackNavigator3 = createStackNavigator(
  {
    ClaimScreen: {screen: Claims},
  }
);

const MyDrawerNavigator = createDrawerNavigator({
  HomeScreen:  { screen: myStackNavigator  ,navigationOptions: {
    header:null,
    drawerLabel: 'Home',
    drawerIcon :()=>null,
    // drawerLockMode: 'locked-closed'
     },
   },



   PackageScreen:  { screen: myStackNavigator1  ,navigationOptions: {
     header:null,
     drawerLabel: 'Packages',
     drawerIcon :()=>null,
      },
    },
    ContactScreen:  { screen: myStackNavigator2  ,navigationOptions: {
     header:null,
     drawerLabel: 'Contact',
     drawerIcon :()=>null,
      },
    },
    ClaimsScreen:  { screen: myStackNavigator3  ,navigationOptions: {
     header:null,
     drawerLabel: 'Claims',
     drawerIcon :()=>null,
      },
    }
},
{
  drawerPosition: 'left'
   // contentComponent: DrawerScreen
});

const AppNavigator = createStackNavigator(
  {
     HomeScreen: {screen: MyDrawerNavigator,navigationOptions: {header:null}},
     Details: {screen: DetailsScreen},
     Welcome:Welcome,
     Register:Register
    // Menu:HomeScreen,
  },
  {
    initialRouteName: 'HomeScreen',
  }
);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
//export default createAppContainer(AppNavigator);