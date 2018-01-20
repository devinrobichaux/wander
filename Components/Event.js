import React from 'react';
import openMap from 'react-native-open-maps';
// import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, View, StyleSheet, Image, Row, TouchableHighlight, Animated, Easing, Dimensions, Platform } from 'react-native';
import { MapView } from 'expo';
// https://github.com/react-community/react-native-maps for more information on how this library works
import logo from '../img/logo.png';
import SortableList from 'react-native-sortable-list'

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#222222',
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,


    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    })
  },
});

const data = {
  0: {
    image: 'https://placekitten.com/200/240',
    text: 'Chloe',
  },
  1: {
    image: 'https://placekitten.com/200/201',
    text: 'Jasper',
  },
  2: {
    image: 'https://placekitten.com/200/202',
    text: 'Pepper',
  },
  3: {
    image: 'https://placekitten.com/200/203',
    text: 'Oscar',
  },
  4: {
    image: 'https://placekitten.com/200/204',
    text: 'Dusty',
  },
  5: {
    image: 'https://placekitten.com/200/205',
    text: 'Spooky',
  },
  6: {
    image: 'https://placekitten.com/200/210',
    text: 'Kiki',
  },
  7: {
    image: 'https://placekitten.com/200/215',
    text: 'Smokey',
  },
  8: {
    image: 'https://placekitten.com/200/220',
    text: 'Gizmo',
  },
  9: {
    image: 'https://placekitten.com/220/239',
    text: 'Kitty',
  },
};
class Basic extends React.Component {
  render() {
    console.log('hey from row')
    console.log(this.props, 'this is props')
    console.log(data, 'dayInfo');
    return (
      <View style={styles.container}>
        <Text style={styles.title}>React Native Sortable List</Text>
        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={data}
          renderRow={this._renderRow} />
      </View>
    )
  }
  _renderRow = ({data, active}) => {
    return <Event data={data} active={active} />
  }
}




export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.openNewMap = this.openNewMap.bind(this);
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
      })
    };
  }
  
  openNewMap() {
    // Get the coordinates out of the event's info
    openMap({ latutude: 40.7128, longitude: -74.0060 });
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
    console.log('this is props', this.props);
    console.log('dayinfo', this.props.dayInfo);
    const events = Object.keys(this.props.dayInfo);
    const { dayInfo } = this.props;
    let active = 0;
    console.log('this is data', dayInfo);
    console.log('this is active', active);
    const eventNames = events.map((event, i) => (<Text key={`day${i}`} >{this.props.dayInfo[event].name}</Text>));
    const eventCoordinates = events.map((event) => { 
      return { title: this.props.dayInfo[event].name, coordinates: this.props.dayInfo[event].location };
    });
    const eventMarkers = eventCoordinates.map(coor => (<MapView.Marker coordinate={coor.coordinates} title={coor.title} key={coor.title} />));
    const startingPoint = {
      latitude: this.props.dayInfo[0].location.latitude,
      longitude: this.props.dayInfo[0].location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    return (
      <View style={styles.container}>
        <Image source={logo} style={{ width: 100, height: 100 }} />
        <View style={{ width: 200, height: 200 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={startingPoint}
          >
            {eventMarkers}
          </MapView>
        </View>
        {eventNames}
        <Animated.View style={[
          styles.row,
          this._style,
        ]}>
          {/* <Image source={{uri: data.image}} style={styles.image} /> */}
          <Text style={styles.text}>{dayInfo.name}</Text>
        </Animated.View>
        <Button
          title="Go to Dashboard"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
      </View>
    );
  }
}
