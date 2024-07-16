import React from "react";
import { ClipLoader } from "react-spinners";

function Loading({isLoading}) {
  const override = {
    display: "block",
    margin: "0 auto",
  };

  return (
    <div style={{ marginTop: "16px" }}>
      <ClipLoader
        color="#0D6EFD"
        loading={isLoading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={0.8}
      />
      <p style={{ textAlign: "center", marginTop: "16px" }}>Loading...</p>
    </div>
  );
}

export default Loading;
