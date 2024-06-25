import React from "react";

import About from "./About";
import "./App.css";
import Header from "./Header";
import Title from "./Title";
import { PortfolioProvider } from "./context/PortfolioContext";
import Diary from "./Diary";
import GuestBook from "./GuestBook";
import { DiaryProvider } from "./context/DiaryContext";

function App() {
  return (
    <PortfolioProvider>
      <DiaryProvider>
        <Header />
        <Title />
        <About />
        <Diary />
        <GuestBook />
        <div style={{ height: "200px" }}>test</div>
        <div style={{ height: "200px" }}>test</div>
        <div style={{ height: "200px" }}>test</div>
        <div style={{ height: "200px" }}>test</div>
        <div style={{ height: "200px" }}>test</div>
        <div style={{ height: "200px" }}>test</div>
        <div style={{ height: "200px" }}>test</div>
      </DiaryProvider>
    </PortfolioProvider>
  );
}

export default App;
