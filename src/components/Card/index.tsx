import React, { FC } from "react";
import "./style.scss";

type TCardProps = {
  /**
   * Is this the title of the card.
   */
  title?: string,
  /**
   * Is this the child component of the card. (The content)
   */
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