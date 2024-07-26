import s from "./LoadMore.module.css";

export function LoadMore({ onClick }) {
  return (
    <button onClick={onClick} className={s.loadMoreButton}>
      Load more
    </button>
  );
}
