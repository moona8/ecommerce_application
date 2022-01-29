import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const CartScreen = () => {
  return (
    <View style={styles.container}>
      {/* product list */}

      <ScrollView style={styles.productList}>
        <View style={styles.product}>
          <View style={styles.img}>
            <Image
              source={require('../assets/kid.jpg')}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View style={styles.productDetail}>
            <Text style={styles.productName}>productName</Text>
            <Text style={styles.productDiscrption}>productDiscrption</Text>
            <View style={styles.productButton}>
              <Text style={styles.productRate}>$35</Text>
              <View style={styles.IncDec}>
                <TouchableOpacity style={styles.button}>
                  <Text style={{textAlign: 'center'}}>+</Text>
                </TouchableOpacity>
                <Text style={styles.productNo}>3</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={{textAlign: 'center'}}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* price Detail */}
      <View style={styles.priceDetail}>
        <Text style={{ fontSize: 22,fontWeight: '500',color:'black',} }>Price Detail</Text>
        <View style={styles.pricing}>
          <Text style={styles.text}>price</Text>
          <Text style={styles.text}>$540</Text>
        </View>
        <View style={styles.pricing}>
          <Text style={styles.text}>Delivery</Text>
          <Text style={styles.text}>Free</Text>
        </View>
        <View style={styles.pricing}>
          <Text style={styles.text}>Payable Ampount</Text>
          <Text style={styles.text}>$540</Text>
        </View>
        <TouchableOpacity style={styles.placeOrder}>
          <Text style={{fontWeight: '500',color:'black',textAlign: 'center',}}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  productList: {
    flexDirection: 'column',
    borderWidth: 2,
  },
  product: {
    flexDirection: 'row',
    height: 100,
    borderWidth: 2,
  },
  img: {
    height: '100%',
    marginHorizontal: '2.5%',
    width: '20%',
    backgroundColor: 'red',
    borderWidth: 2,
  },
  productDetail: {
    borderWidth: 2,
    width: '73%',
  },
  productName: {
    borderWidth: 2,
    width: '100%',
  },
  productDiscrption: {
    borderWidth: 2,
    width: '100%',
    height: 50,
  },

  productButton: {
    flexDirection: 'row',
    height: 100,
    borderWidth: 2,
  },
  productRate: {
    marginRight: '50%',
    borderWidth: 2,
  },
  IncDec: {
    flexDirection: 'row',
    height: 100,
    borderWidth: 2,
    backgroundColor: 'yellow',
    justifyContent: 'space-between',
    width: '35%',
  },

  button: {
    borderWidth: 2,
    backgroundColor: 'red',
    height: 20,
    width: 25,
  },
  // detail
  priceDetail: {
    // borderWidth: 2,
    width: '100%',
    marginLeft: 10,
    width: '95%',
    marginTop: 10,
    height:40
  },
  pricing: {
    borderWidth: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //  fontWeight:' bold'
    height:35,
    
  },
  text:{
    fontSize: 18,
    fontWeight: '500',
    color:'black',
  },
  placeOrder: {
    borderWidth: 2,
    textAlign: 'center',
    justifyContent: 'center',
    width: 100,
    height: 20,
    marginLeft: '35%',
    marginTop: 10,
  },
});
