import * as React from "react";
import { Image, StyleSheet, View,Text,ScrollView } from "react-native";
import imageLogo from "../assets/images/logo.jpg";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import {AsyncStorage} from 'react-native';
import { AppRegistry,  FlatList,  Alert, ActivityIndicator, Platform} from 'react-native';
import { TouchableOpacity,ImageBackground } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements'


import Home from './Home';
import Packages from './Packages';
import Contact from './Contact';
import Claims from './Claims';


class Welcome extends React.Component{

      static navigationOptions = ({ navigation }) => {
        return {
          gesturesEnabled: false,
          title: "Active Claims",
          headerLeft: null,
          headerTitleStyle: { color: '#FFFFFF' },
          headerStyle: { backgroundColor: "#e6005c" },
          headerLeft:(
              <View style={Platform.OS == 'ios' ? { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' } : { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 12 }}>
                </View>

                <TouchableOpacity activeOpacity={0.5} style={{ flex: 1, width: 54, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => {
                      console.log(navigation);
                      navigation.openDrawer()
                      GLOBAL.DRAWER_OPEN = true
                  }}>
                  <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', width: 60 }}>
                    <ImageBackground
                      style={Platform.OS == 'ios' ? {
                        flex: 1,
                        marginTop: 10,
                        marginLeft: 12,
                        marginRight: 10,
                        padding: 10,
                        height: 25,
                        width: 23,
                        justifyContent: 'center',
                        alignContent: 'center'
                      } : {
                        flex: 1,
                        padding: 10,
                        marginTop: 15,
                        height: 24,
                        width: 24,
                        marginLeft: 12,
                        justifyContent: 'center',
                        alignContent: 'center'
                      }}
                      source={require('../assets/images/hamburgerIcon.png')}
                    >
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              </View>
            )
        };
      };

    constructor(props){
        super(props);
            this.state={
                isLoading:true
            }
    }

    componentDidMount() {
        this.getUserData('user').then(
            (data)=>{
                return fetch('http://192.168.195.52:3000/userClaims/getUserClaims/'+this.state.id)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson
                    }, function() {
                    //  console.log(responseJson)
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        )
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                height: 1,
                width: "100%",
                backgroundColor: "#607D8B",
                }}
            />
        );
    }

    async getUserData(key){
        try {
            const retrievedItem =  await AsyncStorage.getItem(key);
            this.state.id = JSON.parse(retrievedItem).id;
        } catch (error) {
            console.log(error.message);
        }
    }

    renderClaim(claim) {
        return (
        <ScrollView>
            <View style = {styles.listItemContainer}>
                <View style = {styles.callerDetailsContainer}>
                    <View style={styles.callerDetailsContainerWrap}>
                        <View style={styles.nameContainer}>
                            <Text>{claim.packageName}</Text>
                            <View style={styles.nameContainer}>

                                <Text style={{ fontWeight:'400', color:'#666', fontSize:12 }}> Purpose:{claim.disease}</Text>
                            </View>
                        </View>
                        <View style={styles.callIconContainer}>
                            <Icon name="info" color='#075e54' size={23} style={{ padding:5 }} />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
        )
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.MainContainer}>
                <FlatList
                    data={ this.state.dataSource }
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    renderItem={({item}) => {
                        return this.renderClaim(item);
                    }
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}


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
//      HomeScreen:  { screen: myStackNavigator  ,navigationOptions: {
//        header:null,
//        drawerLabel: 'Home',
//        drawerIcon :()=>null,
//        // drawerLockMode: 'locked-closed'
//         },
//       },



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


const styles = StyleSheet.create({
    logoContainer:{
        alignItems:'center'
    },
    logo: {
        width:120,
        height:120,
    },
    form: {
        flex: 1,
        justifyContent: "center",
        alignItems:'center'
    },
    backgroundContainer:{
        flex:2,
        width:null,
        height:null,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F5FCFF'
    },
    cont:{
        flex:1,
        backgroundColor:'white',
        justifyContent: "center",
        alignItems:'center'
    },
    cont1:{
        flex:2,
        backgroundColor:'white',
        justifyContent: "center",
        alignItems:'center'
    },
     listItemContainer: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            padding: 10
          },

            callerDetailsContainer: {
            flex: 4,
            justifyContent: "center",
            borderBottomColor: "rgba(92,94,94,0.5)",
       //     borderBottomWidth: 0.25
          },
          callerDetailsContainerWrap: {
            flex: 1,
            alignItems: "center",
            flexDirection: "row"
          },
            nameContainer: {
            alignItems: "flex-start",
            flex: 1
          },
            dateContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          },
          callIconContainer: {
            flex: 1,
            alignItems: "flex-end"
          },
          fixedView : {
            position: 'absolute',
            left: 0,
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }
});

export default Welcome

