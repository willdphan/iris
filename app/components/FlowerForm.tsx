/* @server-components */
"use client";

import React, { useState } from "react";

export default function FlowerForm() {
  const [prediction, setPrediction] = useState("");
  const [sepalLength, setSepalLength] = useState("");
  const [sepalWidth, setSepalWidth] = useState("");
  const [petalLength, setPetalLength] = useState("");
  const [petalWidth, setPetalWidth] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8080/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          sepalLength,
          sepalWidth,
          petalLength,
          petalWidth,
        }),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await response.json();
      setPrediction(data.prediction_text);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Flower Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="placeholder:text-black text-black"
          placeholder="Enter Sepal Length"
          type="text"
          name="sepalLength"
          value={sepalLength}
          onChange={(e) => setSepalLength(e.target.value)}
        />
        <input
          className="placeholder:text-black text-black"
          placeholder="Enter Sepal Width"
          type="text"
          name="sepalWidth"
          value={sepalWidth}
          onChange={(e) => setSepalWidth(e.target.value)}
        />
        <input
          className="placeholder:text-black text-black"
          placeholder="Enter Petal Length"
          type="text"
          name="petalLength"
          value={petalLength}
          onChange={(e) => setPetalLength(e.target.value)}
        />
        <input
          className="placeholder:text-black text-black"
          placeholder="Enter Petal Width"
          type="text"
          name="petalWidth"
          value={petalWidth}
          onChange={(e) => setPetalWidth(e.target.value)}
        />
        <button
          className="placeholder:text-black text-black bg-white"
          type="submit"
        >
          Predict
        </button>
      </form>

      {prediction && <p>{prediction}</p>}
    </div>
  );
}
