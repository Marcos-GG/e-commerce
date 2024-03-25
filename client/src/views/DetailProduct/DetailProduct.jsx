/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  clearProductosFiltrados,
  getProductId,
  getProducts,
} from "../../Redux/actions/productsActions";
import { useEffect, useState } from "react";
import RelatedProducts from "../../components/RelatedProducts";
import CommentProducts from "../../components/CommentProducts";
import AnswerComment from "../../components/AnswerComment";
import { addProduct } from "../../Redux/actions/ShoppingCartAction";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ProductPrice from "../../components/ProductPrice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CompleteOutfits from "../../components/completeOutfits";
import CommentDesplegable from "../../components/CommentDesplegable";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Circularprogress from "../../components/CircularProgress";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { addLike, removeLike } from "../../Redux/actions/Likes";
import Respuesta from "../../components/Respuesta";

function DetailProduct({ product, formularioCreacion }) {
  const isLTE454 = useMediaQuery("(max-width:454px)");
  const isLTE600 = useMediaQuery("(max-width:600px)");
  const isLTE768 = useMediaQuery("(max-width:768px)");
  const isLTE1000 = useMediaQuery("(max-width:1000px)");
  const isLTE1023 = useMediaQuery("(max-width:1023px)");
  const isLTE1200 = useMediaQuery("(max-width:1200px)");
  const isLTE1250 = useMediaQuery("(max-width:1250px)");
  const isLTE1400 = useMediaQuery("(max-width:1400px)");
  const isLTE1520 = useMediaQuery("(max-width:1520px)");

  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath, "dasdas");

  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const productId = useSelector((state) => state.products.productId);
  console.log(productId, "dasdas");

  const products = useSelector((state) => state.products.products);

  const [fotoPrincipal, setFotoPrincipal] = useState("");
  const [fotoLength, setFotoLength] = useState([]);

  useEffect(() => {
    if (product || productId) {
      const imageArray = [
        product?.image1 || productId?.image1,
        product?.image2 || productId?.image2,
        product?.image3 || productId?.image3,
        product?.image4 || productId?.image4,
      ];
      const validImages = imageArray.filter((image) => image);
      setFotoLength(validImages);
      setFotoPrincipal(validImages[0]); // Actualizar fotoPrincipal con la primera imagen válida
    }
  }, [product, productId]);

  /// productos relacionados
  const category = product?.category || productId?.category;
  const gender = product?.gender || productId?.gender;
  const IdProduct = productId?.id;

  useEffect(() => {
    dispatch(getProducts(1));
  }, [dispatch, id]);

  //limpiamos filtros aplicados :
  useEffect(() => {
    return () => {
      // Limpiar productos filtrados al salir del componente de detalle
      dispatch(clearProductosFiltrados());
    };
  }, [dispatch]);
  ///////
  const token = localStorage.getItem("token");

  const decodeToken = jwtDecode(token);
  const userId = decodeToken.id;

  useEffect(() => {
    if (!product) dispatch(getProductId(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  const handleClickAdd = (product) => {
    dispatch(addProduct(product));
  };

  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState();

  useEffect(() => {
    const productosLikeados = productId.Likes?.some(
      (like) => like.userId === userId
    );
    const likesTotales = productId.likes;
    console.log(likesTotales);

    setTotalLikes(likesTotales);

    setLiked(productosLikeados);
  }, [productId, userId]);

  const handleClickLike = async () => {
    if (!liked) {
      await dispatch(addLike(productId?.id));
    } else {
      await dispatch(removeLike(productId?.id));
    }
    setLiked(!liked);
    setTotalLikes(!liked ? totalLikes + 1 : totalLikes - 1);
  };

  const priceStyle = {
    fontSize: product ? "1.4rem" : isLTE454 ? "1.6rem" : "2.2rem",
  };

  const handleImageClick = (image) => {
    setFotoPrincipal(image);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      productId !== null &&
      products !== null &&
      fotoPrincipal !== null &&
      fotoLength !== null
    ) {
      // Si la información está presente, espera 2 segundos y luego oculta el componente
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
    }
  }, [productId, products, fotoPrincipal, fotoLength]);

  useEffect(() => {
    window?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [productId?.id]);

  const handleClickComprar = () => {
    dispatch(addProduct(productId));
    navigate("/carrito");
  };

  return (
    <Box sx={{ position: "relative" }}>
      {isLoading && !formularioCreacion ? (
        <Circularprogress />
      ) : (
        <Box>
          <Respuesta />
          {currentPath.includes("/detail") && (
            <Box
              sx={{
                position: "fixed",
                zIndex: 5,
                right: isLTE454 ? 5 : 20,
                bottom: isLTE454 ? 0 : 10,
              }}
            >
              <IconButton sx={{}}>
                <NavLink
                  to={`https://wa.me/541127147123?text=¡Hola! me gustaria recibir información sobre ${productId.title}. ${productId.category} para ${productId.gender}, precio ${productId.price}.`}
                  target="_blank"
                >
                  <WhatsAppIcon
                    sx={{
                      fontSize: isLTE454 ? "2.6rem" : "2.80rem",
                      bgcolor: "#00BD07",
                      color: "white",
                      borderRadius: "50%",
                      p: "5px",
                    }}
                  />
                </NavLink>
              </IconButton>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Alinea horizontalmente al centro
              mx: product ? 0 : isLTE1400 ? "0" : "5rem",
              mt: "3rem",
              flexDirection: product
                ? isLTE1023 && "column"
                : isLTE768 && "column",
              alignItems: isLTE1023 && "center",
              gap: isLTE768 && "30px",
              width: product && isLTE1023 ? "100%" : isLTE1023 ? "100%" : "95%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                width: product ? (isLTE1023 ? "100%" : "100%") : "100%",
                maxWidth: "100rem",
                maxHeight: "30rem",
              }}
            >
              <Box
                component="img"
                src={fotoPrincipal}
                alt={productId?.title}
                sx={{
                  minWidth: product ? (isLTE768 ? "17rem" : "12rem") : "18rem",
                  maxWidth: product
                    ? isLTE1023
                      ? "50%"
                      : "100%"
                    : isLTE768
                    ? "55%"
                    : "100%",
                  maxHeight: product
                    ? isLTE1023
                      ? "50%"
                      : "100%"
                    : isLTE768
                    ? "55%"
                    : "100%",
                  height: "auto",
                  position: isLTE1023 ? "" : "absolute",
                  top: "50%",
                  left: "50%",
                  transform: product
                    ? !isLTE1023 && "translate(-50%, -50%)"
                    : !isLTE1023 && "translate(-50%, -50%)",
                }}
              />

              <Box
                sx={{
                  gap: "12px",
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  height: "25px",
                  transform: "translateX(-50%)",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem", // Espacio entre la imagen y los botoness
                }}
              >
                {fotoLength.map((image, index) => (
                  <IconButton
                    onClick={() => handleImageClick(image)}
                    key={index}
                    sx={{}}
                  >
                    {fotoPrincipal === image ? (
                      <CircleIcon sx={{ width: "12px" }} />
                    ) : (
                      <CircleOutlinedIcon sx={{ width: "12px" }} />
                    )}
                  </IconButton>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: product && isLTE1023 ? "95%" : "100%",
                maxwidth: "65rem",
                mt: "1rem",
              }}
            >
              <Box sx={{ alignSelf: "flex-end" }}>
                <Typography
                  sx={{
                    display: "flex",
                    fontSize: product ? "12px" : isLTE1000 ? "10.9px" : "13px",
                    fontWeight: "bold",
                    color: "gray",
                    fontStyle: "italic",
                    mr: "15px",
                    gap: "5px",
                  }}
                >
                  {liked && !product ? (
                    <ThumbUpAltIcon
                      onClick={() => handleClickLike(productId?.id)}
                      sx={{ cursor: "pointer" }}
                    />
                  ) : (
                    <ThumbUpOffAltIcon
                      onClick={() => handleClickLike(productId?.id)}
                      sx={{ cursor: "pointer" }}
                    />
                  )}
                  {product?.likes || totalLikes} veces favorito
                </Typography>
              </Box>

              <Box
                sx={{
                  width: product ? "100%" : isLTE1200 ? "100%" : "80%",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: product
                      ? isLTE1200
                        ? "24px"
                        : "34px"
                      : isLTE454
                      ? "30px"
                      : isLTE768
                      ? "35px"
                      : isLTE1000 && "38px",
                    textTransform: "uppercase",
                    letterSpacing: isLTE768
                      ? "0.5rem"
                      : isLTE1520
                      ? "1rem"
                      : "1.5rem",
                    ml: product
                      ? "10px"
                      : isLTE454
                      ? "15px"
                      : isLTE768 && "15px",
                  }}
                >
                  {product?.title || productId?.title}
                </Typography>

                <Typography
                  component="p"
                  sx={{ ml: isLTE454 ? "25px" : "15px", my: "5px" }}
                >
                  {product?.category || productId?.category}{" "}
                  {(product?.category &&
                    product?.gender &&
                    product?.gender !== "Unisex") ||
                  (productId?.category &&
                    productId?.gender &&
                    productId?.gender !== "Unisex")
                    ? "para "
                    : ""}
                  {product?.gender || productId?.gender}
                </Typography>

                <Typography variant="h4" mt={isLTE768 ? 1 : 2.5} ml={2}>
                  <ProductPrice
                    price={product?.price || productId?.price || 0}
                    style={priceStyle}
                  />
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: product ? "33%" : "50%",
                      maxWidth: "13rem",
                      mt: isLTE768 ? "0.5rem" : isLTE1200 ? "1.5rem" : "5px",
                      borderRadius: "40px",
                      fontSize: product ? "13px" : isLTE454 ? "15px" : "18px",
                      mb: "10px",
                    }}
                    onClick={() => !product && handleClickComprar()}
                  >
                    COMPRAR
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<AddShoppingCartIcon />}
                    sx={{
                      width: "60%",
                      maxWidth: "15rem",
                      height: "2.5rem",
                      borderRadius: "40px",
                      fontSize: product ? "12px" : isLTE454 ? "12px" : "13px",
                      mb: "30px",
                    }}
                    onClick={() => !product && handleClickAdd(productId)}
                  >
                    Agregar al carrito
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              m: product
                ? "1.5rem 0 1rem 0"
                : isLTE768
                ? "0.5rem 0 1rem 0"
                : isLTE1400 && "4rem 0 1rem 0",
              display: "flex",
              justifyContent: product ? "center" : isLTE1400 ? "center" : "end",
            }}
          >
            <Box
              sx={{
                width: product
                  ? "90%"
                  : isLTE768
                  ? "100%"
                  : isLTE1400
                  ? "90%"
                  : "50%",
                textAlign: "start",
              }}
            >
              <Typography
                component="p"
                sx={{
                  fontSize: product ? "14px" : isLTE454 ? "14.8px" : "16px",
                  width: isLTE768 ? "90%" : "80%",
                  wordBreak: "break-word",
                  overflow: "hidden",
                  mx: "auto",
                }}
              >
                {product?.description || productId?.description}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: product ? "column" : isLTE1250 && "column",
              alignItems: product ? "center" : isLTE1250 && "center",
            }}
          >
            <Box
              sx={{
                width: product
                  ? "100%"
                  : isLTE1250
                  ? "100%"
                  : isLTE1520
                  ? "60%"
                  : "55%",
                display: isLTE1250 && "flex",
                flexDirection: isLTE1250 && "column",
                alignItems: isLTE1250 && "center",
              }}
            >
              <Box
                sx={{
                  mx: product ? "0" : "25px",
                  mb: product ? "10px" : "50px",
                  width: isLTE1200 ? "90%" : "100%",
                }}
              >
                <RelatedProducts
                  productAdmin={true}
                  id={product?.id || id}
                  products={products}
                  category={category}
                  gender={gender}
                />
              </Box>

              {!product && (
                <Box
                  sx={{
                    width: isLTE768 ? "98%" : "90%",
                    maxWidth: "60rem",
                    display: "flex",
                    justifyContent: "center",
                    mt: "10px",
                    maxHeight: "21.5rem",
                    mb: "20px",
                    border: "1px solid #F5F5F5",
                    ml: isLTE1250 ? "" : "2rem",
                    boxShadow: "10px 10px 15px #888888",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {productId.Comments &&
                      productId.Comments.length > 0 &&
                      productId.Comments.some(
                        (comment) => comment.userId === userId
                      ) &&
                      productId.Comments.map((comment) => (
                        <Box key={comment.id} sx={{}}>
                          <Box
                            sx={{
                              overflow: "auto",
                              width: "100%",
                              height: "100%",
                              backgroundColor: "#f5f5f5",
                              backgroundImage: 'url("/logoblanco.svg")',
                              backgroundSize: "contain",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            {comment.userId === userId && (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  width: "100%",
                                  height: "13rem",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignSelf: comment.userId
                                      ? "flex-end"
                                      : "flex-start",
                                    bgcolor: "#00CCFD",
                                    maxWidth: "75%",
                                    width: isLTE768 ? "19rem" : "24rem",
                                    borderRadius: "15px 15px 0px 15px",
                                    mx: "5px",
                                    padding: isLTE768 ? "5px" : "10px",
                                    mt: isLTE600 ? "3px" : "5px",
                                    border: "1px solid #00CCFD",
                                    boxShadow: "10px 10px 15px #888888",
                                    overflowWrap: "break-word",
                                    wordBreak: "break-all",
                                    gap: 1,
                                  }}
                                >
                                  <Typography
                                    component="p"
                                    sx={{ fontSize: isLTE768 && "14px" }}
                                  >
                                    {comment.text}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  {comment.Answers &&
                                    comment.Answers.length > 0 &&
                                    comment.Answers.map((answer) => (
                                      <Box
                                        key={answer.id}
                                        sx={{
                                          display: "flex",
                                          bgcolor:
                                            userId === answer.userId
                                              ? "#00CCFD"
                                              : "#F5F5F5",
                                          width: isLTE768 ? "19rem" : "24rem",
                                          maxWidth: "75%",

                                          borderRadius:
                                            userId === answer.userId
                                              ? "15px 15px 0px 15px"
                                              : "0 15px 15px 15px",
                                          mx: "5px",
                                          alignSelf:
                                            userId === answer.userId
                                              ? "flex-end"
                                              : "flex-start",
                                          flexDirection: "column",
                                          padding: isLTE768 ? "5px" : "10px",
                                          mt: isLTE600 ? "5px" : "5px",
                                          border: "1px solid #00CCFD",
                                          boxShadow: "10px 10px 15px #888888",
                                          overflowWrap: "break-word",
                                          wordBreak: "break-all",
                                          gap: 1,
                                        }}
                                      >
                                        <Typography
                                          component="p"
                                          sx={{ fontSize: isLTE768 && "14px" }}
                                        >
                                          {answer.answer}
                                        </Typography>
                                      </Box>
                                    ))}
                                </Box>
                              </Box>
                            )}
                          </Box>
                          <Box>
                            {userId === comment.userId && (
                              <AnswerComment
                                commentId={comment.id}
                                productId={true}
                              />
                            )}
                          </Box>
                        </Box>
                      ))}
                    {productId.Comments &&
                      productId.Comments.length >= 0 &&
                      productId.Comments.every(
                        (comment) => comment.userId !== userId
                      ) && (
                        <Box
                          sx={{
                            textAlign: "start",
                            mx: isLTE768 ? "2px" : "20px",
                          }}
                        >
                          <Box
                            sx={{
                              overflow: "break-word",
                              wordWrap: "break-word",
                            }}
                          >
                            <Typography
                              component="p"
                              sx={{
                                m: "10px",
                                fontSize: isLTE768
                                  ? "13.5px"
                                  : isLTE1520 && "15px",
                              }}
                            >
                              En CompraMás, valoramos tu retroalimentación. A
                              través de nuestra sección de comentarios, te
                              invitamos a compartir preguntas, opiniones y
                              experiencias para mejorar la experiencia de
                              compra. Si tienes consultas específicas sobre un
                              producto o deseas compartir tus impresiones, esta
                              sección es ideal para hacerlo. Por otro lado, si
                              necesitas ayuda personalizada o resolver dudas,
                              nuestro equipo está a tu disposición a través de
                              WhatsApp. Ya sea para consultas sobre productos o
                              asesoramiento detallado, ¡gracias por ser parte de
                              CompraMás!
                            </Typography>
                          </Box>

                          <CommentProducts productId={productId.id} />
                        </Box>
                      )}
                  </Box>
                </Box>
              )}

              {!product && (
                <Box
                  sx={{
                    width: isLTE600 ? "98%" : "90%",
                    maxWidth: "60rem",
                    display: "flex",
                    ml: isLTE1200 ? "" : "2rem",
                    justifyContent: isLTE1250 && "center",
                    mb: "1.8rem",
                  }}
                >
                  <CommentDesplegable productId={productId} userId={userId} />
                </Box>
              )}
            </Box>
            <Box
              sx={{
                width: product
                  ? "80%"
                  : isLTE1250
                  ? "100%"
                  : isLTE1520
                  ? "40%"
                  : "45%",
                display: "flex",
                mb: "15px",
              }}
            >
              <CompleteOutfits
                product={true}
                IdProduct={IdProduct}
                gender={gender}
                category={category}
                products={products}
                formularioCreacion={formularioCreacion}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default DetailProduct;
