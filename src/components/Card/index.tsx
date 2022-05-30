import React, { FC } from "react";
import "./style.sass";

type TCardProps = {
  title?: string,
  children?: JSX.Element,
};

const Card: FC<TCardProps> = ({ title, children}) => {
  return (
    <div className="Card">
      <div className="Title">{title}</div>

      <div className="Content">{children}</div>
    </div>
  );
};

export { Card, TCardProps }