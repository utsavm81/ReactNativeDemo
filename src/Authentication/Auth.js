import React, {Component} from 'react';
import { Platform,StyleSheet,View,TouchableOpacity,Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Routes from '../router/routes';
import { CommonActions } from '@react-navigation/routers';

class Auth extends Component {
  constructor(props){
    super(props);
    this.state={
      email: '',
      password: '',
    };
  }
 
  componentDidMount(){
    const {email,password} = this.props.route.params;
    this.setState({email:email,password:password});

    this.checkAuthenticate();
  }

  resetToAuth = CommonActions.reset({
    index:0,
    routes:[
      {name:Routes.Authenticate},
    ]
  });

  checkAuthenticate = async () => {
    try {
      let user = await AsyncStorage.getItem('Register');
      let parsed = JSON.parse(user);

      if (
        parsed.email === this.state.email &&
        parsed.password === this.state.password
      )
       {// this.state.isAuthenticated=true;
        
        this.props.navigation.dispatch(this.resetToAuth);
       }
      else {
        Alert.alert('Email or Password not valid');
        this.props.navigation.navigate(Routes.Login);
      }
    } catch (error) {
      alert("You don't have account!");
      this.props.navigation.navigate(Routes.Login);

      //
    }
  }
  
    render() { 
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          {/* <Image source={require('../assets/images/error.jpg')}/> */}
        </View>
      );
    }
}

export default Auth;
