import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import analytics from "@react-native-firebase/analytics";
import auth from '@react-native-firebase/auth';
import { clearUser } from "../../reducer/const/action";
import { useDispatch, useSelector } from 'react-redux';

export default function Home(props) {
    const dispatch = useDispatch()

    const [user, setUser] = useState()
    const userData = useSelector(state => state.AuthReducer.user)
    
    useEffect(() => {
        if(userData) setUser(userData)
    }, [userData])

    const logoutUser =()=>{
        auth().signOut()
        .then(async()=>{
            dispatch(clearUser())
            await analytics().logEvent('logoutSucces')
        })
        .catch((err)=>{

        })
    }

    // console.log("userHome: ",user)
    return (
        <View style={{flex:1,justifyContent:'center'}}>
            <Text style={{fontSize:22,textAlign:'center'}}>Home</Text>
            {
                user?.displayName ? <Text style={{fontSize:22,textAlign:'center'}}>{user.displayName},Welcome to Page</Text>
                : null
            }
            <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems:'center',marginHorizontal:20}}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('LoginScreen')}>
                <View style={{marginTop: 20, width: '100%', height: 40,justifyContent:'center', alignItems:'center',backgroundColor: 'lightblue',paddingHorizontal:20}}>
                    <Text style={{fontSize:18}}>Go to Login</Text>
                </View>
            </TouchableOpacity>
            

            <TouchableOpacity
            onPress={()=>logoutUser()}
            >
                <View style={{marginTop: 20, width: '100%', height: 40,justifyContent:'center', alignItems:'center',backgroundColor: 'lightblue',paddingHorizontal:20}}>
                    <Text style={{fontSize:18}}>LogOut</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={async () =>
                await analytics().logEvent('press', {
                    item: 'working'
                })
                }
            
            >
                <View style={{marginTop: 20, width: '100%', height: 40,justifyContent:'center', alignItems:'center',backgroundColor: 'lightblue',paddingHorizontal:20}}>
                    <Text style={{fontSize:18}}>Press</Text>
                </View>
            </TouchableOpacity>
            </View>
        </View>
    )
}
