import PropTypes from "prop-types";
import "./Skeleton.scss";

const Skeleton = ({ rows = 1, width = null, height = null }) => {
  const skeletonStyle = {
    width: width ? `${width}px` : "100%",
    height: height ? `${height}px` : "20px",
  };

  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={"skeleton"}
          data-testid="skeleton"
          style={skeletonStyle}
        >
          <div className="skeleton__shimmer" />
        </div>
      ))}
    </>
  );
};

Skeleton.propTypes = {
  rows: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Skeleton;
