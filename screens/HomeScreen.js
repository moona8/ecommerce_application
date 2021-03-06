import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext} from 'react';
// import products from '../dummyData/products.json';
import {AppContext} from '../utils/globalState';
import {firebaseDB} from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';



export default function HomeScreen({navigation}) {
  const {products} = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // cart => [user and product]
  // cart => [{productId: "001", quantity: 1}, {...}]

  if (!products.length) {
    return <View></View>;
  }

  // console.log('selectedCategory', selectedCategory);

  // prodArr => filter(condition) => product.category === selectedCategory => filteredArr
  // arr(5) => map((item) => {...}) return newArr(5)
  // arr(5) => filter((item) => condition[true/false]) return newArr(<=arr length)
  // DRY

  let filteredProducts = [...products];

  if (selectedCategory === 'all') {
    filteredProducts = [...products];
  } else {
    filteredProducts = [...products].filter(
      product => selectedCategory === product.productCategory,
    );
  }
  // console.log(filteredProducts);
  return (
    <View style={styles.containers}>
      {/*  catiories */}
      <View style={{backgroundColor: '#d1c4e9', height: 50}}>
        <Text style={styles.header}>ECOMMERCE APP</Text>
      </View>
      <View style={styles.picContainer}>
        <TouchableOpacity
          style={styles.viewChild}
          onPress={() => {
            setSelectedCategory('all');
          }}>
          <Image
            source={require('../assets/alll.png')}
            style={{width: '100%', height: '100%', borderRadius: 50}}
          />
          <Text
            style={{textAlign: 'center', fontWeight: '800', color: '#1a237e'}}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewChild}
          onPress={() => {
            setSelectedCategory('men');
          }}>
          <Image
            source={require('../assets/men.jpg')}
            style={{width: '100%', height: '100%', borderRadius: 50}}
          />
          <Text
            style={{textAlign: 'center', fontWeight: '800', color: '#1a237e'}}>
            Men
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewChild}
          onPress={() => {
            setSelectedCategory('women');
          }}>
          <Image
            source={require('../assets/women.jpg')}
            style={{width: '100%', height: '100%', borderRadius: 50}}
          />
          <Text
            style={{textAlign: 'center', fontWeight: '800', color: '#1a237e'}}>
            Women
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewChild}
          onPress={() => {
            setSelectedCategory('kids');
          }}>
          <Image
            source={require('../assets/kids.jpg')}
            style={{width: '100%', height: '100%', borderRadius: 50}}
          />
          <Text
            style={{textAlign: 'center', fontWeight: '800', color: '#1a237e'}}>
            Kids
          </Text>
        </TouchableOpacity>
      </View>

      {/* product list */}
      <ScrollView>
        {filteredProducts.map(product => (
          <Product key={product.productId} product={product}  />
        ))}
      </ScrollView>
    </View>
  );
}

const Product = ({product}) => {
  const {user} = useContext(AppContext);
  const navigation = useNavigation();

  console.log(user);
  let cartKeys = [];
  if (user?.cart) {
    cartKeys = Object.keys(user.cart);
  }
  // const cartKeys = Object.keys(user.cart);
  const [addToCart, setAddToCart] = useState(true);
  // const id =cartKeys.filter(i => {i === product.productId});
  const handleAddToCart = () => {
    let updatedCart = {};
    if (user?.cart) {
      updatedCart = {...user.cart};
    }
    updatedCart[product.productId] = 1; // {001:1}
    firebaseDB
      .ref(`/users/${user.uid}`)
      .update({cart: updatedCart})
      .then(snap => {
        // console.log(snap, 'snap');
      })
      .catch(err => {
        // console.log('ERR: ', err);
      });
    setAddToCart(false);
  };
  // const handleRemoveToCart = () => {
  //   let updatedCart = {};
  //   if (user?.cart) {
  //     updatedCart = {...user.cart};
  //   }
  //   // console.log(updatedCart, 'Before');
  //   delete updatedCart[product.productId]; // {}
  //   // console.log(updatedCart, 'After');
  //   firebaseDB
  //     .ref(`/users/${user.uid}`)
  //     .update({cart: updatedCart})
  //     .then(snap => {
  //       // console.log(snap, 'snap');
  //     })
  //     .catch(err => {
  //       // console.log('ERR: ', err);
  //     });
  //   setAddToCart(true);
  // };

  return (
    <View Style={styles.container}>
      <View style={styles.product}>
        <View style={styles.img}>
          <Image
            source={{
              uri: product.productImage,
            }}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View style={styles.productDetail}>
          <Text style={styles.productName}>{product.productName}</Text>
          <View style={styles.more}>
            <Text style={styles.productDiscrption}>
              {product.productDecription}
            </Text>
            
          </View>
          <View style={styles.productButton}>
            <Text style={styles.productRate}> RS___/{product.productPrice}</Text>
            {!cartKeys.find(cartItem => cartItem === product.productId) ? (
              <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                <Text style={{textAlign: 'center', fontWeight: '500'}}>
                  Add to cart
                </Text>
              </TouchableOpacity>
            ) : (
              // <TouchableOpacity
              //   style={styles.button}
              //   onPress={handleRemoveToCart}>
                <Text style={{textAlign: 'center', fontWeight: '500'}}>
                  Added
                </Text>
              // </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
   textAlign:"center",
  //  fontWeight:20,
   paddingTop:20,
   color:"black",
  },
  picContainer: {
    flexDirection: 'row',
    height: '25%',
    marginTop: 5,
  },
  viewChild: {
    height: 100,
    marginHorizontal: '2.5%',
    width: '20%',
    backgroundColor: 'red',
    borderRadius: 50,
    // borderWidth: 2,
    borderColor: '#7986cb',
  },


  //product

  container: {
    flexDirection: 'column',
    // borderWidth: 2,

  },
  product: {
    flexDirection: 'row',
    height: 115,
    paddingTop:5,    
    marginTop: 5,
    
      elevation: 5,
      shadowColor: '#52006A',
   
    
  },
  img: {
    height: '100%',
    marginHorizontal: 2,
    width: '20%',
    backgroundColor: 'red',
    // borderWidth: 2,
  },
  productDetail: {
    // borderWidth: 2,
    width: '79%',
      marginLeft:10
  },
  productName: {
    // borderWidth: 2,
    color:'black',
    fontSize:20,   
     width: "80%",
     paddingLeft:10
  },
  productDiscrption: {
    // borderWidth: 2,
    color:'black',
    fontSize:15,  
    width: '100%',
    height: 50,
  },

  productButton: {
    flexDirection: 'row',
    // height: 100,
    paddingBottom:10,
    
    marginRight:10
  },
  productRate: {
    marginRight: '50%',
    color:'black',
    fontSize:15,  
    // borderWidth: 2,
  },
  IncDec: {
    flexDirection: 'row',
    // height: 100,
    // borderWidth: 2,
    backgroundColor: 'yellow',
    justifyContent: 'space-between',
    width: '35%',
  },

  button: {
    borderWidth: 1,
    borderColor:"red",
    backgroundColor: '#ffcdd2',
    height: 20,
    width: '30%',
    marginRight:10
  },

});
//rnf
