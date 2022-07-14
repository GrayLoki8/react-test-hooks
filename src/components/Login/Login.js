import React, {useState, useEffect, useReducer, useContext} from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";
import Input from "../UI/Input/Input";
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
};
const passwordReducer=(prevState,action)=>{
  if(action.type==='USER_INPUT'){
    return{
      value:action.value,
      isValid:action.value.trim().length>6
    }
  }
  if (action.type==='INPUT_BLUR'){
    return {
      value: prevState.value,
      isValid:prevState.isValid
    }
  }
  return{
    value:"",
    isValid:false
  }
};
const Login = (props) => {

//  const [inputEmail, setInputEmail] = useState("");
  //const [emailIsValid, setEmailIsValid] = useState();
 // const [inputPassword, setInputPassword] = useState("");
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const[emailState,dispatchEmailState]=useReducer(emailReducer,{value:'',isValid:undefined});
  const[passwordState,dispatchPasswordState]=useReducer(passwordReducer,{value:'',isValid:undefined});

  const{isValid:emailIsValid}=emailState;
  const{isValid:passwordIsValid}=passwordState;
  const ctx=useContext(AuthContext);

  useEffect(()=>{
    const timer=setTimeout(()=>{
      setFormIsValid(
          emailIsValid && passwordIsValid
      );
    },1000);
        return ()=>{
          clearTimeout(timer);
        }
  },[emailIsValid,passwordIsValid]);

  const emailChangeHandler = (event) => {
  dispatchEmailState({type:'USER_INPUT',value:event.target.value});
    setFormIsValid(
        passwordState.isValid && emailState.isValid
    );

  };
  const passwordChangeHandler = (event) => {
    dispatchPasswordState({type:'USER_INPUT',value:event.target.value});
    setFormIsValid(
        passwordState.isValid && emailState.isValid
        );

  };

  const validateEmailHandler = () => {
    dispatchEmailState({type:'INPUT_BLUR'});

  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({type:'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>

        <Input id="email" label="email" type="email" isValid={emailIsValid} value={emailState.value}
        onChange={emailChangeHandler} onBlur={validateEmailHandler}>

        </Input>
          <Input id="password" label="Password" type="password" isValid={passwordIsValid} value={passwordState.value}
                 onChange={passwordChangeHandler} onBlur={validatePasswordHandler}>

          </Input>
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
