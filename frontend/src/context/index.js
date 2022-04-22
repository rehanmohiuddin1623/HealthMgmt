import React from "react";
import { HealthProvider } from "./health";

function Index({ children }) {
  return <HealthProvider>{children}</HealthProvider>;
}

export default Index;
