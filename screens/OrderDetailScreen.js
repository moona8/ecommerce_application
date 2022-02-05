import { View, Text , TouchableOpacity,StyleSheet ,ScrollView,Image } from 'react-native';
import React from 'react';

 const OrderDetailScreen=()=> {
  return (
    <View style={styles.container}>
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
            <View style={styles.more}>
            <Text style={styles.productDiscrption}>
            productDecription
            </Text>
            <TouchableOpacity onPress={()=>{}}>
              <Text
                style={{textAlign: 'center', fontWeight: '500', color: 'blue'}}>
                more...
              </Text>
            </TouchableOpacity>
          </View>
            <View style={styles.productButton}>
              <Text style={styles.productRate}>$35</Text>
              
                <TouchableOpacity style={styles.button}>
                  <Text style={{textAlign: 'center',fontWeight:'500'}}>Canceled</Text>
                </TouchableOpacity>
            
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
export default OrderDetailScreen

const styles = StyleSheet.create({
  productList: {
    flexDirection: 'column',
    borderWidth: 2,
  },
  product: {
    flexDirection: 'row',
    height: 122,
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
    height: 100,
    borderWidth: 2,
  },
  productRate: {
    marginRight: '50%',
    borderWidth: 2,
  },
  // IncDec: {
  //   flexDirection: 'row',
  //   height: 100,
  //   borderWidth: 2,
  //   backgroundColor: 'yellow',
  //   justifyContent: 'space-between',
  //   width: '35%',
  // },

  button: {
    borderWidth: 2,
    backgroundColor: 'red',
    height: 20,
    width: '30%',
  },
  more: {
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'flex-end',
    // marginTop:,
  },
});