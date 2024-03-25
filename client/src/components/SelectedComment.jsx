/* eslint-disable react/prop-types */
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import AnswerComment from "./AnswerComment";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const SelectedComment = ({
  selectedComment,
  isLTE430,
  scrollContainerRef,
  userId,
  handleCleanComment,
  // setSelectedComment,
}) => {
  const isLTE425 = useMediaQuery("(max-width:425px)");
  const isLTE765 = useMediaQuery(`(max-width: 765px)`);
  const isLTE768 = useMediaQuery("(max-width:768px)");
  const isLTE600 = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (scrollContainerRef.current && selectedComment) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight; // Ajustar la posición de desplazamiento al final del contenedor
    }
  }, [selectedComment, scrollContainerRef]);

  return (
    <Box
      sx={{
        width: "100%",
        height: isLTE768 ? `calc(100vh - 4.7rem )` : "45.59rem",
        borderRadius: isLTE430 ? "" : " 0 10px 10px 0 ",
        backgroundColor: "#f5f5f5",
        boxShadow: "10px 10px 15px #888888;",
        backgroundImage: 'url("/logoblanco.svg")',
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {isLTE765 && (
        <Box
          sx={{
            bgcolor: "#0060a5",
            position: "sticky",
            top: 0,
            width: "100%",
            height: "1.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            gap: "10px",
            cursor: "pointer",
          }}
          onClick={() => handleCleanComment()}
        >
          <KeyboardReturnIcon sx={{ fontSize: "16px" }} />
          mensajes
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: isLTE430 ? "100%" : "95%",
        }}
      >
        <Box
          ref={scrollContainerRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: isLTE765 ? "100%" : "100%",
            maxHeight: isLTE765 ? "100hv" : "100vh", // Establecer la altura máxima para activar el scroll
            overflowY: "auto", // Habilitar el scroll vertical cuando el contenido excede la altura máxima
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: isLTE768 ? "19rem" : "24rem",
              maxWidth: "70%",
              mx: "5px",
              mt: isLTE600 ? "12px" : "5px",
              borderRadius: "0 15px 15px 15px",
              padding: isLTE768 ? "5px" : "10px",
              border: "1px solid #00CCFD",
              bgcolor: "#F5F5F5",
              boxShadow: "10px 10px 15px #888888;",
              wordBreak: "break-all",
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                textAlign: "start",
                fontWeight: "bold",
                fontSize: isLTE425 && "12px",
              }}
            >
              {selectedComment?.User?.name || ""}{" "}
              {selectedComment?.User?.lastname || ""}
            </Typography>

            <Typography
              sx={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                boxSizing: "border-box",
                fontSize: isLTE425 && "15.5px",
                mt: isLTE425 && "-6px",
                height: "100%",
              }}
            >
              {selectedComment?.text}
            </Typography>
          </Box>

          {selectedComment?.Answers?.sort((a, b) => {
            if (a.createdAt < b.createdAt) return -1;
            else if (a.createdAt > b.createdAt) return 1;
            return 0;
          }).map((answer) => (
            <Box
              key={answer.id}
              sx={{
                display: "flex",
                justifyContent:
                  userId === answer?.userId ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  bgcolor: userId === answer?.userId ? "#00CCFD" : "#F5F5F5",
                  width: isLTE768 ? "19rem" : "24rem",
                  maxWidth: "70%",
                  borderRadius:
                    userId === answer.userId
                      ? "15px 15px 0px 15px;"
                      : "0 15px 15px 15px",
                  mx: isLTE425 ? "5px" : "8px",
                  alignItems: "start",
                  flexDirection: "column",
                  padding: isLTE768 ? "5px" : "10px",
                  my: "5px",
                  border: "1px solid #00CCFD",
                  boxShadow: "10px 10px 15px #888888",
                  overflowWrap: "break-word",
                  wordBreak: "break-all",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "start",
                    fontWeight: "bold",
                    fontSize: isLTE425 && "12px",
                  }}
                >
                  {answer.User.name || ""} {answer?.User?.lastname || ""}
                </Typography>
                <Typography
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    boxSizing: "border-box",
                    fontSize: isLTE425 && "15.5px",
                    mt: isLTE425 && "-6px",
                  }}
                >
                  {answer.answer}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            bgcolor: "#F5F5F5",
            display: "flex",
            mt: "5px",
            alignItems: "center",
            boxShadow: "0px -10px 15px #888888;",
            position: isLTE430 & "fixed",
            width: "100%",
            height: "4rem",
            bottom: 0,
          }}
        >
          <AnswerComment commentId={selectedComment?.id} />
        </Box>
      </Box>
    </Box>
  );
};

export default SelectedComment;
