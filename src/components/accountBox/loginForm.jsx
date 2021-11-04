import { useState, useContext } from "react";
import { UserContext } from "../../App";
import { useHistory } from "react-router-dom";
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
  const [noti, setNoti] = useState({ status: "", message: "", trigger: false });
  // const [status, setStatus] = useState("");
  const { switchToSignup, switchToHome } = useContext(AccountContext);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  const [email, setEmail] = useState("daaditya552@gmail.com");
  const [password, setPassword] = useState("test1234");

  const sendDataLogin = () => {
    fetch("https://stormy-retreat-77015.herokuapp.com/user/login", {
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
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          dispatch({ type: "USER", payload: data.data.user });
          // setStatus("success");
          setNoti({
            status: "success",
            message: "LoggedIn Successfully",
            trigger: "true",
          });
          setTimeout(() => {
            history.push("/report");
          }, 2500);
        } else if (data.status === "Fail") {
          if (data.error) {
            setNoti({
              status: "error",
              message: "ERROR 404",
              trigger: "true",
            });
          }
        }else if (data == null) {
          if (data.error) {
            setNoti({
              status: "error",
              message: "ERROR 404",
              trigger: "true",
            });
          }
        } else {
          setNoti({
            status: "warning",
            message: "Please turn on Mobile Data or WiFi",
            trigger: "true",
          });
        }
      });
  };

  return (
    <div>
      <Notification
        type={noti.status}
        time={2000}
        message={noti.message}
        trigger={noti.trigger}
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
