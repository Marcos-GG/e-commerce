import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  postAnswer /* postAnswerAdmin  */,
} from "../Redux/actions/CommentsAction";
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// eslint-disable-next-line react/prop-types
const AnswerComment = ({ commentId, productId }) => {
  const isLTE768 = useMediaQuery("(max-width:768px)");

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    answer: "",
  });

  const formHandler = (event) => {
    event.preventDefault();
    const campo = event.target.name;
    const value = event.target.value;

    setForm({
      ...form,
      [campo]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.answer.trim() === "") {
      return;
    }

    dispatch(postAnswer(form, commentId, productId));
    // dispatch(postAnswerAdmin(form, commentId));

    setForm({ answer: "" });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: isLTE768 ? "3rem" : "4rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            mx: "10px",
            overflow: "hidden",
            maxHeight: isLTE768 ? "3rem" : "3.8rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            type="text"
            name="answer"
            value={form.answer}
            onKeyPress={handleKeyPress}
            onChange={formHandler}
            multiline
            fullWidth
            sx={{
              width: "100%",
              mt: "5px",
              overflow: "auto",
              maxHeight: isLTE768 ? "3rem" : "3.8rem",
            }}
            InputProps={{
              sx: {
                textAlign: "center",
                fontSize: isLTE768 ? "15px" : "18px",
                overflow: "auto",
              },
            }}
          />
        </Box>
        <Button
          sx={{
            borderRadius: "10px",
            border: "2px solid #F5F5F5",
            mr: "10px", // Ajuste de margen para separar el TextField del botón
          }}
          type="submit"
          variant="text"
          endIcon={
            <SendIcon
              sx={{ m: isLTE768 ? "4px 9px 4px 0" : "7px 9px 7px 0" }}
            />
          }
        ></Button>
      </form>
    </Box>
  );
};

export default AnswerComment;
