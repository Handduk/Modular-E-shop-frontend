interface PaginationProps {
  prodPerPage: number;
  totalProducts: number;
  currentPage: number;
  paginate: (pagenumber: number) => void;
}
export const PaginationMenu = ({
  prodPerPage,
  totalProducts,
  paginate,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / prodPerPage); i++) {
    pageNumbers.push(
      <button key={i} onClick={() => paginate(i)}>
        {i}
      </button>
    );
  }

  return (
    <div className="h-12 flex justify-center items-center space-x-2">
      {pageNumbers &&
        pageNumbers.map((num, index) => (
          <div key={index} className="text-xl">
            {num}
          </div>
        ))}
    </div>
  );
};
