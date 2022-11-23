import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.includes("@"),
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@"),
    };
  }
  return {
    value: "",
    isValid: false,
  };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
    };
  }
  return {
    value: "",
    isValid: false,
  };
};

const Login = (props) => {
  //use of useState() to manage state individually
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //used useReducer() to manage related states together
  const [emailState, emailDispatcher] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, passwordDispatcher] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // useEffect(()=>{
  //   if(enteredEmail.includes("@") && enteredPassword.trim().length > 6){
  //     setFormIsValid(true);
  //   }
  // },[enteredEmail,enteredPassword])

  const { isValid : emailIsValid } = emailState;
  const { isValid : passwordIsValid } = passwordState;

  useEffect(() => {
    //useEffect cleanup with return function
    const timer = setTimeout(() => {
    //  console.log("Checking Validity");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
    //  console.log("Cleanup");
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    //  setEnteredEmail(emailState.value);

    emailDispatcher({
      type: "USER_INPUT",
      val: event.target.value,
    });

    // if (event.target.value.includes("@") && passwordState.isValid) {
    //   setFormIsValid(true);
    // }
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);

    passwordDispatcher({
      type: "USER_INPUT",
      val: event.target.value,
    });

    // if (emailState.isValid && event.target.value.trim().length > 6) {
    //   setFormIsValid(true);
    // }
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);

    emailDispatcher({
      type: "INPUT_BLUR",
    });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    passwordDispatcher({
      type: "INPUT_BLUR",
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
