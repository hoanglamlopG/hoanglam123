import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {

  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    getData()
  }, [])
  

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('profile');
      setProfile(JSON.parse(jsonValue))
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  const clearProfile = async (value) => {
    try {
      await AsyncStorage.setItem('profile', "");
      setProfile(null)
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button title='Đăng nhập' onPress={()=>{
        navigation.navigate('Login')
      }} />
      {
        profile ? <Text>{profile?.username}</Text> : <Text>Chưa đăng  nhập</Text>
      }
      <Button title='Đăng xuất' onPress={()=>{
        clearProfile()
      }} />
     
    </View>
  )
}

export default Profile