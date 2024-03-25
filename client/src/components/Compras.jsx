/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Divider, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompras } from "../Redux/actions/productsActions";
import ProductPrice from "./ProductPrice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router-dom";

const Compras = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode(token);
  const userId = decodeToken.id;

  useEffect(() => {
    dispatch(getCompras(userId));
  }, []);

  const recibos = useSelector((state) => state.products.compras);

  const productCountByCompra = {};

  recibos?.compras?.forEach((recibo) => {
    const countProducts = {};
    recibo?.CompraProductos.forEach((product) => {
      const productName = product.Product.title;
      countProducts[productName] = (countProducts[productName] || 0) + 1;
    });

    productCountByCompra[recibo.id] = countProducts;
  });

  const stylePrice = {
    fontSize: "22px",
  };

  return (
    <Box>
      {recibos.length === 0 || recibos?.compras.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 3.2rem)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="https://www.macpollo.com/_nuxt/img/carrito_vacio.629e741.png"
              width="14rem"
            />
            <Typography sx={{ my: "1rem" }}>
              Por el momento no se realizaron compras
            </Typography>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="contained"
              component={NavLink}
              to="/"
            >
              Catálogo de Productos
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {recibos &&
              recibos?.compras?.map((recibo) => (
                <Box
                  key={recibo.id}
                  sx={{
                    m: "1rem",
                    width: "22rem",
                    height: "24rem",
                    borderRadius: "4px",
                    boxShadow: 10,

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "90%",
                      mx: "auto",
                      height: "90%",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        alignSelf: "flex-end",
                        color: "#B7C6C9",
                      }}
                    >
                      Nº de orden: {recibo.id_merchant_order}
                    </Typography>
                    <Box>
                      <Typography>Email: </Typography>
                      <Typography>{recibos.email}</Typography>
                    </Box>

                    <Box display="flex" gap="10px">
                      <Typography>Estado: </Typography>
                      <Typography>{recibo.status}</Typography>
                    </Box>
                    <Divider sx={{ height: "10px" }} />

                    <Box
                      sx={{
                        width: "100%",
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {productCountByCompra[recibo.id] &&
                        Object.keys(productCountByCompra[recibo.id]).map(
                          (productName) => (
                            <Box
                              key={productName}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                width: "100%",
                                height: "4rem",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "80%",
                                }}
                              >
                                <Typography sx={{}}>
                                  {productName} : x
                                  {productCountByCompra[recibo.id][productName]}
                                </Typography>
                              </Box>

                              <Divider sx={{ width: "100%" }} />
                            </Box>
                          )
                        )}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Total: </Typography>
                      <ProductPrice
                        price={recibo.monto_total}
                        style={stylePrice}
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Compras;
