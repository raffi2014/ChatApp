import React, { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Animated, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';

interface Props {
    width: number,
    height: number,
    disabled: boolean,
    title: string,
    titleColor: string,
    titleFontFamily: string,
    titleFontSize: number,
    titleWeight: string,
    backgroundColor: string,
    borderWidth: number,
    borderRadius: number,
    activityIndicatorColor: string,
    onPress: () => void,
  };

interface RefObject {
    showLoadingFunc: (arg0: boolean) => void
}

export const LoadingButton = forwardRef((props: Props, ref: Ref<RefObject>) => {
    const { title, width, borderRadius,
         height, disabled, 
        onPress, titleColor, backgroundColor,
         borderWidth, titleFontFamily,titleFontSize,
          titleWeight, activityIndicatorColor } = props;
    useImperativeHandle(ref, () => ({ showLoadingFunc }));
  let loadingValue = {
    width: new Animated.Value(width),
    borderRadius: new Animated.Value(borderRadius),
    opacity: new Animated.Value(1)
  };

  const [animated_value, setAnimatedValue] = useState(0);

  loadingValue.width.addListener(({value}) => setAnimatedValue(value));

  const [showLoading, setShowLoading] = useState(false);

  const showLoadingFunc = (showLoading: boolean) => {
    if (showLoading) {
      _loadingAnimation(width, height, borderRadius, height / 2, 1, 0);
      setShowLoading(showLoading);
    } else {
        _loadingAnimation(height, width, height / 2, borderRadius, 0, 1);
        setShowLoading(showLoading);
    }
  }

  const onCancel = () => {
    console.log('onCancel');
  }

  const _loadingAnimation = (widthStart: any, widthEnd: any, borderRadiusStart: any, borderRadiusEnd: any, opacityStart: any, opacityEnd: any) => {
    if (animated_value !== widthEnd) {
      loadingValue.width.setValue(widthStart);
      loadingValue.opacity.setValue(opacityStart);
      loadingValue.borderRadius.setValue(borderRadiusStart);

      Animated.timing(loadingValue.width, {
        toValue: widthEnd,
        duration: 300,
        useNativeDriver: false,
      }).start();

      Animated.timing(loadingValue.borderRadius, {
        toValue: borderRadiusEnd,
        duration: 300,
        useNativeDriver: false,
      }).start();

      Animated.timing(loadingValue.opacity, {
        toValue: opacityEnd,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }
  }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={!showLoading ? onPress : onCancel} disabled={disabled}>
          <Animated.View
            style={[
              styles.containerButton,
              {
                width: loadingValue.width, 
                height: height,
                backgroundColor: backgroundColor,
                borderWidth: borderWidth,
                borderRadius: borderRadius
              }
            ]}
          >
            {showLoading ? _renderIndicator(activityIndicatorColor) : _renderTitle(title, loadingValue, titleColor, titleFontFamily,titleFontSize, titleWeight)}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  })

const _renderTitle = (title: any, loadingValue: any, titleColor: any, titleFontFamily: any,titleFontSize: any, titleWeight: any ) => {
    return (
      <Animated.Text
        style={[
          styles.buttonText,
          {
            opacity: loadingValue.opacity,
            color: titleColor,
            fontFamily: titleFontFamily,
            fontSize: titleFontSize,
            fontWeight: titleWeight
          }
        ]}
      >
        {title}
      </Animated.Text>
    );
  }

const _renderIndicator = (activityIndicatorColor: any) => {
    return <ActivityIndicator color={activityIndicatorColor} />;
}

LoadingButton.defaultProps = {
    title: 'Button',
    titleColor: 'white',
    backgroundColor: 'gray',
    activityIndicatorColor: 'white',
    borderRadius: 0
  };


const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  containerButton: {
    justifyContent: 'center'
  },
  buttonText: {
    backgroundColor: 'transparent',
    textAlign: 'center'
  }
});


