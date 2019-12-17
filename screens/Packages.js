import * as React from "react";

import { Image, StyleSheet, View,Text } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import { AppRegistry,  FlatList,  Alert, ActivityIndicator, Platform,ScrollView} from 'react-native';
import { Icon } from 'react-native-elements'
import {AsyncStorage} from 'react-native';
import Button from "../components/Button";

class Packages extends React.Component{
     constructor(props){
            super(props);
            this.state={
                isLoading:true
            }
        }

            componentDidMount() {
                this.getUserData('user').then(
                    (data)=>{
                          return fetch('http://192.168.195.52:3000/userPackage/getUserPackages/'+this.state.id)
                                .then((response) => response.json())
                                .then((responseJson) => {
                                  this.setState({
                                    isLoading: false,
                                    dataSource: responseJson
                                  }, function() {
                                       // console.log(responseJson)
                                  });
                                })
                                .catch((error) => {
                                  console.error(error);
                                });
                    }
                )

             }

              async getUserData(key){
                     try {
                         const retrievedItem =  await AsyncStorage.getItem(key);
                         this.state.id = JSON.parse(retrievedItem).id;
                     } catch (error) {
                      console.log(error.message);
                     }
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


                        renderPackage(pack) {

                            return (
                            //  <Text style={styles.FlatListItemStyle}>{pack.packageName}</Text>
                            <ScrollView>
                            <View style = {styles.listItemContainer}>
                            	<View style = {styles.callerDetailsContainer}>
                            		<View style={styles.callerDetailsContainerWrap}>
                            			<View style={styles.nameContainer}>
                            			<Text>{pack.packageName}</Text>
                            				<View style={styles.dateContainer}>
                            					<Text style={{ fontWeight:'400', color:'#666', fontSize:12 }}> Active till:{pack.activeTo}</Text>
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


    render(){
        if (this.state.isLoading) {
             return (
               <View style={{flex: 1, paddingTop: 20}}>
                 <ActivityIndicator />
               </View>
             );
           }

           return (
             <View>


                    <FlatList
                       data={ this.state.dataSource }
                       ItemSeparatorComponent = {this.FlatListItemSeparator}
                       renderItem={
                            ({item}) => {
                                //<Text style={styles.FlatListItemStyle}> {item.packageName} </Text>
                               return this.renderPackage(item);
                            }
                       }
                       keyExtractor={(item, index) => index}
                    />
<View style={styles.fixedView}>

                          </View>



                <Button
                    label="Add Packages"
                    onPress={() => this.props.navigation.navigate('AddOrEditPackage')}
                 />

             </View>
             ) ;
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

export default Packages;