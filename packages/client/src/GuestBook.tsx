import React, { useContext } from "react";
import "./GuestBook.css";
import { PortfolioContext } from "./context/PortfolioContext";
import PartContainer from "./PartContainer";

const GuestBook = () => {
  const context = useContext(PortfolioContext);

  const { data, loading, error } = context || {};

  return loading ? (
    <></>
  ) : (
    <PartContainer title="Guest Book" style={{ backgroundColor: "#CAF4FF" }}>
      <div className="about-row">
        <div className="about-detail">
          <img src="./name_icon.png" />
          <div className="about-title">이름</div>
          <div className="about-content">{data.name}</div>
        </div>
      </div>
      <div className="about-row">
        <div className="about-detail">
          <img src="./birth_icon.png" />
          <div className="about-title">생년월일</div>
          <div className="about-content">{data.birth}</div>
        </div>
        <div className="about-detail">
          <img src="./email_icon.png" />
          <div className="about-title">이메일</div>
          <div className="about-content">{data.eMail}</div>
        </div>
      </div>
      <div className="about-row">
        <div className="about-detail">
          <img src="./address_icon.png" />
          <div className="about-title">주소</div>
          <div className="about-content">{data.locate}</div>
        </div>
        <div className="about-detail">
          <img src="./graduation_icon.png" />
          <div className="about-title">학력</div>
          <div className="about-content">{data.graduated}</div>
        </div>
      </div>
    </PartContainer>
  );
};

export default GuestBook;
