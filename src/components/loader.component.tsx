import classes from "./loader.module.css";
import { Bars } from "react-loader-spinner";
export const Loader = () => {
  return (
    <div className={classes.loaderContainer}>
      <div>
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};
