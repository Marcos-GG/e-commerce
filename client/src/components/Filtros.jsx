/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getCategory, getGender } from "../Redux/actions/CategoryGender";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  Slider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  apllyFilters,
  clearProductosFiltrados,
} from "../Redux/actions/productsActions";

const Filtros = ({ open, handleDrawerToggle }) => {
  const isLTE640 = useMediaQuery("(max-width:640px)");
  const isLTE1000 = useMediaQuery("(max-width:1000px)");
  const dispatch = useDispatch();

  const priceMax = useSelector((state) => state.products.priceMax);
  const products = useSelector((state) => state.products.products);

  const genders = useSelector((state) => state.categoryGender.gender);
  const categorias = useSelector((state) => state.categoryGender.category);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null);
  const [morePopular, setMorePopular] = useState(false);
  const [estadoBoton, setEstadoBoton] = useState(false);
  const [initialPrice, setInitialPrice] = useState({ min: 0, max: 0 }); // Valores iniciales del precio

  const [combinedFilters, setCombinedFilters] = useState({
    category: null,
    gender: null,
    morePopular: null,
    price: { min: initialPrice.min, max: initialPrice.max },
  });

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getGender());
  }, []);

  useEffect(() => {
    // const maxPrice = Math.max(...products.map((product) => product.price));
    setInitialPrice({ min: 0, max: priceMax });
    setCombinedFilters((prevFilters) => ({
      ...prevFilters,
      price: { min: 0, max: priceMax },
    }));
  }, [products]);

  const handlePriceChange = (event, newPrice) => {
    setCombinedFilters({
      ...combinedFilters,
      price: { min: newPrice[0], max: newPrice[1] },
    });
  };

  const handleChangeCheckbox = (event) => {
    setMorePopular(event.target.checked);
    setCombinedFilters((prevFiltros) => ({
      ...prevFiltros,
      morePopular: event.target.checked,
    }));
  };

  useEffect(() => {
    const isDisabled =
      combinedFilters.category === null &&
      combinedFilters.gender === null &&
      combinedFilters.morePopular === null &&
      combinedFilters.price.min === initialPrice.min &&
      combinedFilters.price.max === initialPrice.max;

    setEstadoBoton(isDisabled);
  }, [combinedFilters, initialPrice]);

  const limpiarFiltros = () => {
    // restablecemos manualmente porque los valores que fueron seleccionados quedaban guardados visualmente
    setCategoriaSeleccionada(null);
    setGeneroSeleccionado(null);
    setEstadoBoton(false);
    setMorePopular(false);
    // setInitialPrice({ min: 0, max: 0 });

    setCombinedFilters({
      category: null,
      gender: null,
      morePopular: null,
      price: { min: initialPrice.min, max: initialPrice.max },
    });

    dispatch(clearProductosFiltrados());
  };

  const handleApplyFilter = () => {
    dispatch(apllyFilters(combinedFilters, 1));
  };

  return (
    <Box>
      {isLTE1000 ? (
        ""
      ) : (
        <Typography variant="h4" align="center" my={1.5}>
          filtros
        </Typography>
      )}

      {isLTE1000 && (
        <Button
          endIcon={<ExpandMoreIcon />}
          onClick={() => handleDrawerToggle()}
          sx={{ color: "black" }}
          fullWidth
        >
          Aplicar Filtros
        </Button>
      )}

      {isLTE1000 && (
        <Collapse in={open}>
          <Box
            sx={{
              display: "flex",
              flexDirection: isLTE1000 ? "row" : "column",
              gap: isLTE640 ? "" : isLTE1000 ? "35px" : "15px",
              justifyContent: "center",
              alignItems: isLTE1000 ? "center" : null,
              width: "100%",
              flexWrap: isLTE640 && "wrap",
              mt: "20px",
            }}
          >
            <Autocomplete
              sx={{
                width: isLTE640 ? "40%" : isLTE1000 ? "30%" : "12rem",
                margin: isLTE640 ? "0 5px 5px 0" : "",
              }}
              value={generoSeleccionado}
              onChange={(event, newValue) => {
                setGeneroSeleccionado(newValue);
                setCombinedFilters((prevFiltros) => ({
                  ...prevFiltros,
                  gender: newValue ? newValue.gender : null,
                }));
              }}
              getOptionLabel={(option) => option.gender}
              options={genders}
              renderInput={(params) => (
                <TextField {...params} placeholder="Generos" />
              )}
            />

            <Autocomplete
              sx={{
                width: isLTE640 ? "40%" : isLTE1000 ? "30%" : "12rem",
                margin: isLTE640 ? "0 0px 5px 5px" : "",
              }}
              value={categoriaSeleccionada}
              onChange={(event, newValue) => {
                setCategoriaSeleccionada(newValue);
                setCombinedFilters((prevFiltros) => ({
                  ...prevFiltros,
                  category: newValue ? newValue.name : null,
                }));
              }}
              getOptionLabel={(option) => option.name}
              options={categorias}
              renderInput={(params) => (
                <TextField {...params} placeholder="Categorias" />
              )}
            />

            <Box sx={{ mt: isLTE640 ? "" : "2px", width: "11rem" }}>
              <Checkbox
                checked={morePopular}
                onChange={handleChangeCheckbox}
                name="morePopular"
                inputProps={{ "aria-label": "controlled" }}
              />
              <label htmlFor="morePopular">Los más gustados</label>
            </Box>
          </Box>

          <Box
            sx={{
              display: isLTE1000 ? "flex" : null,
              flexDirection: isLTE640 ? "column" : "",
              justifyContent: isLTE1000 ? "space-evenly" : null,
              alignItems: isLTE1000 ? "center" : null,
              gap: isLTE1000 ? "10px" : null,
              mt: isLTE640 ? "" : isLTE1000 ? "15px" : null,
            }}
          >
            <Slider
              sx={{
                color:
                  "linear-gradient(0deg, rgba(1,46,84,1) 0%, rgba(0,205,254,1) 100%)",
                width: isLTE1000 ? "15rem" : "12rem",
              }}
              value={[combinedFilters.price.min, combinedFilters.price.max]}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={initialPrice.min}
              max={initialPrice.max}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              Valor min: $ {combinedFilters.price.min}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              Valor max: $ {combinedFilters.price.max}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: isLTE640 ? "10px" : "20px",
              gap: "20px",
            }}
          >
            <Button
              variant="contained"
              disabled={estadoBoton}
              sx={{ mt: "10px", width: "12rem" }}
              onClick={() => handleApplyFilter()}
            >
              Aplicar filtros
            </Button>
            <Box
              sx={{
                cursor: "pointer", // Añadí esto para que el cursor indique que es un elemento clickeable
                "&:hover": {
                  color: "primary.main", // Cambia el color al pasar el mouse sobre el texto
                },
                textAlign: "center",
              }}
              onClick={() => limpiarFiltros()}
            >
              <Divider sx={{ width: "10rem", mb: "10px" }} />
              <Typography variant="subtitle2">Limpiar Filtros</Typography>
            </Box>
          </Box>
        </Collapse>
      )}

      {isLTE1000 ? null : (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: isLTE1000 ? "row" : "column",
              gap: isLTE1000 ? "35px" : "15px",
              justifyContent: "center",
              alignItems: isLTE1000 ? "center" : null,
              width: "100%",
            }}
          >
            <Autocomplete
              sx={{ width: isLTE1000 ? "30%" : "12rem" }}
              value={generoSeleccionado}
              onChange={(event, newValue) => {
                setGeneroSeleccionado(newValue);
                setCombinedFilters((prevFiltros) => ({
                  ...prevFiltros,
                  gender: newValue ? newValue.gender : null,
                }));
              }}
              getOptionLabel={(option) => option.gender}
              options={genders}
              renderInput={(params) => (
                <TextField {...params} placeholder="Generos" />
              )}
            />

            <Autocomplete
              sx={{ width: isLTE1000 ? "30%" : "12rem" }}
              value={categoriaSeleccionada}
              onChange={(event, newValue) => {
                setCategoriaSeleccionada(newValue);
                setCombinedFilters((prevFiltros) => ({
                  ...prevFiltros,
                  category: newValue ? newValue.name : null,
                }));
              }}
              getOptionLabel={(option) => option.name}
              options={categorias}
              renderInput={(params) => (
                <TextField {...params} placeholder="Categorias" />
              )}
            />

            <Box sx={{ mt: "2px", width: "11rem" }}>
              <Checkbox
                checked={morePopular}
                onChange={handleChangeCheckbox}
                name="morePopular"
                inputProps={{ "aria-label": "controlled" }}
              />
              <label htmlFor="morePopular">Los más gustados</label>
            </Box>
          </Box>

          <Box
            sx={{
              display: isLTE1000 ? "flex" : null,
              justifyContent: isLTE1000 ? "space-evenly" : null,
              alignItems: isLTE1000 ? "center" : null,
              gap: isLTE1000 ? "10px" : null,
              mt: isLTE1000 ? "15px" : null,
            }}
          >
            <Slider
              sx={{
                color:
                  "linear-gradient(0deg, rgba(1,46,84,1) 0%, rgba(0,205,254,1) 100%)",
                width: isLTE1000 ? "15rem" : "12rem",
              }}
              value={[combinedFilters.price.min, combinedFilters.price.max]}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={initialPrice.min}
              max={initialPrice.max}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              Valor min: $ {combinedFilters.price.min}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              Valor max: $ {combinedFilters.price.max}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: "20px",
              gap: "20px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => handleApplyFilter()}
              disabled={estadoBoton}
              sx={{ mt: "10px", width: "12rem" }}
            >
              Aplicar filtros
            </Button>

            <Box
              sx={{
                cursor: "pointer", // Añadí esto para que el cursor indique que es un elemento clickeable
                "&:hover": {
                  color: "primary.main", // Cambia el color al pasar el mouse sobre el texto
                },
                textAlign: "center",
              }}
              onClick={() => limpiarFiltros()}
            >
              <Divider sx={{ width: "10rem", mb: "10px" }} />
              <Typography variant="subtitle2">Limpiar Filtros</Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Filtros;
