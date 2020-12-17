import React, { useContext, useEffect, useState } from 'react'
import { View, ScrollView, Text, Animated} from 'react-native'
import { Context as PushContext } from "../context/PushContext";
import PendingPushInfo from './PendingPushInfo';
import styles from '../styles/carousel'

const Carousel = ( props ) => {
  // State 
  const [ interval, setInterval ] = useState(1);


  const { items, style, carouselX } = props;
  const itemsPerInterval = props.itemsPerInterval === undefined
    ? 1
    : props.itemsPerInterval;

  // Context
  const { setPushOff, state } = useContext(PushContext);
  const { pendingPushOffList } = state;

  useEffect(() => {
    setPushOff(pendingPushOffList[interval - 1])
  }, [interval])

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
            const i = getInterval(data.nativeEvent.contentOffset.x)
            setWidth(data.nativeEvent.contentSize.width);
            setInterval(i);
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