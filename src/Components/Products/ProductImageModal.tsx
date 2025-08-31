import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ProductImageModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  image: string;
}

export const ProductImageModal = ({
  show,
  setShow,
  image,
}: ProductImageModalProps) => {
  return (
    <div
      className={`fixed top-0 w-screen h-screen z-[100] 
        transition-opacity duration-500 ease-in-out overscroll-auto
        ${
          show
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
    >
      <div
        className="bg-black/50 w-full h-full flex justify-center items-center"
        onClick={() => setShow(false)}
      >
        <img
          src={image}
          alt="Product image"
          className="w-full h-full object-contain"
        />
        <button className="absolute top-4 right-6 !text-4xl">
          <FontAwesomeIcon className="text-main-color" icon={faX} />
        </button>
      </div>
    </div>
  );
};
