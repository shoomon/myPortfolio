import React from "react";
import "./Title.css";

const Title = () => {
  return (
    <div className="image-container">
      <div className="image-info"></div>
      <div className="image-content">
        <h2 className="image-title">
          -김수민-
          <br />
          개발자 포트폴리오
        </h2>
        <p className="image-description">
          안녕하세요. <br />
          공부가 취미인 풀 스택 웹 개발자입니다. <br />
          매우 꼼꼼한 성격, 그리고 공부를 밥 먹듯이 하는 습관이 저의 장점입니다.
        </p>
      </div>
    </div>
  );
};

export default Title;
