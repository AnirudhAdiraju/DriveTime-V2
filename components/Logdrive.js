import * as React from 'react';
import {View, StyleSheet,TouchableWithoutFeedback, Picker, Keyboard,TextInput, Image, ImageBackground, TouchableOpacity, Alert, Dimensions} from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment'; 
import RNPickerSelect from 'react-native-picker-select';
import { getSunrise, getSunset } from 'sunrise-sunset-js';


export default class Login extends React.Component {

  state = {
    date: moment().format("MM-DD-YYYY"),
    time: moment().format('h:mm A'),
    minutes: global.minutes,
    description: '',
    road: '',
    weather: '',
    loading: false
};


static navigationOptions = { headerMode: 'none', gestureEnabled: false };
  render() {
    const placeholder = {
      label: 'Select a road type...',
      value: null,
      color: '#9EA0A4',
    };
    const placeholder2 = {
      label: 'Select weather...',
      value: null,
      color: '#9EA0A4',
    };
    const entireScreenHeight = Dimensions.get('window').height;
    const rem = entireScreenHeight / 380;
    const entireScreenWidth = Dimensions.get('window').width;
    const wid = entireScreenWidth / 380;
    var ree;
    console.log(global.uname);
    console.log(global.minutes);
    
    if (entireScreenWidth>=entireScreenHeight*3/4*1360/2360 *0.9){
      ree = rem;
    }
    else{
      ree = 1.75*wid;
    }
    const pickerStyle = {
      inputIOS: {
        color: 'black',
        alignSelf: 'center',
        fontSize: 12*ree,
        paddingBottom: 3*ree
      },
      inputAndroid: {
        color: 'black',
        alignSelf: 'center',
        fontSize: 12*ree,
        paddingBottom: 3*ree
      },
      
    };
    const onPress = () => {
        var uname = String(global.username);
        var date = String(this.state.date);
        var time = String(this.state.time);
        var minutes = String(this.state.minutes);
        var description = String(this.state.description).trim().replace(/\n/g, " ");
        var road = this.state.road;
        var sunset = moment(String(moment(getSunset(42.2204892, -87.9803604, new Date(String(moment(this.state.date,"MM-DD-YYYY").format('YYYY-MM-DD'))))).add(30,'minutes').format('h:mm A')),'h:mm A');
        var time = moment(String(this.state.time),'h:mm A');
        var night = sunset.isBefore(time) ? 'Night' : 'Day';
        var weather = this.state.weather;
        console.log(night);
        var pword = '';
        if (uname==''){
          alert("Please log in again");
        }
        else if (date!='' && time !='' && minutes !='' && road != null && weather !=null && description !=''){
        this.setState({loading: true});
      const Http = new XMLHttpRequest();
        const url='https://script.google.com/macros/s/AKfycbz21dke8ZWXExmF9VTkN0_3ITaceg-3Yg-i17lO31wtCC_0n00/exec';
        var data = "?username="+uname+"&password="+pword+"&action=addhours";
        Http.open("GET", String(url+data));
        Http.send();
        var ok;
        Http.onreadystatechange = (e) => {
            ok = Http.responseText;
        if (Http.readyState == 4)
        {
          if(String(ok) == "true"){
            this.props.navigation.navigate('Main')
            }
            else{
              alert("Failed to save");
            }
            this.setState({loading: false});
        }
        }
    }
    else{
      alert("Please fill all fields");
    }
  }
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
        <View style={styles.container}>
        
        <ImageBackground source={require('../assets/login.png')} style={styles.image}>
<View style = {{flex:1, width: '90%', alignItems: 'center'}}>
          <Image source={require('../assets/drivelog.png')} style = {{
    height: '100%',
    width: '84%',
    marginTop:'10%',
    flex: 1,
  }}resizeMode="contain"></Image></View>
  <ImageBackground source={require('../assets/bigform.png')} style = {{
    alignItems: 'center',
    flex:6,
    width: '100%'
  }}resizeMode="contain">
  <View style = {{flex:1.4, width: '100%',alignItems: 'center', justifyContent: 'center'}}>
  <TextInput
        style={{ fontSize: 8*rem, width: 200*wid, marginTop: 20*ree, }}
        textAlign={'center'}
        onChangeText={(value) => this.setState({description: value})}
        value={this.state.description}
        multiline={true}
        maxHeight = {8*rem*3.1}
        
    />
  </View>
 <View style = {{flex:1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
 <DatePicker
        style={{width: 250*wid, marginTop: 10*ree}}
        date={this.state.date}
        mode="date"
        maxDate = {moment().format("MM-DD-YYYY")}
        format="MM-DD-YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon = {false}
        customStyles={{

          dateInput:{borderWidth: 0},
          dateText: {
            fontSize: 12*rem,
        }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      </View>
      <View style = {{flex:1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
     <DatePicker
        style={{width: 250*wid, marginTop: 6*ree}}
        date={this.state.time}
        mode="time"
        format={'h:mm A'}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon = {false}
        showTime={{ use12Hours: true }}
        customStyles={{

          dateInput:{borderWidth: 0},
          dateText: {
            fontSize: 12*rem,
          }
        }}
        onDateChange={(date) => {this.setState({time: date})}}
      /></View>
      <View style = {{flex:1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        style={{ fontSize: 12*rem, width: 200*wid, marginTop: 0*ree, }}
        textAlign={'center'}
        onChangeText={(value) => this.setState({minutes: value})}
        keyboardType= 'number-pad'
        value={this.state.minutes}
        maxLength={3}
        
    />
      </View>
      <View style = {{flex:1, width: '100%',justifyContent: 'center', alignItems: 'center'}}>
      <RNPickerSelect
      style={pickerStyle}
      placeholderTextColor="red" 

      placeholder= {placeholder}
            onValueChange={(value) => this.setState({road: value})}
            items={[
                { label: 'Local', value: 'Local' },
                { label: 'Highway', value: 'Highway' },
                { label: 'Tollway', value: 'Tollway' },
                { label: 'Urban', value: 'Urban' },
                { label: 'Rural', value: 'Rural' },
                { label: 'Parking Lot', value: 'Parking Lot' },
            ]}
            
        />
      </View>
      <View style = {{flex:1, width: '100%',justifyContent: 'center', alignItems: 'center'}}>
      <RNPickerSelect
      style={pickerStyle}
      placeholderTextColor="red" 

      placeholder= {placeholder2}
            onValueChange={(value) => this.setState({weather: value})}
            items={[
                { label: 'Sunny', value: 'Sunny' },
                { label: 'Rain', value: 'Rain' },
                { label: 'Snow', value: 'Snow' },
                { label: 'Fog', value: 'Fog' },
                { label: 'Hail', value: 'Hail' },
                { label: 'Sleet', value: 'Sleet' },
                { label: 'Freezing Rain', value: 'Freezing Rain' },
            ]}
            
        />
      </View>

    
  </ImageBackground>
  <View style = {{
      width: '73%',
      flex:1,
      justifyContent:'center'
    }}>
    <TouchableOpacity
        style={{    
        height: entireScreenWidth*0.73*276/1096,
        width: '100%',}}
        onPress={onPress}
        disabled={this.state.loading}
        
      >
        <Image source={require('../assets/savebut.png')} style = {{
          height: '100%',
          width: '100%',
          flex:1
          

  }}resizeMode="contain"></Image>
      </TouchableOpacity>
      </View>
  
      </ImageBackground>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0, top: 0, position: 'absolute'

  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  imagefront: {
    marginTop: '8%',
    height: '25%',
    width: '80%',
    flex:2,

  },

});