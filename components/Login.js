import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity, Alert, Dimensions} from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator, createAppContainer } from 'react-navigation';



export default class Login extends React.Component {
  state = {
    username: '',
    password: ''
};
static navigationOptions = { header: null };
  render() {
    const entireScreenHeight = Dimensions.get('window').height;
    const rem = entireScreenHeight / 380;
    const entireScreenWidth = Dimensions.get('window').width;
    const wid = entireScreenWidth / 380;
    const onPress = () => {
      var uname = this.state.username;
        var pword = this.state.password;
      const Http = new XMLHttpRequest();
        const url='https://script.google.com/macros/s/AKfycbz21dke8ZWXExmF9VTkN0_3ITaceg-3Yg-i17lO31wtCC_0n00/exec';
        var data = "?username="+uname+"&password="+pword+"&action=login";
        Http.open("GET", String(url+data));
        Http.send();
        var ok;

        Http.onreadystatechange = (e) => {
            ok = Http.responseText;
        if (Http.readyState == 4)
        {
          if(String(ok) == "true"){
            alert("yay");
            this.props.navigation.navigate('Main')
            }
            else{
              alert("failed login");
              console.log(ok);
            }
        }
        }
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/login.png')} style={styles.image}>
          <Image source={require('../assets/car1.png')} style = {styles.imagefront} resizeMode="contain"></Image>
          <Image source={require('../assets/dtime.png')} style = {{
    marginTop: '3%',
    height: '5%',
    width: '74%'
  }}resizeMode="contain"></Image>
  <ImageBackground source={require('../assets/form.png')} style = {{
    width: '100%',
    height: '65%',
    alignItems: 'center',
    marginTop: '5%',
    
    
    
  }}resizeMode="default">
   
    <TextInput
        style={{marginTop: 41*rem, fontSize: 12*rem, width: 200*wid}}
        textAlign={'center'}
        onChangeText={(value) => this.setState({username: value})}
        value={this.state.username}
    />
    <TextInput
        style={{marginTop: 47*rem, fontSize: 12*rem, width: 200*wid}}
        textAlign={'center'}
        onChangeText={(value) => this.setState({password: value})}
        value={this.state.password}
        secureTextEntry={true}
    />
    <View style = {{
      height: '26%',
      width: '60%',
      marginTop: '25%',

    }}>
    <TouchableOpacity
        style={{    
        }}
        onPress={onPress}
      >
        <Image source={require('../assets/logbut.png')} style = {{
          height: '100%',
          width: '100%',

  }}resizeMode="cover"></Image>
      </TouchableOpacity>
      </View>
  </ImageBackground>
  
  
      </ImageBackground>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  imagefront: {
    marginTop: '15%',
    height: '16%',
    width: '80%'
  },

});
