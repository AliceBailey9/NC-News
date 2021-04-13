import React from "react";

function ErrorPage({ status, msg }) {
  return (
    <p>
      {status} = {msg}
    </p>
  );
}

export default ErrorPage;
