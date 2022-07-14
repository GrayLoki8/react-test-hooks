import React, { useState,useEffect,useReducer } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
const emailReducer=(prevState,action)=>{
  if(action.type==='USER_INPUT'){
    return{
      value:action.value,
      isValid:action.value.includes('@')
    }
  }
  if (action.type==='INPUT_BLUR'){
    return {
      value: prevState.value,
      isValid: prevState.value.includes('@')
    }
  }
  return{
    value:"",
    isValid:false
  }
}
const Login = (props) => {
//  const [inputEmail, setInputEmail] = useState("");
  //const [emailIsValid, setEmailIsValid] = useState();
  const [inputPassword, setInputPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect(()=>{
  //   const timer=setTimeout(()=>{
  //     setFormIsValid(
  //         inputPassword.trim().length > 6 && inputEmail.includes("@")
  //     );
  //   },1000);
  //       return ()=>{
  //         clearTimeout(timer);
  //       }
  // },[inputEmail,inputPassword]);
  // const emailChangeHandler = (event) => {
  //   setInputEmail(event.target.value);
  //
  //
  // };
  const[emailState,dispatchEmailState]=useReducer(emailReducer,{value:'',isValid:undefined});
  const emailChangeHandler = (event) => {
  dispatchEmailState({type:'USER_INPUT',value:event.target.value});
    setFormIsValid(
        inputPassword.trim().length > 6 && emailState.isValid
    );

  };
  const passwordChangeHandler = (event) => {
    setInputPassword(event.target.value);
    setFormIsValid(
            inputPassword.trim().length > 6 && emailState.isValid
        );

  };

  const validateEmailHandler = () => {
    dispatchEmailState({type:'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(inputPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, inputPassword);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
              emailState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={inputPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
