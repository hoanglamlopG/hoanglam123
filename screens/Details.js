import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, images } from '../constants'
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = ({ route, navigation }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [myCart, setMyCart] = useState([]); // [ {item: {}, quantity: 2}

  const { item } = route.params;
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  }

  React.useEffect(() => {
    getCart();
  }, [])


  const getCart = async () => {
    try {
      const value = await AsyncStorage.getItem('cart');
      if (value !== null) {
        setMyCart(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };

  const saveCart = async (cartData) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cartData));
    } catch (e) {
      // handle error saving value
    }
  };

  const addToCart = (product) => {
    const existingProduct = myCart.find((item) => item.id === product.id && item.size === selectedSize);

    if (existingProduct) {
      // If the product already exists in the cart, increase the quantity
      const updatedCart = myCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity, size: selectedSize } : item
      );

      setMyCart(updatedCart);
      saveCart(updatedCart);
    } else {
      // If the product is not in the cart, add it with quantity 1
      const updatedCart = [...myCart, { ...product, quantity: quantity, size: selectedSize }];

      setMyCart(updatedCart);
      saveCart(updatedCart);
    }
    console.log(myCart);
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <View style={{
        flex: 1,
        backgroundColor: COLORS.gray
      }}>
        <View style={{
          marginHorizontal: 22,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          width: SIZES.width - 44,
          top: 22,
          zIndex: 999
        }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              color={COLORS.black}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsFavourite(!isFavourite)}
          >
            {
              isFavourite ? (
                <Ionicons
                  name="md-heart-sharp"
                  size={24}
                  color={COLORS.black}
                />
              ) : (
                <Ionicons
                  name="md-heart-outline"
                  size={24}
                  color={COLORS.black}
                />
              )
            }
          </TouchableOpacity>
        </View>

        <Image
          source={item?.image}
          resizeMode='contain'
          style={{
            width: '100%',
            height: '75%',
          }}
        />



        <View style={{
          backgroundColor: COLORS.white,
          borderRadius: 36,
          paddingHorizontal: 22,

          paddingVertical: 22,
          position: "absolute",
          width: "100%",
          bottom: 0
        }}>
          <Text style={{ ...FONTS.h3 }}>{item?.name} </Text>
          <Text style={{ ...FONTS.body3 }}>Lựa chọn hàng đầu</Text>

          <View style={{ marginVertical: 22 }}>
            <Text style={{ ...FONTS.h4 }}> Size</Text>

            <View style={{
              flexDirection: "row",
              marginVertical: 18
            }}>
              <TouchableOpacity
                style={
                  [
                    styles.checkboxContainer,
                    selectedSize === "28" && styles.selectedCheckbox
                  ]
                }

                onPress={() => handleSizeSelection("28")}
              >
                <Text style={
                  [
                    selectedSize === "28" && styles.checkboxText
                  ]
                }>28</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  [
                    styles.checkboxContainer,
                    selectedSize === "29" && styles.selectedCheckbox
                  ]
                }

                onPress={() => handleSizeSelection("29")}
              >
                <Text style={
                  [
                    selectedSize === "29" && styles.checkboxText
                  ]
                }>29</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  [
                    styles.checkboxContainer,
                    selectedSize === "30" && styles.selectedCheckbox
                  ]
                }

                onPress={() => handleSizeSelection("30")}
              >
                <Text style={
                  [
                    selectedSize === "30" && styles.checkboxText
                  ]
                }>30</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  [
                    styles.checkboxContainer,
                    selectedSize === "31" && styles.selectedCheckboxảt
                  ]
                }

                onPress={() => handleSizeSelection("31")}
              >
                <Text style={
                  [
                    selectedSize === "31" && styles.checkboxText
                  ]
                }>31</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={{ ...FONTS.h4 }}>Số lượng</Text>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: 'center',
            marginVertical: 6
          }}>
            <View style={{
              backgroundColor: COLORS.gray,
              height: 48,
              width: 134,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: 'center',
              paddingHorizontal: 12,
              borderRadius: 24
            }}>
              <TouchableOpacity
                onPress={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1)
                  }
                }}
                style={{
                  height: 32,
                  width: 32,
                  borderRadius: 16,
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: "center"
                }}
              >
                <Feather
                  name="minus"
                  size={24}
                  color={COLORS.black}
                />
              </TouchableOpacity>
              <Text style={{ ...FONTS.body3 }}>{quantity}</Text>

              <TouchableOpacity
                onPress={() => {
                  setQuantity(quantity + 1)
                }}
                style={{
                  height: 32,
                  width: 32,
                  borderRadius: 16,
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: "center"
                }}
              >
                <Feather
                  name="plus"
                  size={24}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "column" }}>
              <Text style={{ ...FONTS.body4 }}>Giá sản phẩm </Text>
              <Text style={{ ...FONTS.h3 }}>Giá {item?.price}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => addToCart(item)}
          >
            <Feather
              name="shopping-bag"
              size={24}
              color={COLORS.white}
            />

            <Text style={{
              ...FONTS.h3,
              color: COLORS.white,
              marginLeft: 12
            }}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: "center",
    justifyContent: 'center',
    height: 44,
    width: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    marginRight: 12
  },
  selectedCheckbox: {
    backgroundColor: COLORS.black
  },
  checkboxText: {
    color: COLORS.white,
    fontSize: 12
  },
  button: {
    marginTop: 12,
    height: 60,
    width: SIZES.width - 44,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black
  }

})



export default Details