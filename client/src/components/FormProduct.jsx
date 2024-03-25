/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../Redux/actions/productsActions";
import { getCategory, getGender } from "../Redux/actions/CategoryGender";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DetailProduct from "../views/DetailProduct/DetailProduct";
import Respuesta from "./Respuesta";
import { CLEAN_DETAIL } from "../Redux/actionsTypes/ProductsActionTypes";
import Validations from "../Validations/Validations";

const FormProduct = () => {
  // const [additionalImages, setAdditionalImages] = useState([]);
  const isLTE500 = useMediaQuery(`(max-width: 500px)`);
  const isLTE1023 = useMediaQuery(`(max-width: 1023px)`);
  const isLTE1300 = useMediaQuery(`(max-width: 1300px)`);
  const isLTE1700 = useMediaQuery(`(max-width: 1700px)`);

  const [image2, setImage2] = useState(false);
  const handlerImage2 = () => {
    setImage2(!image2);
    setImage3(false);
    setImage4(false);
  };

  const [image3, setImage3] = useState(false);
  const handlerImage3 = () => {
    setImage3(!image3);
    setImage4(false);
  };

  const [image4, setImage4] = useState(false);
  const handlerImage4 = () => {
    setImage4(!image4);
  };

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryGender.category);
  const genders = useSelector((state) => state.categoryGender.gender);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getGender());
    dispatch({ type: CLEAN_DETAIL });
  }, [getCategory, getGender]);

  const [error, setError] = useState();

  const [form, setForm] = useState({
    title: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    description: "",
    // stock: "",
    price: "",
    gender: "",
    category: "",
  });

  const formHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });

    setError(Validations({ ...form, [name]: value }, name));
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(createProduct(form));
  };

  const handlerVaciarForm = () => {
    setForm({
      title: "",
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      description: "",
      // stock: "",
      price: "",
      gender: "",
      category: "",
    });
    setError("");
  };

  const valueForm = Object.values(form).every((value) => !value);

  return (
    <Box sx={{ height: `calc(100vh - 3.2rem)` }}>
      <Respuesta />
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: isLTE1023 && "column",
        }}
      >
        <Box
          sx={{
            width: isLTE1023 ? "100%" : isLTE1300 ? "40%" : "40%",
            height: "100%",
            display: "flex",
            justifyContent: "start",
            flexDirection: "column",
            p: isLTE1023 ? "" : "10px",
            mt: "20px",
          }}
        >
          <form onSubmit={handlerSubmit}>
            <Box
              sx={{
                display: "flex",
                bgcolor: "#F5F5F5",
                borderRadius: "5px",
                boxShadow: "10px 10px 15px #888888",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                mx: isLTE500 ? "15px" : isLTE1023 && "10%",
                // m: "30px 30px 0 30px",
              }}
            >
              <Box
                sx={{
                  width: isLTE1300 ? "94%" : isLTE1700 ? "90%" : "80%",
                  my: isLTE500 ? "2px" : "3px",
                }}
              >
                <Box>
                  {error?.image1 && (
                    <Typography
                      sx={{ fontSize: "13px", color: "red", mb: "-10px" }}
                    >
                      {error.image1}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    type="text"
                    name="image1"
                    value={form.image1}
                    onChange={formHandler}
                    placeholder="imagen Principal"
                    InputProps={{
                      sx: {
                        bgcolor: "white",
                        width: "100%",
                        mt: "10px",
                        height: "2.5rem",
                      },
                    }}
                    sx={{ width: "100%" }}
                  />
                  <IconButton sx={{ mt: "10px" }} onClick={handlerImage2}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              {image2 && (
                <Box
                  sx={{
                    width: isLTE1300 ? "94%" : isLTE1700 ? "90%" : "80%",
                    alignItems: "center",
                    my: isLTE500 ? "2px" : "3px",
                  }}
                >
                  <Box>
                    {error?.image2 && (
                      <Typography
                        sx={{ fontSize: "13px", color: "red", mb: "-10px" }}
                      >
                        {error.image2}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      type="text"
                      name="image2"
                      value={form.image2}
                      onChange={formHandler}
                      placeholder="segunda imagen"
                      InputProps={{
                        sx: {
                          bgcolor: "white",
                          width: "100%",
                          mt: "10px",
                          height: "2.5rem",
                        },
                      }}
                      sx={{ width: "100%" }}
                    />
                    <IconButton sx={{ mt: "10px" }} onClick={handlerImage3}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
              {image3 && (
                <Box
                  sx={{
                    width: isLTE1300 ? "94%" : isLTE1700 ? "90%" : "80%",
                    my: isLTE500 ? "2px" : "3px",
                  }}
                >
                  <Box>
                    {error?.image3 && (
                      <Typography
                        sx={{ fontSize: "13px", color: "red", mb: "-10px" }}
                      >
                        {error.image3}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    <TextField
                      type="text"
                      name="image3"
                      value={form.image3}
                      onChange={formHandler}
                      placeholder="tercera imagen"
                      InputProps={{
                        sx: {
                          bgcolor: "white",
                          width: "100%",
                          mt: "10px",
                          height: "2.5rem",
                        },
                      }}
                      sx={{ width: "100%" }}
                    />
                    <IconButton sx={{ mt: "10px" }} onClick={handlerImage4}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
              {image4 && (
                <Box
                  sx={{
                    width: isLTE1300 ? "94%" : isLTE1700 ? "90%" : "80%",
                    my: isLTE500 ? "2px" : "3px",
                  }}
                >
                  {error?.image4 && (
                    <Typography
                      sx={{ fontSize: "13px", color: "red", mb: "-10px" }}
                    >
                      {error.image4}
                    </Typography>
                  )}
                  <TextField
                    type="text"
                    name="image4"
                    value={form.image4}
                    onChange={formHandler}
                    placeholder="ultima imagen"
                    InputProps={{
                      sx: {
                        bgcolor: "white",
                        width: "100%",
                        mt: "10px",
                        height: "2.5rem",
                      },
                    }}
                    sx={{ width: "100%" }}
                  />
                </Box>
              )}

              <Box
                sx={{
                  width: isLTE1300 ? "94%" : isLTE1700 ? "90%" : "80%",
                  my: isLTE500 ? "2px" : "3px",
                }}
              >
                {error?.title && (
                  <Typography
                    sx={{ fontSize: "13px", color: "red", mb: "-10px" }}
                  >
                    {error.title}
                  </Typography>
                )}
                <TextField
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={formHandler}
                  placeholder="Título"
                  InputProps={{
                    sx: {
                      bgcolor: "white",
                      width: "100%",
                      mt: "10px",
                      height: "2.5rem",
                    },
                  }}
                  sx={{ width: "100%" }}
                />
              </Box>

              <Box
                sx={{
                  width: isLTE1300 ? "94%" : isLTE1700 ? "90%" : "80%",
                  my: isLTE500 ? "2px" : "3px",
                }}
              >
                {error?.description && (
                  <Typography
                    sx={{ fontSize: "13px", color: "red", mb: "-10px" }}
                  >
                    {error.description}
                  </Typography>
                )}
                <TextField
                  name="description"
                  value={form.description}
                  onChange={formHandler}
                  multiline
                  rows={4}
                  placeholder="description"
                  variant="outlined"
                  InputProps={{
                    sx: {
                      bgcolor: "white",
                      width: "100%",
                      mt: "10px",
                      height: "6rem",
                    },
                  }}
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box
                sx={{
                  width: isLTE1300 ? "94%" : isLTE1700 ? "90%" : "80%",
                  my: isLTE500 ? "2px" : "3px",
                }}
              >
                {error?.price && (
                  <Typography
                    sx={{ fontSize: "13px", color: "red", mb: "-10px" }}
                  >
                    {error.price}
                  </Typography>
                )}
                <TextField
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={formHandler}
                  placeholder="Precio"
                  InputProps={{
                    sx: {
                      bgcolor: "white",
                      width: "100%",
                      mt: "10px",
                      height: "2.5rem",
                    },
                  }}
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box
                sx={{
                  width: isLTE1300 ? "94%" : isLTE1700 ? "90%" : "80%",
                  my: isLTE500 ? "2px" : "3px",
                }}
              >
                {error?.gender && (
                  <Typography
                    sx={{ fontSize: "13px", color: "red", mb: "-10px" }}
                  >
                    {error.gender}
                  </Typography>
                )}

                <Select
                  name="gender"
                  value={form.gender}
                  onChange={formHandler}
                  displayEmpty
                  placeholder="Género"
                  sx={{
                    bgcolor: "white",
                    height: "2.5rem",
                    width: "100%",
                    mt: "10px",
                  }}
                >
                  <MenuItem value="">Genero</MenuItem>
                  {genders &&
                    genders.map((gender) => (
                      <MenuItem key={gender.id} value={gender.gender}>
                        {gender.gender}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
              <Box
                sx={{
                  width: isLTE1300 ? "94%" : isLTE1700 ? "90%" : "80%",
                  my: isLTE500 ? "2px" : "3px",
                }}
              >
                {error?.category && (
                  <Typography
                    sx={{ fontSize: "13px", color: "red", mb: "-10px" }}
                  >
                    {error.category}
                  </Typography>
                )}

                <Select
                  name="category"
                  value={form.category}
                  onChange={formHandler}
                  displayEmpty
                  placeholder="Categoría"
                  sx={{
                    height: "2.5rem",
                    bgcolor: "white",
                    width: "100%",
                    mt: "10px",
                  }}
                >
                  <MenuItem value="">Categoria</MenuItem>
                  {categories &&
                    categories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: isLTE1300 ? "55%" : "40%",
                  mt: "20px",
                  fontSize: isLTE500 && "12px",
                }}
                disabled={valueForm}
              >
                Crear Producto
              </Button>
              <Button
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: isLTE500 ? "10.5px" : "12px",
                }}
                onClick={() => handlerVaciarForm()}
              >
                Limpiar formulario
              </Button>
            </Box>
          </form>
        </Box>
        <Box sx={{ width: isLTE1023 ? "100%" : "64%" }}>
          {valueForm ? (
            <Box
              sx={{
                width: "100%",
                mt: "30px",
                height: "44rem",
                backgroundColor: "#F5F5F5",
                boxShadow: "10px 10px 15px #888888",
                backgroundImage: 'url("/logoblanco.svg")',
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                mb: "10px",
              }}
            ></Box>
          ) : (
            <Box sx={{ mb: "10px" }}>
              <DetailProduct product={form} formularioCreacion />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FormProduct;

{
  /* <input
                    type="text"
                    name="image"
                    value={additionalImages[0]} // El primer input se utiliza como la imagen principal
                    onChange={(event) => {
                      const newImages = [...additionalImages];
                      newImages[0] = event.target.value; // Actualizar el valor del primer input
                      setAdditionalImages(newImages);
                    }}
                    placeholder="URL de la imagen principal"
                  />
                  <Box>
                    {additionalImages.slice(1).map(
                      (
                        image,
                        index // Recorrer los inputs adicionales a partir del segundo elemento
                      ) => (
                        <Box key={index}>
                          <input
                            type="text"
                            value={image}
                            onChange={(event) => {
                              const newImages = [...additionalImages];
                              newImages[index + 1] = event.target.value; // Index + 1 para evitar el primer input
                              setAdditionalImages(newImages);
                            }}
                            placeholder={`URL de la imagen ${index + 2}`}
                          />
                        </Box>
                      )
                    )}
                    <button type="button" onClick={addImageInput}>
                      Agregar más imágenes
                    </button> */
}
