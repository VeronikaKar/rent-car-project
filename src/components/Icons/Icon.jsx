import css from "./Icon.module.scss";
import { EmptyHeart } from "../images/empty_heart.svg";
import { FilledHeart } from "../images/heart_filled.svg";

const Icon = ({ className, onClick, size = 18, filled }) => {
  const HeartIcon = filled ? FilledHeart : EmptyHeart;
  return (
    <HeartIcon
      className={`${css.icon} ${className}`}
      onClick={onClick}
      width={18}
      height={18}
    />
  );
};

export default Icon;
