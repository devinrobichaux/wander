import React from 'react';
import { Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements'
import axios from 'axios';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    backgroundColor: '#fff',
    alignItems: 'center',
    fontSize: 60,
    fontWeight: 'bold',
  },
  button: {
    // alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '100%',
  },
});

export default class GatherInterests extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    selected: [],
    types: []
  }
    // this.handleClick = this.handleClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
    // this.componentWillMount = this.componentWillMount.bind(this);
  };
  componentWillMount() {

    var self = this;

    axios.get('http://18.218.102.64/types')
    .then(function (response) {
      console.log(response);
      self.setState({ types: response.data.map(type => type.name )});
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  handleClick(e) {
    console.log(e.target, 'just a string');
  }
  handleNext() {
    // Send information to database
    this.props.navigation.navigate('Dashboard');
  }
  render() {
    const interests = [];
    


    for (let i = 0; i < this.state.types.length; i += 1) {
      let name = this.state.types[i];
      name = `${name.replace(/_{1,}/g,' ').replace(/(\s{1,}|\b)(\w)/g, function(m, space, letter) {
        return space + letter.toUpperCase();
      })}s`

      interests.push(
        <Button
          large
          raised
          buttonStyle={{backgroundColor: '#0e416d', width: 500, marginVertical: 5 }}
          // style={styles.button}
          icon={{name: 'envira', type: 'font-awesome'}}
          onPress={this.handleClick.bind(this)}
          key={i}
          title={name}
        />
          // ,{/* <Text>interests {i}</Text> */}
        );
    }
    return (
      <ScrollView contentContainerStyle={styles.container} >
        <Text style={styles.titleText}>wander</Text>
        <Text style={{ fontSize: 18 }}>Tell us what you like to do when you're on vacation</Text>
        {interests}
        <Button
          large
          raised
          buttonStyle={{backgroundColor: 'green'}}
          title="Next"
          onPress={this.handleNext}

        />
      </ScrollView>
    );
  }
}

GatherInterests.propTypes = {
  navigation: PropTypes.object,
};
