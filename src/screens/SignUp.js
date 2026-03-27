
import React, { Component, useState, useEffect } from 'react';
import { Image, StyleSheet, SafeAreaView, TextInput, ImageBackground, 
    View, Text, TouchableOpacity, CheckBox } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import {colors,urls,dimensions} from '../utils/constants';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as axios from 'axios'
import {useSelector, useDispatch} from 'react-redux';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { addUser } from '../redux/actions/user_actions';

function SignUp(props) {

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobie] = useState("");

  //errors

  const [errorfirstname, seterrorfirstname] = useState("");
  const [errorlastname, seterrorlastname] = useState("");
  const [errorpassword, seterrorpassword] = useState("");
  const [erroremail, seterroremail] = useState("");
  const [errormobie, seterrormobie] = useState("");
  const [PasswordBoolean, setPasswordBoolean] = useState(true);
  const [EyeBoolean, setEyeBoolean] = useState(require('../assets/masked_eye.png'));


  const [isSelected, setSelection] = useState(false);  
  const langReducer = useSelector(state => state.langReducer)

  
  useEffect(() =>{
 
  })

  const dispatch =  useDispatch();

  const onChangeFirstName = (e) => {
    setfirstname(e);
    }

  const onChangeLastName = (e) => {
    setlastname(e);
    }

  const onChangeMobile = (e) => {
    setmobie(e);
  }

  const onChangeEmail = (e) => {
    setemail(e);
  }

  const onChangePassword = (e) => {
    setpassword(e);
    }

    
  const onChangePasswordBoolean = () => {
    if(PasswordBoolean == true){
      setPasswordBoolean(false);
      setEyeBoolean(require('../assets/eye_white.png'))
    }else{
      setPasswordBoolean(true);
      setEyeBoolean(require('../assets/masked_eye.png'))

    }

    }


  const validateEmail =(email)=> {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
        return false;
    }
    else {
        return true;
    }
  }

  const validate = () => {

      let flag = false;
      var letters = /^[A-Za-z]+$/;
      
      if (firstname === "" || firstname === null || firstname === undefined) {
        seterrorfirstname("Username is required");
        if(langReducer.lang =='en') {
          seterrorfirstname("Username is required");
        }else{
          seterrorfirstname("Se requiere nombre de usuario");
          }
        flag = true;
      }
      // else if(letters.test(firstname) === false ){
      //   seterrorfirstname("Only alphabets are allowed");
      // }
      else{
        seterrorfirstname("");
      }

      // if (lastname === "" || lastname === null || lastname === undefined) {
      //     seterrorlastname("Last Name is required");
      //     flag = true;
      // }else if(letters.test(lastname) === false ){
      //   seterrorlastname("Only alphabets are allowed");
      // }else{
      //   seterrorlastname("");
      // }

      if (mobile === "" || mobile === null || mobile === undefined) {
        // seterrormobie("Mobile no. is required");
        if(langReducer.lang =='en') {
          seterrormobie("Mobile no. is required");
        }else{
          seterrormobie("No móviles. es requerido");
          }
        flag = true;
      }else if(mobile !== "" || mobile !== null || mobile !== undefined) {

        if(mobile.length < 7 || mobile.length > 15){
          // seterrormobie("Mobile no. should be min. of 7 digits and maximum of 15 digits.");
          if(langReducer.lang =='en') {
            seterrormobie("Mobile no. should be min. of 7 digits and maximum of 15 digits.");
          }else{
            seterrormobie("No móviles. debe ser min. de 7 dígitos y máximo de 15 dígitos.");
            }
            flag = true;
        }else{
          seterrormobie("");
        }
        if(!/^[0-9]*$/.test(mobile)){
          if(langReducer.lang =='en') {
            seterrormobie("Mobile no. should be in digits.");
            }else{
              seterrormobie("No móviles. debe estar en dígitos.");
                }
            flag = true;
            
        }
      }
    
    
      if (password === "" || password === null || password === undefined) {
        // seterrorpassword("Password is required");
        if(langReducer.lang =='en') {
          seterrorpassword("Password is required");
        }else{
          seterrorpassword("se requiere contraseña");
          }
        flag = true;
      }else if(password !== "" || password !== null || password !== undefined) {

        if(password.length < 6 || password.length > 25){
        // seterrorpassword("Password should be min. of 6 characters and maximum of 25 characters.");
        if(langReducer.lang =='en') {
          seterrorpassword("Password should be min. of 6 characters and maximum of 25 characters.");
        }else{
          seterrorpassword("La contraseña debe ser mínima. de 6 caracteres y máximo de 25 caracteres.");

          }
            flag = true;
                  }else{
                    seterrorpassword("");
                    
                  }
          }else{
            seterrorpassword("");
          }


      if (email === "" || email === null || email === undefined) {
        // seterroremail("Email is required");
        if(langReducer.lang =='en') {
          seterroremail("Email is required");
        }else{
          seterroremail("correo electronico es requerido");
        }
          flag = true;

      }else if(email !== "" || email !== null || email !== undefined) {
          
        if(!validateEmail(email)){
            // seterroremail("Please enter valid email id");
            if(langReducer.lang =='en') {
              seterroremail("Please enter valid email id");
            }else{
              seterroremail("Ingrese una identificación de correo electrónico válida");
            }
            flag = true;
        }else{
         seterroremail("");
        }

      }

      return flag;
  }


  const onSubmitForm = () => {
    if (!validate()) {
      console.log("in sign up")


    axios.post(urls.BASE_URL + 'register_user', {
      name: firstname,
      password: password,
      email: email,
      mobile: mobile,
      device_type:'1',
      device_token:'test'
    })
      .then(function (response) {
        console.log(response.data.message)
        if (response.data.error == true){


          if(langReducer.lang =='en') {
            Toast.show({
              type:  'error',
              text2: response.data.message
            }); 
          }else{
            Toast.show({
              type:  'error',
              text2: "El número de teléfono móvil o el correo electrónico se ha tomado."
            }); 
          
          }

          
         
        }else{
          // if(props.route.params.page == 'no_profile'){
          // props.navigation.push("tab") 
          // }else if(props.route.params.page == 'req'){
          //   props.navigation.push("ReqCal") 
          // }


          axios.post(urls.BASE_URL + 'login_user', {
            email: email,
            password: password,
            device_type:'1',
            device_token:'test'
          })
          .then(function (response) {
            console.log("In then of login")
            let obj = response.data.result
            dispatch(addUser(obj))
            if (response.data.error == false){
                props.navigation.push("tab")
            }
           })


           if(langReducer.lang =='en') {
              Toast.show({
                type:  'success',
                text2: 'User Registered Successfully.'
              });
            }else{

              Toast.show({
                type:  'success',
                text2: 'Usuario registrado correctamente.'
              });
              
            }
         
        }
          
      })
      .catch(error => {
        showMessage(error.message)
        console.log('error >>>>>>>>>>>>>>>>>>>>>')
    });
    
    }
  }

  return (

                <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView>
                <ImageBackground source={require('../assets/Splash.png')}  resizeMode="cover" style={styles.image_background}>
                <View style={{height:'100%',width:'100%'}}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Image style={styles.logo}
                source={require('../assets/logo.png')}/>
                </View>
                <View style={{flex:2,alignItems:'center'}}>

                <TextInput
                style={styles.input}
                placeholder={langReducer.lang =='en' ? "Username": "Nombre de usuario"}
                placeholderTextColor="white" 
                onChangeText = {(value)=> {onChangeFirstName(value)}}
                /><Text style={{color:"#B1003F"}}>{errorfirstname}</Text>

                <TextInput
                  style={styles.input}
                  onChangeText={onChangeMobile}
                  placeholderTextColor="white" 
                  // placeholder="Mobile Number"
                  placeholder={langReducer.lang =='en' ? "Mobile Number": "Número de teléfono móvil"}
                  keyboardType="numeric"
                 /><Text style={{color:"#B1003F"}}>{errormobie}</Text>

                  <TextInput
                  style={styles.input}
                  onChangeText={onChangeEmail}
                  // placeholder="Email"
                  placeholder={langReducer.lang =='en' ? "Email": "Correo electrónico"}
                  placeholderTextColor="white" 
                  /><Text style={{color:"#B1003F"}}>{erroremail}</Text>
             
              <View style={styles.input_back}> 
              <View style={{flex:1}}>
              <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              placeholderTextColor="white"
              placeholder={langReducer.lang =='en' ? "Password": "Contraseña"}
              // placeholder="Password"
              secureTextEntry={PasswordBoolean}
              />

              </View>

                <TouchableOpacity style={{alignSelf:'flex-end',marginBottom:10, borderRadius:50, width:40, height:40, bottom:-2, position:'absolute', right:10}}
                onPress={onChangePasswordBoolean}
                >
                
              <Image
              style={{height:16, width:25, top:16, left:7}}
              source={EyeBoolean}/>
              </TouchableOpacity>
              </View>
              <Text style={{color:"#B1003F"}}>{errorpassword}</Text>

                <TouchableOpacity  style={{height: 50,
                borderWidth: 1,
                width: 320,
                backgroundColor: '#B1003F',
                borderRadius:60,
                color:'white',
                borderColor:'grey',
                marginTop:50,
                alignItems:'center',
                justifyContent:'center'
                }} onPress={onSubmitForm}>
                <Text style={{color:"white"}}>{langReducer.lang =='en' ? "SignUp": "Inscribirse"}</Text>
                </TouchableOpacity>

                <View style={{marginTop:25,flexDirection:'row'}}>
                <Text style={styles.fontapply}>
                {langReducer.lang =='en' ? "Already have an account?": "Ya tienes una cuenta?"}</Text>
                <Text
                style={styles.fontapply_new}
                onPress={()=> props.navigation.navigate("Login")}>{langReducer.lang =='en' ? "Login": "Acceso"}</Text>
                </View>
                </View>
                </View>
                </ImageBackground>
                </KeyboardAwareScrollView>
                </SafeAreaView>
  );
};

export default SignUp;


const styles = StyleSheet.create({
  container:{
    flexDirection:'column',
  },
  logo: {
    width: 150,
    height: 122,
  },
  input: {
    height: 50,
    borderWidth: 1,
    width: 320,
    backgroundColor: '#B1003F',
    borderRadius:60,
    color:'white',
    paddingTop:10,
    paddingBottom:10,
    paddingRight:20,
    paddingLeft:20,
    borderColor:'grey',
    marginTop:6
  },
  input_back:{
    width: 320,
    alignItems:'center',
    height:50,
    flexDirection:'row',
    borderRadius:60,
    justifyContent:'center',
  },
  fontapply:{
    fontSize: 15,
  },
  fontapply_new:{
    fontSize: 15,
    fontWeight: "bold",
    marginLeft:5
  },
  view:{
    flexDirection:'column',
  },
  image_background: {
    height:870
  },

});


