/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../Redux/actions/ShoppingCartAction";

function Card({ product }) {
  const dispatch = useDispatch();

  const handleClickAdd = () => {
    dispatch(addProduct(product));
  };

  return (
    <div style={{ border: "solid 1px", margin: "10px" }}>
      <p>title: {product?.title}</p>
      <p>image: {product?.image}</p>
      <p>price: {product?.price}</p>
      <p>gender: {product?.gender}</p>
      <p>category: {product?.category}</p>
      <p>likes: {product?.likes}</p>

      <button>
        <NavLink to={`/detail/${product?.id}`}>Ver mas</NavLink>
      </button>
      <div>
        <button onClick={() => handleClickAdd(product)}>
          <NavLink to={"/Carrito"}>Agregar</NavLink>
        </button>
      </div>
    </div>
  );
}

export default Card;
