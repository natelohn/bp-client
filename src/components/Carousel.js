import React, { useRef, useEffect } from 'react'
import { View, ScrollView, Text, Dimensions, Animated} from 'react-native'

import PendingPushInfo from './PendingPushInfo';
import styles from '../styles/carousel'

const Carousel = ( props ) => {

  const { hidden, items, style, interval, setInterval } = props;
  const itemsPerInterval = props.itemsPerInterval === undefined
    ? 1
    : props.itemsPerInterval;

  // Animation
  const offScreenRight = Dimensions.get('window').width;
  const onScreen = 0;
  const carouselX = useRef(new Animated.Value(offScreenRight)).current;

  const showCarosel = () => {
    Animated.timing(carouselX, {
      toValue: onScreen,
      duration: 250,
      useNativeDriver: true
    }).start();
  }

  const hideCarosel = () => {
    Animated.timing(carouselX, {
      toValue: offScreenRight,
      duration: 250,
      useNativeDriver: true
    }).start();
  }
  
  useEffect(() => {
    // Use effect is using the pre-updated version of hidden
    const show = !hidden;
    if (show) {
      showCarosel();
    } else {
      hideCarosel();
    }
}, [hidden]);

  // Carosel Logic
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const init = ( width ) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  }

  const getInterval = ( offset ) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset+1 < (width / intervals) * i) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
  }

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...styles.bullet,
          opacity: interval === i ? 0.5 : 0.1
        }}
      >
        &bull;
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[{ transform: [{ translateX: carouselX }]}]}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ ...styles.scrollView, width: `${100 * intervals}%` }}
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={(w) => init(w)}
          onScroll={data => {
            setWidth(data.nativeEvent.contentSize.width);
            setInterval(getInterval(data.nativeEvent.contentOffset.x));
          }}
          scrollEventThrottle={200}
          pagingEnabled
          decelerationRate="fast"
        >
          {items.map((item , index ) => {
            switch (style) {
              default:
                return (
                  <PendingPushInfo key={index} pendingPush={item}/>
                );
            }
          })}
        </ScrollView>
        <View style={styles.bullets}>
          {bullets}
        </View>
      </Animated.View>
    </View>
  )
}

export default Carousel;