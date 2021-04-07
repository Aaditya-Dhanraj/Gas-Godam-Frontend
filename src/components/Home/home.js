import { Example } from "../sidebar/Example";
import AllReport from "./allReport/allReport";
import { connect } from "react-redux";
import "./home.css";

const HomePage = (props) => {
  return (
    <div >
      <h1 className="heading">All Reports</h1>
      <AllReport />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    reportData: state.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeUser: (type, user) => {
      dispatch({ type: type, payload: user });
    },
    changeData: (type, data) => {
      dispatch({ type: type, payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
