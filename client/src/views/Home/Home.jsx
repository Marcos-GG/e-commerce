/* eslint-disable react-hooks/exhaustive-deps */
import Style from "./Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../Redux/actions/productsActions";
import CardContainer from "../../components/CardContainer";
import Filtros from "../../components/Filtros";
import { Badge, Box, IconButton, useMediaQuery } from "@mui/material";
import {
  CLEAN_DETAIL,
  GET_PRODUCTS,
} from "../../Redux/actionsTypes/ProductsActionTypes";
import SearchBarProduct from "../../components/SearchBarProduct";
import { NavLink } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import DrawerShoppingCart from "../ShoppingCart/DrawerShoppingCart";
import Respuesta from "../../components/Respuesta";
import DrawerFavoritos from "../../components/DrawerFavoritos";
import Paginado from "../../components/Paginado";
import Circularprogress from "../../components/CircularProgress";

function Home() {
  // const theme = useTheme();
  const isLTE500 = useMediaQuery("(max-width: 500px)");
  const isLTE1000 = useMediaQuery("(max-width:1000px)");
  const isLTE1700 = useMediaQuery("(max-width:1700px)");
  const isLTE1025 = useMediaQuery("(max-width:1025px)");

  const ShoppingCartProducts = useSelector(
    (state) => state.shoppingCart.products
  );

  const cantidadCarrito =
    ShoppingCartProducts?.length > 0
      ? `${ShoppingCartProducts?.reduce(function (acc, obj) {
          return acc + (obj?.cantidad || 1);
        }, 0)}`
      : "";

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const productosFiltrados = useSelector(
    (state) => state.products.productsFiltered
  );

  const [, setError] = useState(null);

  useEffect(() => {
    try {
      dispatch({ type: CLEAN_DETAIL });
      const persistedData = localStorage.getItem("persist:root");

      if (persistedData) {
        const parsedData = JSON.parse(persistedData);

        const localProducts =
          parsedData.products && JSON.parse(parsedData.products).products;

        if (localProducts || localProducts.length > 0) {
          dispatch({ type: GET_PRODUCTS, payload: localProducts });
        }
      }
      let page = 1;
      dispatch(getProducts(page));
    } catch (error) {
      setError(error.message);
    }
  }, []);

  // vida del boton filtros
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const [openCarrito, setOpenCarrito] = useState(false);

  const handleDrawerToggleCarrito = () => {
    setOpenCarrito(!openCarrito);
  };

  useEffect(() => {
    if (ShoppingCartProducts.length === 0) {
      setOpenCarrito(false);
    }
  }, [ShoppingCartProducts]);
  // favoritos

  const [openFavorite, setOpenFavorite] = useState(false);

  const favoriteProducts = useSelector((state) => state.products.favoritos);

  const handleDrawerToggleFavoritos = () => {
    setOpenFavorite(!openFavorite);
  };

  useEffect(() => {
    if (favoriteProducts.length === 0) {
      setOpenFavorite(false);
    }
  }, [favoriteProducts]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      favoriteProducts !== null &&
      // productosFiltrados !== null &&
      products !== null
    ) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [favoriteProducts, productosFiltrados, products]);

  return (
    <Box
      className={Style}
      sx={
        {
          // position: "relative",
          // height: "calc(100vh - 3.2rem)",
        }
      }
    >
      {isLoading ? (
        <Circularprogress />
      ) : (
        <Box>
          <Respuesta />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              my: "1.5rem",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mt: "3px" }}>
              <IconButton
                onClick={() => {
                  if (favoriteProducts?.length > 0) {
                    handleDrawerToggleFavoritos();
                  }
                }}
              >
                <Badge
                  color="primary"
                  badgeContent={
                    favoriteProducts.length >= 1
                      ? favoriteProducts.length
                      : null
                  }
                >
                  <ThumbUpAltIcon
                    sx={{ fontSize: isLTE500 ? "1.4rem" : "1.6rem" }}
                    color="action"
                  />
                </Badge>
              </IconButton>
              <DrawerFavoritos
                handleDrawerToggleFavoritos={handleDrawerToggleFavoritos}
                openFavorite={openFavorite}
                favoriteProducts={favoriteProducts}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => {
                  if (cantidadCarrito > 0) {
                    handleDrawerToggleCarrito();
                  }
                }}
              >
                <Badge
                  color="primary"
                  badgeContent={cantidadCarrito >= 1 ? cantidadCarrito : null}
                >
                  <ShoppingBagIcon
                    sx={{ fontSize: isLTE500 ? "1.4rem" : "1.6rem" }}
                    color="action"
                  />
                </Badge>
              </IconButton>
              <DrawerShoppingCart
                handleDrawerToggleCarrito={handleDrawerToggleCarrito}
                openCarrito={openCarrito}
                ShoppingCartProducts={ShoppingCartProducts}
              />
            </Box>
            <Box sx={{ mr: "1.3rem" }}>
              <SearchBarProduct />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: isLTE1000 ? "column" : "",
            }}
          >
            {isLTE1000 ? (
              <Box
                sx={{
                  bgcolor: "#f5f5f5",
                  boxShadow: "0px 5px 15px #888888;",
                  mb: "2rem",
                  width: open ? "100vw" : "12rem",
                  transition: "width 0.6s ease",
                }}
              >
                <Filtros open={open} handleDrawerToggle={handleDrawerToggle} />
              </Box>
            ) : (
              <Box
                sx={{
                  background: "#f5f5f5",
                  padding: "0 15px 0 15px",
                  width: "19rem",
                  borderRadius: "0 5px 5px 0",
                  border: "1px solid #00CCFD",
                  minWidth: "14rem",
                  maxHeight: "37rem",
                  minHeight: "37rem",
                  marginRight: isLTE1025 ? "3.5rem" : isLTE1700 ? "3.5rem" : "",
                }}
              >
                <Filtros open={open} handleDrawerToggle={handleDrawerToggle} />
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              <CardContainer
                products={
                  productosFiltrados && productosFiltrados.length > 0
                    ? productosFiltrados
                    : products
                }
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Paginado />
          </Box>
          <Box
            sx={{
              position: "fixed",
              right: isLTE500 ? 5 : 20,
              bottom: isLTE500 ? 0 : 10,
            }}
          >
            <IconButton sx={{}}>
              <NavLink
                to="https://wa.me/541127147123?text=¡Hola! me gustaria tener atención personalizada."
                target="_blank"
              >
                <WhatsAppIcon
                  sx={{
                    fontSize: isLTE500 ? "2.6rem" : "2.80rem",
                    bgcolor: "#00BD07",
                    color: "white",
                    borderRadius: "50%",
                    p: "5px",
                  }}
                />
              </NavLink>
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Home;
