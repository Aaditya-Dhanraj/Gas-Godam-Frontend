import React, { createContext, useReducer, useEffect, useContext } from "react";
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import "./App.css";
import AllReport from "./components/Home/allReport/allReport";
import CreateReport from "./components/Home/createReport/createReport";
import { Example } from "./components/sidebar/Example";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import { reducer, initialState } from "./Reducers/reducer";



export const UserContext = createContext();

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      history.push("/report");
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/report">
        <Example />
        <AllReport />
      </Route>
      <Route exact path="/login">
        <AppContainer>
          <AccountBox />
        </AppContainer>
      </Route>
      <Route exact path="/createReport">
        <Example />
        <CreateReport />
      </Route>
      <Route exact path="/report/:userid">
        <Example />
      </Route>
    </Switch>
  );
};

function App() {


  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
    
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
