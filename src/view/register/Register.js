import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";

export default function Register(props) {
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState({displayName:"",username:"",password:""})

    const registerUser =(account)=>{
        if(account.username ==="" && account.password ==="")
        {
            Alert.alert('Can nhap thong tin')
        }
        else
        {
            // setLoading(true);
            auth().createUserWithEmailAndPassword(account.username,account.password)
            .then( async (res)=>{
                res.user.updateProfile({
                    displayName: account.displayName
                })
                console.log("create success");
                await analytics().logEvent('registerSuccess', {
                        displayName : res.user.displayName,
                        username : res.user.email
                })
                props.navigation.navigate('LoginScreen',{account:account})
                setAccount({
                    displayName:"",
                    username:"",
                    password:""
                })
            })
            .catch((err)=>{
                console.log("error: ",err);
            })
        }
    }

    // console.log(account);

    return (
        <View style={{flex:1,justifyContent:'center',padding:20}}>
            <Text
            style={{fontSize:22,textDecorationStyle:'solid',textDecorationLine:'underline',textDecorationColor:'red',fontWeight:'bold'}}
            >Register</Text>
            <View>
            <TextInput 
                    style={{marginTop:5,height:40,fontSize:18,marginTop:10}}
                    placeholder="Name..."
                    value={account.displayName}
                    onChangeText={(displayName)=> setAccount({...account,displayName})}
                />
                <TextInput 
                    style={{marginTop:5,height:40,fontSize:18,marginTop:10}}
                    placeholder="Username..."
                    value={account.username}
                    onChangeText={(username)=> setAccount({...account,username})}
                />
                <TextInput 
                    style={{marginTop:5,height:40,fontSize:18,marginTop:10}}
                    placeholder="Password..."
                    value={account.password}
                    onChangeText={(password)=> setAccount({...account,password})}
                />

                <TouchableOpacity onPress={()=> registerUser(account)}>
                    <View style={{borderRadius:20,marginTop: 20, width: '100%', height: 40,justifyContent:'center', alignItems:'center',backgroundColor: 'lightblue'}}>
                        <Text style={{fontSize:18}}>Register</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
