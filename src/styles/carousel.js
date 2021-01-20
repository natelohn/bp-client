import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bullets: {
    alignItems: "flex-end",
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 10
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 20,
  }
});

export default styles;