import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/*  catiories */}
      <View style={styles.picContainer}>
        <TouchableOpacity style={styles.viewChild}>
          <Image
            source={require('../assets/alll.png')}
            style={{width: '100%', height: '100%', borderRadius: 50}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewChild}>
          <Image
            source={require('../assets/men.jpg')}
            style={{width: '100%', height: '100%', borderRadius: 50}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewChild}>
          <Image
            source={require('../assets/women.jpg')}
            style={{width: '100%', height: '100%', borderRadius: 50}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewChild}>
          <Image
            source={require('../assets/kids.jpg')}
            style={{width: '100%', height: '100%', borderRadius: 50}}
          />
        </TouchableOpacity>
      </View>

      {/* product list */}

      <ScrollView style={styles.productList}>
        <Text style={styles.productNo}>3</Text>
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
                  <Text style={{textAlign:'center' ,}}>+</Text>
                </TouchableOpacity>
                <Text style={styles.productNo}>3</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={{textAlign:'center' ,}}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  picContainer: {
    // flex: 1,
    flexDirection: 'row',
    height: '25%',
    borderWidth: 2,
  },
  viewChild: {
    height: 100,
    marginHorizontal: '2.5%',
    width: '20%',
    backgroundColor: 'red',
    borderRadius: 50,
    borderWidth: 2,
  },
  productList: {
    // backgroundColor: 'red',
    // flex: 1,
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
    // borderRadius: 50,
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
});
//rnf
