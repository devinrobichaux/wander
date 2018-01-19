import React from 'react';
import openMap from 'react-native-open-maps';
// import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, View, StyleSheet, Image, Row } from 'react-native';
import { MapView } from 'expo';
// https://github.com/react-community/react-native-maps for more information on how this library works
import logo from '../img/logo.png';
import SortableListView from 'react-native-sortable-listview'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: window.width,
    paddingHorizontal: 30,
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
    width: window.width - 30 * 2,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOpacity: 1,
    shadowOffset: {height: 2, width: 2},
    shadowRadius: 2,
  },
  text: {
    fontSize: 24,
    color: '#222222',
  },
});




export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.openNewMap = this.openNewMap.bind(this);
  }
  
  openNewMap() {
    // Get the coordinates out of the event's info
    openMap({ latutude: 40.7128, longitude: -74.0060 });
  }
  
  render() {
    console.log('dayinfo', this.props.dayInfo);
    const events = Object.keys(this.props.dayInfo);
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
        <SortableListView
        style={{ flex: 1 }}
        data={eventNames}
        onRowMoved={e => {
          eventNames.splice(e.to, 0, eventNames.splice(e.from, 1)[0])
          this.forceUpdate()
        }}
        renderRow={row => <RowComponent data={row} />}
      />
        <Button
          title="Go to Dashboard"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
      </View>
    );
  }
  _renderRow = ({eventNames, active}) => {
    return <Row data={eventNames} active={active} />
  }
}

class Row extends React.Component {

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            })
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
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
   const {eventNames, active} = this.props;

    return (
      <Animated.View style={[
        styles.row,
        this._style,
      ]}>
        {/* <Image source={{uri: data.image}} style={styles.image} /> */}
    <Text style={styles.text}>{eventNames}</Text>
      </Animated.View>
    );
  }
}