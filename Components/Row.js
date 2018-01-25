import React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import SortableList from 'react-native-sortable-list'; // 0.0.16
import axios from 'axios';
import { keys } from '../config';
import { Button, Icon } from 'react-native-elements';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 25,

    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    }),
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
  },
});


export default class Row extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      extraData: {},
    };

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      }),
    };
  }

  componentWillMount() {
    if (this.props.data.placeId) {
      axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${this.props.data.placeId}&key=${keys.googleMapsAPI}`)
        .then((res) => {
          this.setState({ extraData: res });
        })
        .catch(err => console.error('google api error', err));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }


  render() {
    const { data } = this.props;

    return (
      <Animated.View style={[
          styles.row,
          this._style,
        ]}
      >
        <Icon
          raised
          name='plus-circle'
          type='font-awesome'
          color='#f50'
          onPress={() => console.log('hello')} 
        />
         <View style={{ flex: 1}}>
            <Text style={styles.text}>{data.name}</Text>
          </View>
        {/* <Image source={{uri: data.image}} style={styles.image} /> */}
      </Animated.View>
    );
  }
}
