import React, { Fragment } from "react";
import spinner from "../../static/loading.gif";

export default () => {
  return (
    <div className="spinner-wrapper">
      <Fragment>
        <img src={spinner} className="spinner" alt="Loading..." />
      </Fragment>
    </div>
  );
};
