// @flow
import React, { useRef, useState } from 'react';
import {
  Container,
} from './components/Container';
import { colors, font, gap } from './theme';
import { Dimensions, ImageBackground, KeyboardAvoidingView, StyleSheet, ScrollView, Platform, View, Text, Animated, Image, TextInput } from 'react-native';


import { LoadingButton } from './components/LoadingButton';
import { useNavigation } from '@react-navigation/native';
import { postData } from './lib/baseApi';
import { env } from './config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const { height, width } = Dimensions.get('window');

const ASPECT_RATIO = 1.69;

const fodderLogo = require('../assets/orange-logo.png');

const flex = { flex: 1 };

interface RefObject {
    showLoadingFunc: (arg0: boolean) => void
}

interface CardModel {
    OwnerName : string,
    OwnerEID : string,
    HerdCategory : string, 
    Eligibilty : string,
    Ceiling : string,
    Consumed : string, 
    Balance : string
}

const infoHeight = 394.0;

const HomeScreen: React.FC = () => {
  const webInterFace = require('./assets/BG_Home.jpg')
  const insets = useSafeAreaInsets();

  const opacity1 = useRef<Animated.Value>(new Animated.Value(0));
  const opacity2 = useRef<Animated.Value>(new Animated.Value(0));
  const opacity3 = useRef<Animated.Value>(new Animated.Value(0));

  const [cardData, setCardData] = useState<CardModel | null>(null);
  const [isLoginButtonLoading, setIsLoginButtonLoading] = useState(false);
  const [cardnumber, setCardnumber] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation<any>();
  let loadingButton = useRef<RefObject>(null);

  const opacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  const animatedValue = useRef<Animated.Value>(new Animated.Value(1)).current;

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Dimensions.get('window').height],
})
  const search = async () => {
    setCardData(null);
    //hideCardAnimation();
    opacity.setValue(0);
    animatedValue.setValue(1);
    if(!cardnumber) return;
    setError("");
    setIsLoginButtonLoading(true);
    loadingButton.current?.showLoadingFunc(true);
    let request = {
        "AgricultureCardNo": cardnumber,
        "Period": ""
    }
    const url = env.API_URL+ 'FDR/FDRGetDetails/FDRGetCardSales' + (env.prod ? '' : '_dev');
    const searchResponse = await postData(url,request,{} )

    if (!searchResponse.Success) {
        setError("Incorrect or Invalid card number.");
        setIsLoginButtonLoading(false);
      loadingButton.current?.showLoadingFunc(false);
    } else {    
        setIsLoginButtonLoading(false);
        loadingButton.current?.showLoadingFunc(false);
        setCardData(JSON.parse(searchResponse.Data));
        showCardAnimation();
      //this.saveLoginHistory(true);
     // navigation.navigate(SearchResults);
    }
  }

  const getTimeBoxUI = (text1: string, text2: string) => (
    <View style={styles.timeBoxContainer}>
      <Text style={[styles.textStyle, styles.timeBoxTitle]}>{text1}</Text>
      <Text style={[styles.textStyle, { fontSize: 14 }]}>{text2}</Text>
    </View>
  );

  const showCardAnimation = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
    Animated.parallel([
      Animated.timing(opacity1.current, {
        toValue: 1,
        duration: 500,
        delay: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity2.current, {
        toValue: 1,
        duration: 500,
        delay: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity3.current, {
        toValue: 1,
        duration: 500,
        delay: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }

  const hideCardAnimation = () => {
    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }

    return (
      <KeyboardAvoidingView style={flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ height }} keyboardShouldPersistTaps='handled'>
          <ImageBackground source={require("./assets/BG_Home.jpg")} style={styles.imageBackground}>
            <View  style={styles.imageContainer}>
            <Image
            style={styles.imageLogo}
            source={fodderLogo}
          />
            </View>
            <Container style={styles.container}>
              {!!error && <Text>{error}</Text>}
              <TextInput
                style={styles.searchInputText}
                keyboardType="number-pad"
                value={cardnumber}
                placeholder="Enter card number"
                autoCapitalize="none"
                onChangeText={(value: any) => setCardnumber(value)} />
              {/* <LoginButton style={isLoginButtonLoading&& styles.disabled} disabled={isLoginButtonLoading} onPress={this.login}>
                <LoginText>Login</LoginText>
              </LoginButton> */}
              <View style={{ marginTop: gap.base, marginBottom: gap.small, }}>
                <LoadingButton
                        ref={loadingButton}
                        width={width - (2 * gap.xlarge)}
                        height={44}
                        title="Search"
                        titleFontSize={font.h3}
                        titleColor={colors.WHITE}
                        backgroundColor={colors.BRAND_COLOR_GREEN}
                        borderRadius={gap.xsmall}
                        onPress={search}
                        disabled={isLoginButtonLoading} 
                        titleFontFamily={'WorkSans-Regular'} 
                        titleWeight={'700'} 
                        borderWidth={0} 
                        activityIndicatorColor={'white'} 
                />
              </View>
            </Container>
            <Animated.View 
             style={[
              styles.contentContainer,
              { 
                opacity,
                transform: [{ translateY }]  
              }
              ]}>
            {cardData ? 
            
             
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[
              styles.scrollContainer,
              {
                marginTop: 24,
                paddingBottom: insets.bottom,
              },
            ]}
            contentContainerStyle={{
              flexGrow: 1,
              minHeight: infoHeight,
              // maxHeight: tempHeight > infoHeight ? tempHeight : infoHeight,
            }}
          >
            <Text style={styles.courseTitle}>{cardData.OwnerName}</Text>
            <View style={styles.priceRatingContainer}>
              <Text style={[styles.textStyle, styles.price]}>{cardData.OwnerEID}</Text>
            </View>
            <Animated.Text
              style={[styles.courseDescription, { opacity: opacity1.current }]}
            >
            {cardData.HerdCategory}
            </Animated.Text>
            <Animated.View
              style={[styles.boxesContainer, { opacity: opacity2.current }]}
              renderToHardwareTextureAndroid // just to avoid UI glitch when animating view with elevation
            >
               {getTimeBoxUI(cardData.Eligibilty, 'Eligibilty')}
              {getTimeBoxUI(cardData.Balance, 'Balance')}
              {getTimeBoxUI(cardData.Ceiling, 'Ceiling')}
              {getTimeBoxUI(cardData.Consumed, 'Consumed')}
            </Animated.View>
            {/* <Animated.View
              style={[styles.footerContainer, { opacity: opacity3.current }]}
              renderToHardwareTextureAndroid
            >
              <View style={{ width: 16 }} />
              <View style={styles.detailSection}>
                <MyPressable>
                  <Text style={styles.detailSectionText}>Check</Text>
                </MyPressable>
              </View>
            </Animated.View> */}
            
          </ScrollView>
 :
 <></> }

        </Animated.View>
           
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: gap.base,
    borderRadius: gap.xsmall,
    flex: 0,
    justifyContent: "flex-start",
    fontFamily: 'WorkSans-Regular'
  },
  imageBackground: {
    flex: 1,
    height: height
  },
  disabled: {
    opacity: 0.5,
  },
  contentContainer: {
    flex: 1,
    shadowColor: 'grey',
    shadowOffset: { width: 1.1, height: 1.1 },
    shadowOpacity: 0.2,
    shadowRadius: 10.0,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 8,
    elevation: 8,
    marginTop: 24
  },
  courseTitle: {
    fontSize: 22,
    fontFamily: 'WorkSans-SemiBold',
    letterSpacing: 0.27,
    paddingTop: 24,
    paddingLeft: 18,
    paddingRight: 16,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
  },
  price: {
    flex: 1,
    color: 'rgb(0, 182, 240)',
  },
  textStyle: {
    fontSize: 22,
    fontFamily: 'WorkSans-Regular',
    color: 'darkslategrey',
    letterSpacing: 0.27,
  },
  boxesContainer: {
    flexDirection: 'row',
    padding: 6,
  },
  timeBoxContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    margin: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: 'grey',  
    shadowOffset: { width: 1.1, height: 1.1 },
    shadowOpacity: 0.22,
    shadowRadius: 8.0,
  },
  timeBoxTitle: {
    fontSize: 14,
    fontFamily: 'WorkSans-SemiBold',
    color: 'rgb(0, 182, 240)',
  },
  courseDescription: {
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
    color: 'darkslategrey',
    letterSpacing: 0.27,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  footerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  addView: {
    width: 48,
    height: 48,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailSection: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: colors.BRAND_COLOR_GREEN,
    elevation: 4,
    shadowColor: 'rgb(0, 182, 240)',
    shadowOffset: { width: 1.1, height: 1.1 },
    shadowOpacity: 0.5,
    shadowRadius: 10.0,
    ...Platform.select({ android: { overflow: 'hidden' } }),
  },
  detailSectionText: {
    padding: 18,
    paddingVertical: 12,
    fontSize: 18,
    fontFamily: 'WorkSans-SemiBold',
    alignSelf: 'center',
    color: 'white',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageLogo: {
    width : width - 120,
    height: 120
  },
  searchInputText: {
    height: 44,
    marginHorizontal: gap.base,
    marginTop: gap.base,
    borderWidth: 1,
    padding: gap.base - gap.xsmall,
    borderColor: colors.LIGHTGREY,
    fontFamily: 'WorkSans-Regular',
    fontSize: 16
  },
  errorText: {
    color: colors.RED,
    fontSize: font.base,
    marginHorizontal: gap.base,
    marginTop: gap.small,
  }
});

export default HomeScreen;