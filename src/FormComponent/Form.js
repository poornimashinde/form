import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
import './Form.css'


class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      emailid: "",
      mobileno: "",
      age: "",
      showAge :false,
      errors:{},
      displayValue: false
    }


  };


  DisplayAge =()=>{ if(this.state.emailid.length > 0) this.setState({showAge:true})}

  handleFullName = (e) => this.setState({ fullname: e.target.value })

  handleMobChange = (e) => this.setState({ mobileno: e.target.value })

  handleageChange = (e)=> this.setState({ age: e.target.value })

  handleEmailChange = (e) => {
      this.setState({ emailid: e.target.value })
      this.DisplayAge()
     }
  
     

  submituserRegistrationForm = (e) => {
    e.preventDefault();
    if (this.validateForm()) this.setState({displayValue: true})
    }

  validateForm() {

    const {emailid, mobileno,age} = this.state;
    let errors = {};
    let formIsValid = true;

    if (!emailid) {
      formIsValid = false;
      errors.emailid = "*Please enter your email-ID.";
    }
    if (emailid) {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(emailid)) {
        formIsValid = false;
        errors.emailid = "*Please enter valid email-ID.";
      }
    }

    if (!mobileno) {
      formIsValid = false;
      errors.mobileno= "*Please enter your mobile no.";
    }

    if (mobileno) {
      if (!mobileno.match(/^[0-9]*$/)) {
        formIsValid = false;
        errors.mobileno = "*Please enter valid 10 digit mobile no.";
      }
    }

    if (!age) {
      formIsValid = false;
      errors.age = "*Please enter your age.";
    }

    if (age) {
      if (!age.match(/^[0-9]*$/)) {
        formIsValid = false;
        errors.age = "*Please enter proper age in digits.";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }



  render() {
    const {displayValue, showAge, emailid, mobileno, age, fullname}= this.state;
    return (

      <form onSubmit={this.submituserRegistrationForm} >
      
       <label>Full Name:</label>
          <input type="text"
            name="fullname"
            value={fullname} 
            onChange={this.handleFullName} />
        <div className="errorMsg">{this.state.errors.fullname}</div>
      
      <label>Email Id:</label>
          <input type="text"
            name="emailid"
            value={emailid} 
            onChange={this.handleEmailChange} />
        <div className="errorMsg">{this.state.errors.emailid}</div>
   
        <label>Mobile No:</label>
          <input type="text"
          name="mobileno"
          maxLength="10"
          value={mobileno}
          onChange={this.handleMobChange} />
       <div className="errorMsg">{this.state.errors.mobileno}</div>

       {showAge  && <div><label>Age</label>
          <input type="text" 
          name="age" 
          value={age} 
          maxLength="3"
          onChange={this.handleageChange} /></div>}
        {showAge && <div className="errorMsg">{this.state.errors.age}</div>}
        <input type="submit" className="button" value="Register" />


       {displayValue && <div className= "fixed-bottom  bgwhite">
         <p>Email:{emailid}</p>
         <p>MobNo:{mobileno}</p>
         <p>Age:{age}</p>
       </div>}
      </form>
    );
  }


}


export default Form;
