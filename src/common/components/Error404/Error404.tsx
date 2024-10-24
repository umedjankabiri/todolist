import { useAppSelector } from "common/hooks/useAppSelector.ts";
import { selectThemeMode } from "common/selectors/themesSelectors.ts";
import { Typography } from "@mui/material";

export const Error404 = () => {
  const themeMode = useAppSelector(selectThemeMode);

  return (
    <div>
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          fontSize: "250px",
          margin: 0,
          color: `${themeMode === "light" ? "#0993cb" : "#033844"}`,
        }}
      >
        404
      </Typography>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          fontSize: "50px",
          margin: 0,
          color: `${themeMode === "light" ? "#0993cb" : "#033844"}`,
        }}
      >
        page not found
      </Typography>
    </div>
  );
};
