import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
  Animated,
  SafeAreaView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {discount, keepDiscovering, menuData} from '../constants/Objects';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CommonActions} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const LandingPageScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {top: safeAreaTop, bottom: safeAreaBottom} = insets;

  //animate status bar
  const barColorAnim = useRef(new Animated.Value(0)).current;
  const barColor = barColorAnim.interpolate({
    inputRange: [0, safeAreaTop],
    outputRange: ['green', 'white'],
    extrapolate: 'clamp',
  });

  const [bottomTabOffset, setBottomTabOffset] = useState(0);

  const clickSearchBar = () => {
    Alert.alert(
      'Search function is still in development',
      ``,
      [{text: 'OK', onPress: () => {}}],
      {cancelable: false},
    );
  };

  const onScrollHandler = (e) => {
    const currentbottomTabOffset = e.nativeEvent.contentOffset.y;
    barColorAnim.setValue(currentbottomTabOffset);
    var direction = currentbottomTabOffset > bottomTabOffset ? 'down' : 'up';
    setBottomTabOffset(currentbottomTabOffset);
    if (direction === 'down') {
      navigation.dispatch(
        CommonActions.setParams({
          tabBarVisible: false,
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.setParams({
          tabBarVisible: true,
        }),
      );
    }
  };

  const clickMenuItem = (title) => {
    Alert.alert(
      'Sorry',
      `This ${title} feature is still in development`,
      [{text: 'OK', onPress: () => {}}],
      {cancelable: false},
    );
  };

  const clickDiscountItem = (item) => {
    const {title, content, color} = item;
    Alert.alert(
      'Yeah!',
      `You got discount ${content}`,
      [{text: 'OK', onPress: () => {}}],
      {cancelable: false},
    );
  };

  const renderMenuItem = (item) => {
    const {title, icon} = item;
    return (
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => clickMenuItem(title)}>
        {/* determine using materialicons or ionicons */}
        {title === 'Bike' || title === 'More' ? (
          <MaterialIcons name={icon} size={40} color="black" />
        ) : (
          <Ionicons name={icon} size={40} color="black" />
        )}
        <Text style={styles.menuText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const renderDiscountItem = (item) => {
    const {title, content, color} = item;
    return (
      <TouchableOpacity
        style={styles.discountItemContainer}
        onPress={() => clickDiscountItem(item)}>
        <View style={{padding: 10}}>
          <View
            style={[
              styles.discountItemImage,
              {
                backgroundColor: color,
              },
            ]}
          />
          <View
            style={{
              flexDirection: 'column',
              marginTop: 10,
            }}>
            <Text style={{fontWeight: '600'}}>{title}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 4,
                alignItems: 'center',
              }}>
              <Ionicons name="calendar" size={16} color="grey" />
              <Text style={{fontSize: 14, marginLeft: 4}}>{content}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Animated.View
        style={{
          position: 'absolute',
          top: Platform.OS !== 'ios' ? -getStatusBarHeight() : 0, //for android
          width: '100%',
          height: getStatusBarHeight(),
          backgroundColor: barColor,
          // overflow: 'hidden',
        }}
      />
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent={true}
      />
      <ScrollView
        onScroll={(nativeEvent) => onScrollHandler(nativeEvent)}
        bounces={false}
        scrollEventThrottle={16}>
        {/* HEADER */}
        <View style={[styles.headerContainer]}>
          <View style={styles.headerInnerContainer}>
            <TouchableOpacity
              style={styles.payScannerContainer}
              onPress={() => {
                navigation.navigate('PayScanner');
              }}>
              {/* <View style={styles.payScannerInnerContainer}> */}
              <Ionicons name="scan" size={30} color="black" />
              {/* </View> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.searchBarContainer}
              onPress={() => clickSearchBar()}>
              <Ionicons
                name="search"
                size={20}
                color="black"
                style={{opacity: 0.6}}
              />
              <Text style={styles.searchBarText}>
                Offers, food, and places to go
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* OVO CASH AND POINT*/}
        <View style={styles.ovoContainer}>
          <TouchableOpacity
            style={styles.ovoCashContainer}
            onPress={() => {
              navigation.navigate('Payment');
            }}>
            <Ionicons
              name="cash"
              size={20}
              color="black"
              style={styles.ovoCashIcon}
            />
            <View style={styles.idrOvoCashContainer}>
              <Text style={styles.idrText}>IDR</Text>
              <Text style={styles.ovoCashText}>111.111</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="grey"
              />
            </View>
          </TouchableOpacity>
          <View style={styles.ovoVerticalLineSeparator} />
          <TouchableOpacity
            style={styles.ovoCashContainer}
            onPress={() => {
              navigation.navigate('Payment');
            }}>
            <Ionicons
              name="cash"
              size={20}
              color="black"
              style={styles.ovoCashIcon}
            />
            <Text style={styles.ovoCashText}>111.111 Points</Text>
            <MaterialIcons name="keyboard-arrow-right" size={20} color="grey" />
          </TouchableOpacity>
        </View>
        <View style={styles.ovoHorizontalLineSeparator} />
        {/* MENU */}
        <View style={styles.mainMenuContainer}>
          <FlatList
            data={menuData}
            renderItem={({item}) => renderMenuItem(item)}
            //Setting the number of column
            numColumns={4}
            keyExtractor={(item, index) => index}
          />
        </View>
        <View style={styles.ovoHorizontalLineSeparator} />
        {/* NEWS */}
        <View style={{marginHorizontal: 20}}>
          <TouchableOpacity
            style={styles.newsSectionContainer}
            onPress={() => {
              clickMenuItem();
            }}>
            <View style={styles.newsImageContainer}>
              <Image
                source={require('../assets/babel.config.jpeg')}
                style={styles.newsImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.newsTextContainer}>
              <Text style={styles.newsTextTitle}>This is news title</Text>
              <Text style={styles.newsTextContent}>This is news content</Text>
            </View>
          </TouchableOpacity>
          {/* DISCOUNT */}
          {discount.length > 0 && (
            <View style={styles.discountContainer}>
              <Text style={styles.discountText}>
                Cek diskon sebelum pesan Grabfood
              </Text>
              <FlatList
                data={discount}
                style={{marginHorizontal: 10}}
                renderItem={({item}) => renderDiscountItem(item)}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index}
              />
            </View>
          )}
          {/* KEEP DISCOVERING */}
          {keepDiscovering.length > 0 && (
            <View style={styles.discountContainer}>
              <Text style={styles.discountText}>Keep Discovering</Text>
              <FlatList
                data={keepDiscovering}
                style={{marginHorizontal: 10}}
                renderItem={({item}) => renderDiscountItem(item)}
                ListFooterComponent={() => {
                  return (
                    <View
                      style={{
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text>That's all for now</Text>
                    </View>
                  );
                }}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    // flex: 1,
    // height: getStatusBarHeight(),
    // backgroundColor: 'rgba(22,7,92,1)',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: Platform.OS !== 'ios' ? getStatusBarHeight() : 0,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    height: 80,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  searchBarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
  },
  searchBarText: {
    fontSize: 12,
    fontWeight: '300',
  },
  payScannerContainer: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#e6e6e6',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  payText: {
    fontSize: 12,
    color: 'white',
  },
  ovoContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
  },
  ovoVerticalLineSeparator: {
    width: 1,
    height: '100%',
    backgroundColor: 'grey',
    opacity: 0.1,
  },
  ovoHorizontalLineSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
    opacity: 0.1,
  },
  ovoCashContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  idrOvoCashContainer: {
    flexDirection: 'row',
  },
  idrText: {
    color: 'grey',
    fontSize: 10,
    marginRight: 2,
    textAlignVertical: 'top',
  },
  ovoCashText: {
    fontSize: 14,
    alignSelf: 'center',
  },
  ovoCashIcon: {
    marginRight: 6,
  },
  mainMenuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginVertical: 14,
  },
  menuRowContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  menuContainer: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 14,
    fontWeight: '300',
  },
  newsSectionContainer: {
    marginTop: 20,
  },
  newsImageContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  newsImage: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
  },
  newsTextContainer: {
    marginTop: 4,
  },
  newsTextTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  newsTextContent: {
    fontSize: 14,
  },
  discountContainer: {
    marginTop: 20,
    marginHorizontal: -20,
  },
  discountText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  discountItemContainer: {
    flexDirection: 'column',
    flex: 0.5,
  },
  discountItemImage: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
});

export default LandingPageScreen;
