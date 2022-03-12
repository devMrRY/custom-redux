import { onUpdateUser } from "../redux/actions/user";
import { connect } from "./connectHoc";
import Navbar from "./Navbar";

function Dashboard({ user, onUpdateUser }) {
  const handleClick = () => {
    onUpdateUser({ count: (user?.count || 0) + 1});
  };

  return (
    <>
      <Navbar />
      {user?.count}
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

// functional way to bind dispatch to actions
// export default connect(mapStateToProps, mapActionToProps)(Dashboard);

// object way to bind dispatch to actions
export default connect(mapStateToProps, {onUpdateUser})(Dashboard);
