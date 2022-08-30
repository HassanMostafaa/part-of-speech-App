import React from "react";

export const ErrorHandler = ({ msg }) => {
  return (
    <div className="error-handler">
      <p>
        {msg}. Please Make sure that the server is running on PORT 3000. and the
        Database API on PORT 3001
      </p>
    </div>
  );
};
