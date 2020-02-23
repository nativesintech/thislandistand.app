import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";

import { make as App } from "../lib/es6_global/src/App";

ReactDOM.render(<App />, document.querySelector("#root"));
