import { useState } from "react";
import { onUpdateUser, onAddProduct } from "../redux/actions/user";
import { connect } from "./connectHoc";
import Navbar from "./Navbar";

function Dashboard({ user, products=[], onUpdateUser, onAddProduct }) {
  const [name, setName] = useState('');

  const handleClick = () => {
    onUpdateUser({ count: (user?.count || 0) + 1});
  };

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleAddProduct = () => {
    onAddProduct(name)
  }
  return (
    <>
      <Navbar />
      {user?.count}
      <button onClick={handleClick}>click</button><br/>
      <input onChange={handleChange} /><br/>
      <button onClick={handleAddProduct}>Add Product</button>
      <div>
        <ul>
          {products.map(item => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user?.userData,
    products: state.product?.products,
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
export default connect(mapStateToProps, {onUpdateUser, onAddProduct})(Dashboard);
