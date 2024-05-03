import { Image } from "react-bootstrap";
import { Category } from "../../../../Models/Category";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//TEMPDATA
const categoryList: Category[] = [
  {
    id: 1,
    name: "kaffe",
    img: "/IMG/produkt.jpg",
    link: "/coffee",
  },
  {
    id: 2,
    name: "Tillbehör",
    img: "/IMG/press.jpg",
    link: "/accessories",
  },
  {
    id: 3,
    name: "kläder",
    img: "/IMG/keps.jpg",
    link: "/clothes",
  },
  {
    id: 4,
    name: "koppar",
    img: "/IMG/koppar.jpg",
    link: "/cups",
  },
];

export const CategorySection = () => {
  const [categorys, setCategorys] = useState<Category[]>(categoryList);
  const navigate = useNavigate();

  return (
    <span className="section-category">
      {categorys &&
        categorys.map((res, index) => (
          <div className="card-category" key={index}>
            <div className="imgContainer-category">
              <Image
                src={res.img}
                fluid
                className="img-category"
                onClick={() => navigate(res.link)}
              />
            </div>
            <div className="link-category">
              <a href={res.link}>{res.name}</a>
            </div>
          </div>
        ))}
    </span>
  );
};
