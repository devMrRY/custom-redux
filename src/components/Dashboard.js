import { onUpdateUser } from "../redux/actions/user";
import { connect } from "./connectHoc";
import Navbar from "./Navbar";

function Dashboard(props) {
  const handleClick = () => {
    let {user} = props;
    props.updateUser({ count: (user?.count || 0) + 1});
  };

  return (
    <>
      <Navbar />
      {props?.user?.count}
      <button onClick={handleClick}>click</button>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user?.userData
  }
}

const mapActionToProps = (dispatch) => {
  return ({
    updateUser: (payload) => dispatch(onUpdateUser(payload))
  })
}
export default connect(mapStateToProps, mapActionToProps)(Dashboard);
