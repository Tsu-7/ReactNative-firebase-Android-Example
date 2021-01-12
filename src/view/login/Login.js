import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth';
import analytics from "@react-native-firebase/analytics";
import { useDispatch } from 'react-redux';
import { setUser } from '../../reducer/const/action';
import Loading from '../../component/Loading';
export default function Login(props) {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [account, setAccount] = useState({username:"",password:""})


    
    // login
    const loginUser=(account)=>{
        setLoading(true)
        auth()
        .signInWithEmailAndPassword(account.username, account.password)
        .then( async (res)=>{
            dispatch(setUser(res.user))
            await analytics().logEvent('loginSuccess', {
                item: res.user.email  
            })
            // setTimeout(() => {
            //     setLoading(false)
            // }, 3000)
            props.navigation.navigate("HomeScreen")
            setLoading(false)
        })
        .catch((err)=>{
            Alert.alert('sai thong tin dang nhap')
            console.log("err: ",err);
        })
    }
    
    return (
        <View style={{flex:1,justifyContent:'center',padding:20}}>
            {
            loading 
            ? 
            <Loading/>
            :
            <View>
            <Text 
            style={{fontSize:22,textDecorationStyle:'solid',textDecorationLine:'underline',textDecorationColor:'red',fontWeight:'bold'}}
            >Login</Text>
            <View>
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

                <Text 
                style={{marginTop:5,textDecorationColor:'blue',textDecorationLine:'underline',textDecorationStyle:'solid'}}
                onPress={()=> props.navigation.navigate("RegisterScreen")}>
                    go to Register
                </Text>

                <TouchableOpacity onPress={()=>loginUser(account)}>
                    <View style={{borderRadius:20,marginTop: 20, width: '100%', height: 40,justifyContent:'center', alignItems:'center',backgroundColor: 'lightblue'}}>
                        <Text style={{fontSize:18}}>Login</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
            }
        </View>
    )
}
