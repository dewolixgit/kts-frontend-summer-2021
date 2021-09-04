import React from "react";
import "./Avatar.css";

export type AvatarProps = React.PropsWithChildren<{
  alt: string;
  letter: string;
  src?: string;
}>;

const Avatar: React.FC<AvatarProps> = ({ alt, letter, src }) => {
  return (
    <div className="avatar">
      {src !== undefined ? <img src={src} alt={alt} /> : letter}
    </div>
  );
};

export default Avatar;
