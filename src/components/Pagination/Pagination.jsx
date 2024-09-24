import PropTypes from "prop-types";
import "./Pagination.scss";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

const Pagination = ({ currentPage, totalPage, changePage }) => {
  const maxPagesToShow = 4;

  const getPageNumbers = () => {
    const pages = [];

    if (totalPage <= maxPagesToShow) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(
        totalPage,
        currentPage + Math.floor(maxPagesToShow / 2)
      );

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPage) {
        if (endPage < totalPage - 1) {
          pages.push("...");
        }
        pages.push(totalPage);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination" data-testid="pagination">
      <div className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <TbChevronLeft />
        </button>
      </div>

      {pageNumbers.map((number, index) => (
        <div
          key={index}
          className={`page-item ${currentPage === number ? "active" : ""}`}
        >
          {number === "..." ? (
            <span className="page-link">...</span>
          ) : (
            <button className="page-link" onClick={() => changePage(number)}>
              {number}
            </button>
          )}
        </div>
      ))}

      <div
        className={`page-item ${currentPage === totalPage ? "disabled" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          <TbChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};
