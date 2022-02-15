import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from '../utils/globalState';
import products from '../dummyData/products.json';
import {firebaseDB} from '../config/firebaseConfig';
import {useNavigation} from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();
  const {user} = useContext(AppContext);
  const [placeOrder, setPlaseOrder] = useState(true);
  const cartKeys = user.cart ? Object.keys(user.cart) : [];

  const arr = products.data
    .filter(
      i =>
        !!cartKeys.find(b => i.productId === b && user.cart[i.productId] > 0),
    )
    .map(c => ({...c, quantiy: user.cart[c.productId]}));

  const increseQty = productId => {
    let updatedCart = {};
    if (user?.cart) {
      updatedCart = {...user.cart};
    }
    updatedCart[productId] = updatedCart[productId] + 1; // {001:1}
    firebaseDB
      .ref(`/users/${user.uid}`)
      .update({cart: updatedCart})
      .then(snap => {
        // console.log(snap, 'snap');
      })
      .catch(err => {
        // console.log('ERR: ', err);
      });
  };

  const decreseQty = productId => {
    let updatedCart = {};
    if (user?.cart) {
      updatedCart = {...user.cart};
    }
    updatedCart[productId] = updatedCart[productId] - 1; // {001:1}
    firebaseDB
      .ref(`/users/${user.uid}`)
      .update({cart: updatedCart})
      .then(snap => {
        // console.log(snap, 'snap');
      })
      .catch(err => {
        // console.log('ERR: ', err);
      });
  };
  const amount = arr
    .map(i => i.quantiy * i.productPrice)
    .reduce((partialSum, a) => partialSum + a, 0);

  const placeOrders = () => {
    // () => {}

    // arr.map(() => {})
    const orderItems = arr.map(item => ({
      productName: item.productName,
      productId: item.productId,
      productPrice: item.productPrice,
      quantiy: item.quantiy,
    }));

    const newOrder = {
      orderItems: JSON.stringify(orderItems),
      createdAt: new Date().getTime(),
      totalPrice: amount,
      userId: user.uid,
    };

    firebaseDB
      .ref('/orders/')
      .push(newOrder)
      .then(snap => {
        let orders = [];
        if (user?.orders) {
          const _orders = JSON.parse(user.orders);
          orders = [..._orders];
        }
        orders.push(snap.key);

        return firebaseDB
          .ref(`/users/${user.uid}`)
          .update({orders: JSON.stringify(orders)});
      })
      .then(snap => {
   return firebaseDB
      .ref(`/users/${user.uid}`)
      .update({cart: null})
      })
      .then((snap)=>{navigation.navigate("OrderDetailScreen")})
      .catch(err => {
        console.log(err.message);
      });
  };
  // useEffect(() => {
  //   let updatedCart = {};
  //   if (user?.cart) {
  //     updatedCart = {...user.cart};
  //   }
  //   updatedCart = '';
  //   firebaseDB
  //     .ref(`/users/${user.uid}`)
  //     .update({cart: updatedCart})
  //     .then(snap => {
  //       // console.log(snap, 'snap');
  //     })
  //     .catch(err => {
  //       // console.log('ERR: ', err);
  //     });
  // }, [placeOrder]);

  return (
    <View style={styles.container}>
      {/* product list */}
      {!user.cart ? (
        <View>
          <Text>Noitems</Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.list}>
            {arr.map(i => (
              <View style={styles.productList}>
                <View style={styles.product}>
                  <View style={styles.img}>
                    <Image
                      source={require('../assets/kid.jpg')}
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>
                  <View style={styles.productDetail}>
                    <Text style={styles.productName}>{i.productName} </Text>
                    <View style={styles.more}>
                      <Text style={styles.productDiscrption}>
                        {i.productDecription}
                      </Text>
                    </View>
                    <View style={styles.productButton}>
                      <Text style={styles.productRate}>{i.productPrice}</Text>
                      <View style={styles.IncDec}>
                        <TouchableOpacity style={styles.button}>
                          <Text
                            onPress={() => increseQty(i.productId)}
                            style={{textAlign: 'center'}}>
                            +
                          </Text>
                        </TouchableOpacity>
                        <Text style={styles.productNo}>{i.quantiy}</Text>
                        <TouchableOpacity style={styles.button}>
                          <Text
                            onPress={() => decreseQty(i.productId)}
                            style={{textAlign: 'center'}}>
                            -
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* price Detail */}
          <View style={styles.priceDetail}>
            <Text style={{fontSize: 22, fontWeight: '500', color: 'black'}}>
              Price Detail
            </Text>
            {/*  */}
            <View style={styles.pricing}>
              <Text style={styles.text}>Delivery</Text>
              <Text style={styles.text}>Free</Text>
            </View>
            <View style={styles.pricing}>
              <Text style={styles.text}>Cash on Delivery</Text>
              <Text style={styles.text}>...</Text>
            </View>
            <View style={styles.pricing}>
              <Text style={styles.text}>Payable Ampount</Text>
              <Text style={styles.text}>{amount}</Text>
            </View>
            <TouchableOpacity style={styles.placeOrder} onPress={placeOrders}>
              <Text
                style={{
                  fontWeight: '500',
                  color: 'black',
                  textAlign: 'center',
                }}>
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  list: {
    height: '60%',
  },
  productList: {
    flexDirection: 'column',
    borderWidth: 2,
  },
  product: {
    flexDirection: 'row',
    height: 105,
    borderWidth: 2,
  },
  img: {
    height: '100%',
    marginHorizontal: 2,
    width: '20%',
    backgroundColor: 'red',
    borderWidth: 2,
  },
  productDetail: {
    borderWidth: 2,
    width: '79%',
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
    height: 20,
    borderWidth: 2,
  },
  productRate: {
    marginRight: '50%',
    borderWidth: 2,
  },
  IncDec: {
    flexDirection: 'row',
    height: 20,
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
    height: 40,
  },
  pricing: {
    borderWidth: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //  fontWeight:' bold'
    height: 35,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
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
  more: {
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'flex-end',
    // marginTop:,
  },
});
