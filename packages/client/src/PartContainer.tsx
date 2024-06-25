import React, { ReactNode } from "react";
import "./PartContainer.css";

interface PartContainerProps {
  title: string;
  style?: React.CSSProperties;
  children: ReactNode;
}

const PartContainer: React.FC<PartContainerProps> = ({
  title,
  style,
  children,
}) => {
  return (
    <div className="part-container" style={{ ...style }}>
      <div className="part-title">{title}</div>
      <div className="part-detail">{children}</div>
    </div>
  );
};

export default PartContainer;
