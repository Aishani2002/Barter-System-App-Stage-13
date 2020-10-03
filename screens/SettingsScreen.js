import React,{Component} from 'react';
import {View,Text,TextComponent, TouchableOpacity, Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class SettingsScreen extends Component(){
    constructor (){
        super();
        this.state={
            firstName:"",
            lastName:"",
            address:"",
            contactNumber:"",
            emailId:"",
            docId:"",
        };
    }

getUserDetails(){
    var user = firebase.auth().currentUser
    var email= user.email
    db.collection("users").where("email_Id","==",email).get()
    .then(snapshot =>{
        snapshot.forEach(doc=>{
            var data=doc.data()
            this.setState({
                emailId:data.email_Id,
                firstName:data.first_name,
                lastName:data.last_name,
                contactNumber:data.mobile_number,
                address:data.address,
                docId:doc.id,
            })
        })
    })
}

componentDidMount() {
    this.getUserDetails()
}

updateUserDetails=()=>{
db.collection('users').doc(this.state.docId)
.update({
    "first_name":this.state.firstName,
    "last_name":this.state.lastName,
    "address":this.state.address,
    "mobile_number":this.state.contactNumber,
})
Alert.alert("Profile Updates Successfully")
}

render() {
    return(
        <View style={styles.container}>
        <MyHeader title="Settings" navigator={this.props.navigation}/>
        <View style={styles.formContainer}>
        <TextInput style={styles.formTextInput}
        placholder={"First Name"}
        maxLength={8}
        onChangeText={(text)=>{
            this.setState({firstName: text})
        }}
        value={this.state.firstName}
        />
        <TextInput style={styles.formTextInput}
        placholder={"Last Name"}
        maxLength={8}
        onChangeText={(text)=>{
            this.setState({lastName: text})
        }}
        value={this.state.lastName}
        />
        <TextInput style={styles.formTextInput}
        placholder={"Address"}
        multiLine={true}
        onChangeText={(text)=>{
            this.setState({address: text})
        }}
        value={this.state.address}
        />
        <TextInput style={styles.formTextInput}
        placholder={"Contact Number"}
        maxLength={10}
        onChangeText={(text)=>{
            this.setState({contactNumber: text})
        }}
        value={this.state.contactNumber}
        />
        <TextInput style={styles.formTextInput}
        placholder={"Email address"}
        keyBoardType={"email-address"}
        onChangeText={(text)=>{
            this.setState({emailId: text})
        }}
        value={this.state.emailId}
        />

        <TouchableOpacity style={styles.button} 
        onPress={()=>{this.updateUserDetails()}}>
            <Text style={styles.buttonText}>
                Save
            </Text>
        </TouchableOpacity>
        </View>
        </View>
    )
}
}

const styles = StyleSheet.create({
container: {
flex:1,
alignItems: 'center',
justifyContent: 'center',
},

formContainer:{
flex:1,
wdith:"100%",
alignItems: 'center',
},

formTextInput:{
width:"75%",
height:35,
alignSelf:"center",
borderColour:"ffab91",
borderRadius:10,
borderWidth:1,
marginTop:20,
padding:10
},

button:{
width:"75%",
height:50,
justifyContent:"center",
alignItems: 'center',
borderRadius:10,
backgroundColor:"ff5722",
shadowColor:"#000000",
shadowOffset:{width:0, height:8},
shadowOpacity:0.44,
shadowRadius:10.32,
elevation:16,
marginTop:10,
},

buttonText:{
fontSize:25,
fontWeight:"bold",
color:"#ffffff",
}
})

