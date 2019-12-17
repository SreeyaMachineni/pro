import * as React from "react";
import { Image, StyleSheet, View,Text } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import { AppRegistry,  FlatList,  Alert, ActivityIndicator, Platform} from 'react-native';
import {AsyncStorage} from 'react-native';
import Button from "../components/Button";
class Claims extends React.Component {
     constructor(props){
            super(props);
            this.state={
                isLoading:true
            }
        }

//            componentDidMount() {
//                this.getUserData('user').then(
//                    (data)=>{
//                          return fetch('http://192.168.195.52:3000/userPackage/getUserPackages/'+this.state.id)
//                                .then((response) => response.json())
//                                .then((responseJson) => {
//                                  this.setState({
//                                    isLoading: false,
//                                    dataSource: responseJson
//                                  }, function() {
//                                       // console.log(responseJson)
//                                  });
//                                })
//                                .catch((error) => {
//                                  console.error(error);
//                                });
//                    }
//                )
//
//             }
//
//              async getUserData(key){
//                     try {
//                         const retrievedItem =  await AsyncStorage.getItem(key);
//                         this.state.id = JSON.parse(retrievedItem).id;
//                     } catch (error) {
//                      console.log(error.message);
//                     }
//                 }
//
//                  FlatListItemSeparator = () => {
//                          return (
//                            <View
//                              style={{
//                                height: 1,
//                                width: "100%",
//                                backgroundColor: "#607D8B",
//                              }}
//                            />
//                          );
//                        }


    render() {
//        if (this.state.isLoading) {
//             return (
//               <View style={{flex: 1, paddingTop: 20}}>
//                 <ActivityIndicator />
//               </View>
//             );
//           }
//
//           return (
//             <View>
//                    <FlatList
//                       data={ this.state.dataSource }
//                       ItemSeparatorComponent = {this.FlatListItemSeparator}
//                       renderItem={({item}) => <Text style={styles.FlatListItemStyle}  > {item.packageName} </Text>}
//                       keyExtractor={(item, index) => index}
//                    />
//                <Button
//                    label="Add Packages"
//                    onPress={() => this.props.navigation.navigate('AddOrEditPackage')}
//                 />
//
//             </View>
//             ) ;
//    }
return (
<View>
    <Text>Claims screen</Text>
</View>
)

}
}

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
    }
});

export default Claims;