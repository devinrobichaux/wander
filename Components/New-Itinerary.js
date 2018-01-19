import React from 'react';
import {
  Text,
  Button,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import logo from '../img/logo.png';
import { keys } from '../config';
import { schedule1 } from '../scheduleExample';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default class NewItinerary extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      startDateTimePickerVisible: false,
      endDateTimePickerVisible: false,
      destination: '',
    };
    this.getItinerary = this.getItinerary.bind(this);
    this.showStartDateTimePicker = this.showStartDateTimePicker.bind(this);
    this.showEndDateTimePicker = this.showEndDateTimePicker.bind(this);
    this.hideStartDateTimePicker = this.hideStartDateTimePicker.bind(this);
    this.hideEndDateTimePicker = this.hideEndDateTimePicker.bind(this);
    this.handleStartDatePicked = this.handleStartDatePicked.bind(this);
    this.handleEndDatePicked = this.handleEndDatePicked.bind(this);
    this.searchPlaces = this.searchPlaces.bind(this);
  }

  getItinerary() {
    console.log(this.state.startDate);
    console.log(this.state.endDate);
    console.log(this.state.destination);
    // Build the itinerary
    this.props.navigation.navigate('Itinerary', { dayInfo: schedule1 });
  }

  showStartDateTimePicker() {
    this.setState({ startDateTimePickerVisible: true });
  }

  showEndDateTimePicker() {
    this.setState({ endDateTimePickerVisible: true });
  }

  hideStartDateTimePicker() {
    this.setState({ startDateTimePickerVisible: false });
  }

  hideEndDateTimePicker() {
    this.setState({ endDateTimePickerVisible: false });
  }

  handleStartDatePicked(date) {
    console.log('A start date has been picked: ', date);
    this.setState({ startDate: date });
    this.hideStartDateTimePicker();
  }

  handleEndDatePicked(date) {
    console.log('An end date has been picked: ', date);
    this.setState({ endDate: date });
    this.hideEndDateTimePicker();
  }

  searchPlaces(data) {
    // The city, state, and country is saved in the description key
    console.log(data.description);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} style={{ width: 100, height: 100 }} />
        <GooglePlacesAutocomplete
          placeholder="Where are you Wandering?"
          minLength={2}
          autoFocus={false}
          returnKeyType="search"
          query={{
            key: keys.googleAPI,
            language: 'en',
            types: '(cities)',
          }}
          styles={{
            textInputContainer: {
              width: '100%',
              marginBottom: 10,
            },
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          debounce={200}
          onPress={this.searchPlaces}
        />
        <Text>When are you leaving?</Text>
        <TouchableOpacity onPress={this.showStartDateTimePicker}>
          <Text style={{ color: 'blue', fontSize: 20 }}>Select a date</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.startDateTimePickerVisible}
          onConfirm={this.handleStartDatePicked}
          onCancel={this.hideStartDateTimePicker}
        />
        <Text>When do you come back?</Text>
        <TouchableOpacity onPress={this.showEndDateTimePicker}>
          <Text style={{ color: 'blue', fontSize: 20 }}>Select a date</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.endDateTimePickerVisible}
          onConfirm={this.handleEndDatePicked}
          onCancel={this.hideEndDateTimePicker}
        />
        <Button
          title="Go to Dashboard"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
        <Button
          title="Get my itinerary"
          onPress={this.getItinerary}
        />
      </View>
    );
  }
}

NewItinerary.propTypes = {
  navigation: PropTypes.object,
};
