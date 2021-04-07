import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { UserContext } from "../../App";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { state, dispatch } = useContext(UserContext);

  const sendDataSignup = () => {
    fetch("http://127.0.0.1:5000/user/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        passwordConfirm,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          // M.toast({
          //   html: "Signed-Up successfully}",
          //   classes: "#43a047 green darken-1",
          // });
          console.log(data.data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          dispatch({ type: "USER", payload: data.data.user });
          history.push("/report");
        } else if (data.status === "error") {
          if (data.error.errors.name) {
            // M.toast({
            //   html: data.error.errors.name.message,
            //   classes: "#c62828 red darken-1",
            // });
          }
          if (data.error.errors.email) {
            // M.toast({
            //   html: data.error.errors.email.message,
            //   classes: "#c62828 red darken-1",
            // });
          }
          if (data.error.errors.password) {
            // M.toast({
            //   html: data.error.errors.password.message,
            //   classes: "#c62828 red darken-1",
            // });
          }
          if (data.error.errors.passwordConfirm) {
            // M.toast({
            //   html: data.error.errors.passwordConfirm.message,
            //   classes: "#c62828 red darken-1",
            // });
          }
        } else {
          // M.toast({
          //   html: "Please check your network connection",
          //   classes: "#c62828 red darken-1",
          // });
        }
      });
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            // console.log(fullName);
          }}
          style={{
            border: "1px solid lightgrey",
            borderRadius: "5px",
            marginBottom: "5px",
          }}
          type="text"
          placeholder="Full Name"
        />
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // console.log(email);
          }}
          style={{
            border: "1px solid lightgrey",
            borderRadius: "5px",
            marginBottom: "5px",
          }}
          type="email"
          placeholder="Email"
        />
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            // console.log(password);
          }}
          style={{
            border: "1px solid lightgrey",
            borderRadius: "5px",
            marginBottom: "5px",
          }}
          type="password"
          placeholder="Password"
        />
        <Input
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
            // console.log(passwordConfirm);
          }}
          style={{
            border: "1px solid lightgrey",
            borderRadius: "5px",
            marginBottom: "5px",
          }}
          type="password"
          placeholder="Confirm Password"
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton onClick={() => sendDataSignup()} type="submit">
        Signup
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink>
        Already have an account?
        <BoldLink onClick={switchToSignin}>Signin</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
