import { Image } from "react-bootstrap";
import { Category } from "../../../../Models/Category";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category2 } from "../../../Shop/Categorys/Category2/Category2";
import { Category3 } from "../../../Shop/Categorys/Category3/Category3";
import { Category4 } from "../../../Shop/Categorys/Category4/Category4";
import { Category1 } from "../../../Shop/Categorys/Category1/Category1";

export const categoryList: Category[] = [
  {
    id: 1,
    name: "kaffe",
    img: "/IMG/produkt.jpg",
    link: "/shop/coffee",
    component: <Category1 />,
  },
  {
    id: 2,
    name: "Tillbehör",
    img: "/IMG/press.jpg",
    link: "/shop/accessories",
    component: <Category2 />,
  },
  {
    id: 3,
    name: "kläder",
    img: "/IMG/keps.jpg",
    link: "/shop/clothes",
    component: <Category3 />,
  },
  {
    id: 4,
    name: "porsil",
    img: "/IMG/koppar.jpg",
    link: "/shop/porcelain",
    component: <Category4 />,
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
