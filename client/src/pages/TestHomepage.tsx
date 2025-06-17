import React from "react";

export default function TestHomepage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      color: "white",
      fontSize: "24px",
      fontWeight: "bold"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.2)",
        padding: "40px",
        borderRadius: "20px",
        textAlign: "center",
        border: "3px solid white"
      }}>
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
          TEST HOMEPAGE LOADED
        </h1>
        <p style={{ fontSize: "18px" }}>
          This confirms the routing system is working correctly
        </p>
      </div>
    </div>
  );
}