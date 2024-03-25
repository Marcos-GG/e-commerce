// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import ProductsAdmin from "./ProductsAdmin";
import { useEffect } from "react";
import { getProductsAll } from "../Redux/actions/productsActions";

const DesactivatedProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.desactivatedproducts);
  const productosFiltrados = useSelector(
    (state) => state.products.productsFilteredFalse
  );

  useEffect(() => {
    dispatch(getProductsAll());
  }, [dispatch]);

  return (
    <Box>
      <ProductsAdmin
        products={products}
        productosFiltrados={productosFiltrados}
      />
    </Box>
  );
};

export default DesactivatedProducts;
