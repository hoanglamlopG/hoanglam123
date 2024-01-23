import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import {findUser} from './../constants/data'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const navigation = useNavigation();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const handleLogin = async () =>{
        // 
       if(findUser(username, password) != null){
            await storeData(findUser(username, password));
            navigation.navigate('BottomTabNavigation')
       }else{
        alert('Không tìm thấy')
       }
    }
    

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('profile', JSON.stringify(value));
        } catch (e) {
          // saving error
          console.log(e);
        }
      };
  return (
    <View className="bg-white h-full w-full">
        <StatusBar style="light" />
        {/* <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} /> */}

        {/* lights */}
        <View className="flex-row justify-around w-full absolute">
            {/* <Animated.Image 
                entering={FadeInUp.delay(200).duration(1000).springify()} 
                source={require('../assets/images/light.png')} 
                className="h-[225] w-[90]" 
            />
            <Animated.Image 
                entering={FadeInUp.delay(400).duration(1000).springify()} 
                source={require('../assets/images/light.png')} 
                className="h-[160] w-[65] opacity-75" 
            /> */}
        </View>

        {/* title and form */}
        <View className="h-full w-full flex justify-around pt-40 pb-10">
            
            {/* title */}
            {/* <View className="flex items-center">
                <Animated.Text 
                    entering={FadeInUp.duration(1000).springify()} 
                    className="text-white font-bold tracking-wider text-5xl">
                        Login
                </Animated.Text>
            </View> */}

            {/* form */}
            <View className="flex items-center mx-5 space-y-4">
                <Animated.View 
                    entering={FadeInDown.duration(1000).springify()} 
                    className="bg-black/5 p-5 rounded-2xl w-full">

                    <TextInput
                        placeholder="Email"
                        value={username}
                        onChangeText={val=>setUsername(val)}
                        placeholderTextColor={'gray'}
                        style={{
                            padding:15,
                            backgroundColor:'white',
                            margin:20,
                        }}
                    />
                </Animated.View>
                <Animated.View 
                    entering={FadeInDown.delay(200).duration(1000).springify()} 
                    className="bg-black/5 p-5 rounded-2xl w-full mb-3">

                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={val=>setPassword(val)}
                        placeholderTextColor={'gray'}
                        style={{
                            padding:15,
                            backgroundColor:'white',
                            marginHorizontal:20,
                        }}
                        secureTextEntry
                    />
                </Animated.View>

                <Animated.View 
                    className="w-full" 
                    entering={FadeInDown.delay(400).duration(1000).springify()}>

                    <TouchableOpacity onPress={handleLogin}    style={{
                            padding:15,
                            backgroundColor:'yellow',
                            marginHorizontal:20,
                            marginTop:20,
                        }}>
                        <Text className="text-xl font-bold text-white text-center">Login</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                    entering={FadeInDown.delay(600).duration(1000).springify()} 
                    className="flex-row justify-center"
                    style={{flexDirection:'row',justifyContent:'center', margin:20}}
                    >

                    <Text>Bạn đã có tài khoản chưa? </Text>
                    <TouchableOpacity onPress={()=> navigation.push('Signup')}>
                        <Text className="text-sky-600" style={{color:'blue'}}>Đăng ký</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    </View>
  )
}