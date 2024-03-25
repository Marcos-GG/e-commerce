/* eslint-disable react/prop-types */
// import { useNavigate } from "react-router-dom";
// import ProductItem from "./ProductItem";
import /* addProduct  */ "../Redux/actions/ShoppingCartAction";
import { useDispatch /* useSelector */ } from "react-redux";
// import { jwtDecode } from "jwt-decode";
import {
  getFavorites /* removeLike */,
  removeLike,
} from "../Redux/actions/Likes";
import { useEffect } from "react";
import {
  Box /* useMediaQuery  */,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ProductPrice from "./ProductPrice";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { addProduct } from "../Redux/actions/ShoppingCartAction";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const DrawerFavoritos = ({
  handleDrawerToggleFavoritos,
  openFavorite,
  favoriteProducts,
}) => {
  const isLTE530 = useMediaQuery("(max-width: 530px)");
  const isLTE600 = useMediaQuery("(max-width: 600px)");

  const isLTE1440 = useMediaQuery("(max-width:1440px)");
  const isLTE1200 = useMediaQuery("(max-width:1200px)");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavorites());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickAdd = (product) => {
    dispatch(addProduct(product));
  };

  const handleClickLike = (id) => {
    if (id) dispatch(removeLike(id));
  };

  const priceIndividualStyle = {
    fontSize: isLTE1440 ? "14px" : "18px",
  };

  return (
    <Box>
      <Drawer
        anchor="right"
        open={openFavorite}
        onClose={handleDrawerToggleFavoritos}
      >
        <Box
          sx={{
            width: isLTE530 ? "100%" : isLTE600 ? "25rem" : "30rem",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            alignItems: "center",
            bgcolor: "#F5F5F5",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: isLTE600 ? "100%" : "98%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body"
              component="p"
              sx={{
                m: "20px 0 10px 0",
                fontSize: isLTE530 ? "17px" : "20px",
              }}
            >
              FAVORITOS
            </Typography>
            <Divider sx={{ height: "3px", width: "90%" }} />

            <Box
              sx={{
                width: "95%",
                mt: "10px",
                overflow: "auto",
              }}
            >
              {favoriteProducts &&
                favoriteProducts?.length > 0 &&
                favoriteProducts.map((product /* index */) => (
                  <Box
                    key={product.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ display: "flex", width: "100%" }}>
                      <Box
                        component="img"
                        src={product.image1}
                        sx={{
                          width: isLTE530
                            ? "86px"
                            : isLTE530
                            ? "90px"
                            : "100px",
                          maxHeight: isLTE530 && "86px",
                        }}
                      />

                      <Box sx={{ width: "100%" }}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "3.6rem",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: isLTE1200 ? "13px" : "15px",
                              ml: "12px",
                            }}
                          >
                            {product.title}
                          </Typography>
                          <Box sx={{ ml: "20px" }}>
                            <ProductPrice
                              price={product?.price}
                              style={priceIndividualStyle}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Box>
                            <IconButton
                              onClick={() => handleClickLike(product?.id)}
                            >
                              <ThumbUpAltIcon />
                            </IconButton>
                          </Box>
                          <Box>
                            <IconButton onClick={() => handleClickAdd(product)}>
                              <AddShoppingCartIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Divider
                      sx={{
                        width: "95%",
                        height: "2px",
                        my: "11px",
                      }}
                    />
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default DrawerFavoritos;
