import { View, Text, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Cart() {

  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    getData();

  }, [])

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('cart');
      const apiURL = "http://192.168.1.91/apiReact/api.php";
      fetch(apiURL)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
      console.log(value);
      if (value !== null) {
        // value previously stored
        setCart(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.setItem('cart', '');
      setCart([]);
    } catch (e) {
      // handle error saving value
    }
  };

  return (
    <View>
      {
        cart.map((item, index) => (
          <View key={index} style={{ borderBottomWidth: 1 }}>
            <Text key={index}>Name: {item.name}</Text>
            <Text key={index}>Price: {item.price}</Text>
            <Text key={index}>Quan: {item.quantity}</Text>
            <Text key={index}>Size: {item.size}</Text>
          </View>
        ))
      }
      <Button title='Xóa sản phẩm giỏ hàng' onPress={clearCart} />
    </View>
  )
}