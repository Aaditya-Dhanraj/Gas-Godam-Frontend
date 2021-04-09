import { useState, useContext } from "react";
import { UserContext } from "../../App";
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

import Notification from "../Home/Notification/Notification";

function LoginForm(props) {
  const [noti, setNoti] = useState(false);
  const { switchToSignup, switchToHome } = useContext(AccountContext);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  const [email, setEmail] = useState("daaditya552@gmail.com");
  const [password, setPassword] = useState("test1234");

  const sendDataLogin = () => {
    fetch("http://127.0.0.1:5000/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data.user);
        if (data.status === "success") {
          // M.toast({
          //   html: "Logged-In successfully}",
          //   classes: "#43a047 green darken-1",
          // });
          // console.log("dataLoginForm",data.data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          dispatch({ type: "USER", payload: data.data.user });
          setNoti(true);
          setTimeout(() => {
            history.push("/report");
          }, 2500);
        } else if (data.status === "Fail") {
          if (data.error) {
            // M.toast({
            //   html: data.message,
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
    <div>
      <Notification
        type="success"
        time={2000}
        message="Logged In Successfully"
        trigger={noti}
      />
      <BoxContainer>
        <FormContainer>
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
            style={{ border: "1px solid lightgrey", borderRadius: "5px" }}
            type="password"
            placeholder="Password"
          />
        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <MutedLink href="#">Forget your password?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton
          onClick={() => {
            sendDataLogin();
          }}
          type="submit"
        >
          Signin
        </SubmitButton>
        <Marginer direction="vertical" margin="1em" />
        <MutedLink>
          Don't have an accoun?{" "}
          <BoldLink onClick={switchToSignup}>Signup</BoldLink>
        </MutedLink>
      </BoxContainer>
    </div>
  );
}

export default LoginForm;
