import React from "react";
import "../styles/Page404.css";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
const Page404 = () => {
  return (
    <div className="page404_container">
      <div className="title_page404">
        <h2>Nothing Is Here . . . !</h2>
      </div>
      <div className="image_404">
        <SentimentVeryDissatisfiedIcon className="image_404_icon" />
      </div>
    </div>
  );
};

export default Page404;
