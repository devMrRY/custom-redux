import store from "../redux/store";
import { connect } from "./connectHoc";

function Navbar(props){
    return (
        <div>
            <p>Custom Redux</p>
            Hello {props.user?.count}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.user?.userData
    }
  }

export default connect(mapStateToProps)(Navbar);