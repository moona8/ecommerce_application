import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {firebaseDB} from '../config/firebaseConfig';
import {AppContext} from '../utils/globalState';

const OrderDetailScreen = () => {
  const {user, orders, setOrders} = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCartItem, updateSelectedCartItem] = useState(null);

  const _getUserOrder = () => {
    console.log(user.orders);
    if (user?.orders) {
      const userOrders = JSON.parse(user.orders);

      firebaseDB
        .ref(`/orders`)
        .get()
        .then(snap => {
          // snap.val() => { id: {...}, id2: {...}, id3: {...}, .. }
          // user.orders => "[id, id2]"
          // result => [{}, {}, ...]
          let result = [];
          userOrders.forEach(orderId => {
            const newOrder = {...snap.val()[orderId]};
            newOrder.orderId = orderId;
            result.push(newOrder);
          });
          setOrders(result);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    _getUserOrder();
  }, [user]);

  const navigation = useNavigation();

  console.log('ORDERS:', orders.length);
  return (
    <ScrollView>
      {orders.map((order, i) => {
        const newDate = new Date(order.createdAt).toDateString();
        const orderItems = JSON.parse(order.orderItems);

        return (
          <View key={`order_${i}`} style={styles.orderDetail}>
            <View style={styles.order}>
              <Text style={styles.text}>Order id {order.orderId}</Text>
              <Text style={styles.text}></Text>
            </View>
            <View style={styles.order}>
              <Text style={styles.text}>Total Price:{order.totalPrice}</Text>
              <Text style={styles.text}>{newDate}</Text>
            </View>
            <View style={styles.order}>
              <Text style={styles.text}>Items: {orderItems.length}</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  updateSelectedCartItem({...order, orderItems: orderItems})
                }>
                <Text style={{textAlign: 'center', fontWeight: '500'}}>
                  Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      {selectedCartItem && (
        <ModalView
          item={selectedCartItem}
          updateSelectedCartItem={updateSelectedCartItem}
        />
      )}
    </ScrollView>
  );
};
export default OrderDetailScreen;

const ModalView = ({item, updateSelectedCartItem}) => {
  console.log('item', item);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Hello World!</Text> */}
            <Text style={styles.text}>{item.orderId}</Text>
            <Text style={styles.text}>
              {new Date(item.createdAt).toDateString()}
            </Text>
            {/* <View style={styles.orders}>
                    <Text style={styles.text}>Total Price</Text>
                    <Text style={styles.text}>{item.totalPrice}</Text>
                  </View> */}
            <ScrollView>
              {item.orderItems.map(i => (
                <View style={styles.modalDetail}>
                  
                  <View style={styles.order}>
                    <Text style={styles.text}>Product name</Text>
                    <Text style={styles.text}>{i.productName}</Text>
                  </View>
                  <View style={styles.order}>
                    <Text style={styles.text}>Product Price</Text>
                    <Text style={styles.text}>{i.productPrice}</Text>
                  </View>
                  <View style={styles.order}>
                    <Text style={styles.text}>Product Quantiy</Text>
                    <Text style={styles.text}>{i.quantiy}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            {/* <View style={styles.order}>{item.totalPrice}</View>  */}
            {/* <Text style={styles.text}>{item.totalPrice}</Text> */}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => updateSelectedCartItem(null)}>
              <Text style={styles.textStyle}>Hide </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  orderDetail: {
    borderWidth: 2,
    width: '100%',
    marginLeft: 10,
    width: '95%',
    marginTop: 10,
  },
  order: {
    // borderWidth: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //  fontWeight:' bold'
    // height: 25,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },

  button: {
    // borderWidth: 2,
    // backgroundColor: '#3AAEE9',
    // height: 20,
    // width: '30%',
  },
  //modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    // borderWidth: 2,
    height: 20,
    width: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    paddingRight: 7,
    paddingLeft: 7,
    // marginBottom:10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#bc5a7e',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    // textAlign: "center"
  },
  modalDetail: {
    borderWidth: 2,
    width: '80%',
    marginLeft: 10,
    // width: '95%',
    marginTop: 10,
    marginBottom: 20,
  },
  orders: {
    width: "100%",
  },
});
