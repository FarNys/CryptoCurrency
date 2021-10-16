import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutContainer = ({ information }) => {
  return <Doughnut className="doughnut_diagram" data={information} />;
};

export default DoughnutContainer;
