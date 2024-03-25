/* eslint-disable react/prop-types */
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductId } from "../Redux/actions/productsActions";

const CompleteOutfits = ({
  product,
  IdProduct,
  gender,
  category,
  products,
  formularioCreacion,
}) => {
  const isLTE454 = useMediaQuery("(max-width:454px)");
  const isLTE768 = useMediaQuery("(max-width:768px)");
  const isLTE1000 = useMediaQuery("(max-width:1000px)");
  const isLTE1200 = useMediaQuery("(max-width:1200px)");
  const isLTE1520 = useMediaQuery("(max-width:1520px)");

  const navigate = useNavigate();

  const [productsOutfits, setProductsOutfits] = useState([]); // Inicializa productsOutfits

  useEffect(() => {
    const obtenerProductosCoincidentes = () => {
      const coincidentProducts = [];
      const includedCategories = [];

      for (const product of products) {
        if (
          product.category !== category &&
          product.gender === gender &&
          !includedCategories.includes(product.category)
        ) {
          coincidentProducts.push(product);
          includedCategories.push(product.category);

          if (coincidentProducts.length === 4) {
            break;
          }
        }
      }

      return coincidentProducts;
    };

    const productosParaOutfits = obtenerProductosCoincidentes();
    setProductsOutfits(productosParaOutfits);
  }, [IdProduct, gender, category, products]); // Dependencias del useEffect

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: "20px",
          fontSize: product
            ? isLTE1200
              ? "25px"
              : "30px"
            : isLTE454
            ? "24px"
            : isLTE768
            ? "35px"
            : isLTE1000 && "45px",
        }}
      >
        COMPLETA TU OUTFIT
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: isLTE454 ? "97%" : "90%",
          justifyContent: "center",
          gap: isLTE768 ? "5px" : "10px",
        }}
      >
        {productsOutfits &&
          productsOutfits.map((product) => (
            <Box
              key={product.id}
              sx={{
                display: "flex",
                width: isLTE454
                  ? "48%"
                  : isLTE768
                  ? "49%"
                  : isLTE1520
                  ? "45%"
                  : "49%",
                height: "auto",
                position: "relative",
                cursor: "pointer",
                overflow: "hidden",

                "&:hover img": {
                  transform: "scale(1.03)",
                  transition: "transform 0.5s ease",
                },
                "&:hover::before": {
                  content: "''",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
                  pointerEvents: "none", // permite que los eventos pasen
                },
              }}
            >
              <Box
                // component={NavLink}
                // to={`/detail/${product.id}`}
                onClick={(e) => {
                  if (!formularioCreacion) {
                    e.preventDefault();
                    getProductId(product.id);
                    navigate(`/detail/${product.id}`);
                  }
                }}
              >
                <Box
                  component="img"
                  src={product.image1}
                  alt={product.title}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default CompleteOutfits;
