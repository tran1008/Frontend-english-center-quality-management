import React from 'react'
import { Link } from 'react-router-dom';

function NoData() {
    return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        <p style={{ marginTop: "16px" }}>There's no student in this class</p>
        </div>
    )
}

export default NoData;