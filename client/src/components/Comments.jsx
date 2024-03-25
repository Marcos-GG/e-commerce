/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import UserAvatar from "./UserAvatar";
import { jwtDecode } from "jwt-decode";
import {
  Badge,
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import FormatoHora from "./FormatoHora";
import SelectedComment from "./SelectedComment";
import { useSelector } from "react-redux";

const Comments = ({ comments }) => {
  const theme = useTheme();
  const isLTE425 = useMediaQuery("(max-width:425px)");
  const isLTE430 = useMediaQuery(`(max-width: 430px)`);
  const isLTE765 = useMediaQuery(`(max-width: 765px)`);
  const isLessThanOrEqual820 = useMediaQuery(theme.breakpoints.down(820));
  const isLessThanOrEqual980 = useMediaQuery(theme.breakpoints.down(980));
  const isLTE1268 = useMediaQuery(`(max-width: 1268px)`);
  const isLessThanOrEqual1662 = useMediaQuery(theme.breakpoints.down(1662));

  const products = useSelector((state) => state.products.products);
  console.log(comments);

  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode(token);
  const userId = decodeToken.id;

  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    if (selectedComment) {
      const comentario = comments.find(
        (comment) => comment.id === selectedComment.id
      );

      setSelectedComment(comentario);
    }
  }, [comments]);

  const scrollContainerRef = useRef(null); // referencia al contenedor de scroll

  const handleSelectedComment = (comment) => {
    setSelectedComment(comment);
  };

  const handleCleanComment = () => {
    setSelectedComment(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isLTE765 ? "" : "center",
        flexDirection: isLTE765 ? "column" : "row",
        mt: isLTE430 ? "" : isLTE765 ? "" : "20px",
      }}
    >
      <Box
        sx={{
          width: isLTE765 ? "100%" : "30%",
          minWidth: "20rem",
          background:
            "linear-gradient(0deg, rgba(1,46,84,1) 0%, rgba(0,205,254,1) 100%)",
          height:
            isLTE430 && !selectedComment
              ? `calc(100vh - 3.2rem)`
              : isLTE765
              ? `calc(100vh - 3.2rem)`
              : "45.59rem",
          borderRadius: isLTE430 ? "" : "8px 0 0 8px",
          overflow: "auto",
          boxShadow: "14px 10px 15px #888888;",
          display: isLTE765 && selectedComment ? "none" : "block",
        }}
      >
        {comments?.map((comment) => (
          <Box
            key={comment.id}
            sx={{
              display: "flex",
              height: isLTE430 ? "4.3rem" : "4.5rem",
              width: "100%",
              mt: "10px",
              flexDirection: "column",
              paddingX: "10px",
              position: "relative", // posición relative para que la línea divisoria pueda ser posicionada de forma absoluta
              "&:not(:last-child)": {
                marginBottom: isLTE430 ? "" : "10px",
              },
              animation:
                comment.id === selectedComment?.id
                  ? "slide-down 0.3s ease"
                  : "none",
            }}
            onClick={() => handleSelectedComment(comment)}
          >
            <Box sx={{ alignSelf: "flex-end" }}>
              <FormatoHora
                hora={
                  comment?.Answers.length > 0
                    ? comment?.Answers?.slice(-1)[0]?.createdAt
                    : comment?.createdAt
                }
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <UserAvatar user={comment.User} />

              <Typography
                sx={{
                  width: "15rem",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  ml: isLTE430 ? "10px" : "20px",
                  fontSize: isLTE425 && "15.5px",
                }}
              >
                {comment?.Answers.length > 0
                  ? comment?.Answers?.slice(-1)[0]?.answer
                  : comment?.text}
              </Typography>
            </Box>

            <Divider
              sx={{
                position: "absolute",
                bottom: "0", // posicionar la línea al fondo de la caja
                width: "86%", // que la línea ocupe el % del ancho de la caja
                marginLeft: !isLTE430 && "10%", // centrar la línea horizontalmente
              }}
            />
            {/* <Badge color="secondary" variant="dot"></Badge> */}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          width: isLTE765 ? "100%" : "60%",
        }}
      >
        {selectedComment ? (
          <SelectedComment
            selectedComment={selectedComment}
            isLTE430={isLTE430}
            isLessThanOrEqual820={isLessThanOrEqual820}
            isLessThanOrEqual980={isLessThanOrEqual980}
            isLessThanOrEqual1268={isLTE1268}
            isLessThanOrEqual1662={isLessThanOrEqual1662}
            scrollContainerRef={scrollContainerRef}
            userId={userId}
            handleCleanComment={handleCleanComment}
          />
        ) : (
          <Box
            sx={{
              display: isLTE765 ? "none" : "block",
              width: isLTE1268
                ? "100%"
                : isLessThanOrEqual1662
                ? "50rem"
                : "68rem",
              height:
                isLTE430 && !selectedComment
                  ? `calc(100vh - 3.2rem)`
                  : "45.59rem",
              borderRadius: "0 10px 10px 0",
              backgroundColor: "#F5F5F5",
              boxShadow: "10px 10px 15px #888888",
              backgroundImage: 'url("/logoblanco.svg")',
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Comments;
