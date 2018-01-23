import React from 'react';
import openMap from 'react-native-open-maps';
// import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, View, StyleSheet, Image, ImageBackground, ScrollView } from 'react-native';
import { MapView } from 'expo';
// https://github.com/react-community/react-native-maps for more information on how this library works
import logo from '../img/logo.png';
import { List, ListItem, Header } from 'react-native-elements';
import SortableGrid from 'react-native-sortable-grid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
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

  saveTrip() {
    const events = this.props.dayInfo;

    console.log(events);
  }


  render() {
    const events = Object.keys(this.props.dayInfo);
    const itemOrder = this.props.dayInfo;
    
    console.log('this is events', events);
    const eventNames = events.map((event, i) => (
      <View style={{ paddingBottom: 1 }} key={`event${i}`} ref={'event_num' + i}>
        <Text>{this.props.dayInfo[event].name}</Text>
      </View>
    ));
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
        <Header backgroundColor="#0e416d"
          centerComponent={{ text: 'wander', style: { color: 'white', fontSize: 40, fontWeight: 'bold' } }}

        />
        {/* <Image source={logo} style={{ width: 100, height: 100 }} /> */}
        <View style={{ width: 400, height: 200 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={startingPoint}
          >
            {eventMarkers}
          </MapView>
        </View>

        <SortableGrid
          blockTransitionDuration={400}
          activeBlockCenteringDuration={200}
          itemsPerRow={1}
          dragActivationTreshold={200}
          ref={ 'SortableGrid' }
          onDragRelease={(itemOrder) => console.log("Drag was released, the blocks are in the following order: ", itemOrder)}
          onDragStart={() => console.log("Some block is being dragged now!")} >

        
          {eventNames}

        </SortableGrid>

        <Button
          title="Save your Trip Recommendations"
          onPress={this.saveTrip}
        />
        <Button
          title="Go to Dashboard"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />

      </View>
    );
  }
}