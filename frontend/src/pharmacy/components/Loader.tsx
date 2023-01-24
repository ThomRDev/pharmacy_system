import { Box } from "@mui/material";
export const Loader = () => {
  return (
    <Box display={"grid"} sx={{ placeItems: "center" ,margin:"1.5em 0" }} >
      <span className="loader" style={{ display: "block" }}></span>
    </Box>
  )
}
