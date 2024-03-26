/* eslint-disable react/prop-types */
import { Box, useMediaQuery } from "@mui/material";
import Card from "./Card";

function CardContainer({ products }) {
  const isLTE490 = useMediaQuery("(max-width:490px)");
  const isLTE666 = useMediaQuery("(max-width:666px)");
  const isLTE707 = useMediaQuery("(max-width:707px)");
  const isLTE769 = useMediaQuery("(max-width:769px)");
  const isLTE914 = useMediaQuery("(max-width:914px)");
  const isLTE996 = useMediaQuery("(max-width:995px)");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        ml: isLTE490
          ? "0"
          : isLTE666
          ? "1rem"
          : isLTE707
          ? "2rem"
          : isLTE769
          ? "4.2rem"
          : isLTE914
          ? "3rem"
          : isLTE996
          ? "1.4rem"
          : "",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: isLTE769 && "center",
          gap: 2,
        }}
      >
        {products &&
          products?.map((product) => (
            <Box key={product?.id}>
              <Card product={product} />
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default CardContainer;
