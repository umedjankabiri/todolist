import stl from "./Error404.module.css";

export const Error404 = () => {
  return (
    <div>
      <h1 className={stl.errorTitle}>404</h1>
      <h2 className={stl.errorSubTitle}>page not found</h2>
    </div>
  );
};
