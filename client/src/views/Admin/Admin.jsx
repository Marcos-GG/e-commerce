/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Comments from "../../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { allComments } from "../../Redux/actions/CommentsAction";
import { Box } from "@mui/material";

import Circularprogress from "../../components/CircularProgress";
import { getProductsAll } from "../../Redux/actions/productsActions";

const Admin = () => {
  const dispatch = useDispatch();
  const AllComments = useSelector((state) => state.comments.comments);

  useEffect(() => {
    dispatch(allComments());
    dispatch(getProductsAll());
  }, []);

  useEffect(() => {
    if (AllComments !== null) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [AllComments]);

  const [commentsOrdenados, setCommentsOrdenados] = useState();

  useEffect(() => {
    const orderedArray = AllComments.sort((a, b) => {
      // Obtenemos el tiempo de creación de la última respuesta si hay respuestas, de lo contrario obtenemos el tiempo de creación del comentario
      const ultimoTiempoRespuestaA =
        a.Answers.length > 0
          ? a.Answers[a.Answers.length - 1].createdAt
          : a.createdAt;
      const ultimoTiempoRespuestaB =
        b.Answers.length > 0
          ? b.Answers[b.Answers.length - 1].createdAt
          : b.createdAt;

      // Comparamos los tiempos de creación de la última respuesta o del comentario
      if (ultimoTiempoRespuestaA > ultimoTiempoRespuestaB) {
        return 1;
      } else if (ultimoTiempoRespuestaA < ultimoTiempoRespuestaB) {
        return -1;
      } else {
        return 0;
      }
    });

    setCommentsOrdenados(orderedArray);
  }, [AllComments]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (AllComments !== null) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [AllComments]);

  return (
    <Box>
      {isLoading ? (
        <Circularprogress />
      ) : (
        <Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url("/fondoChat.jpg")`, // URL de la imagen de fondo
              filter: "blur(3px)", // Aplicar desenfoque al fondo
              zIndex: -1,
            }}
          />
          <Comments comments={commentsOrdenados} />
        </Box>
      )}
    </Box>
  );
};

export default Admin;
