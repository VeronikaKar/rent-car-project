import s from "./LoadMore.module.css";

const LoadMore = ({ handleLoadMoreClick }) => {
  return (
    <button onClick={handleLoadMoreClick} className={s.loadMoreButton}>
      Load more
    </button>
  );
}
export default LoadMore;
