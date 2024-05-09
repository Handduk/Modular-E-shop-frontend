import { Pagination } from "react-bootstrap";

interface PaginationProps {
  prodPerPage: number;
  totalProducts: number;
  currentPage: number;
  paginate: (pagenumber: number) => void;
}
export const PaginationMenu = ({
  prodPerPage,
  totalProducts,
  currentPage,
  paginate,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / prodPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item
        className="pageItem-product"
        onClick={() => paginate(i)}
        key={i}
        active={i === currentPage}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="pageNumbers-product" size="lg">
      {pageNumbers}
    </Pagination>
  );
};
