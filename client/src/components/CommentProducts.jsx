import { useState } from "react";
import { useDispatch } from "react-redux";
import { postComment } from "../Redux/actions/CommentsAction";
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// eslint-disable-next-line react/prop-types
const CommentProducts = ({ productId }) => {
  const isLTE768 = useMediaQuery("(max-width:768px)");

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    text: "",
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

    if (form.text.trim() === "") {
      return;
    }

    dispatch(postComment(form, token, productId));

    setForm({ text: "" });
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
            name="text"
            value={form.text}
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

export default CommentProducts;
