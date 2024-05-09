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
    name: "Kaffe",
    img: "/IMG/produkt.jpg",
    link: "/shop/coffee",
    component: <Category1 />,
    products: [
      {
        id: 1,
        categoryId: 1,
        name: "Helgkaffe",
        description: "Kaffe just för helgen",
        img: ["/IMG/produkt.jpg"],
        price: 69,
        stock: 102,
      },
      {
        id: 2,
        categoryId: 1,
        name: "Coldbrew",
        description: "Kallt kaffe",
        img: ["/IMG/cold-brew.jpg"],
        price: 39,
        stock: 17,
      },
      {
        id: 3,
        categoryId: 1,
        name: "Testvara med långt namn",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.\
        Architecto alias atque ad perferendis id in ullam accusamus",
        img: ["/IMG/press.jpg", "/IMG/cold-brew.jpg", "/IMG/produkt.jpg"],
        price: 1299,
        sale: 20,
        stock: 3,
      },
    ],
  },
  {
    id: 2,
    name: "Tillbehör",
    img: "/IMG/press.jpg",
    link: "/shop/accessories",
    component: <Category2 />,
    products: [],
  },
  {
    id: 3,
    name: "Kläder",
    img: "/IMG/keps.jpg",
    link: "/shop/clothes",
    component: <Category3 />,
    products: [],
  },
  {
    id: 4,
    name: "Porslin",
    img: "/IMG/koppar.jpg",
    link: "/shop/porcelain",
    component: <Category4 />,
    products: [],
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
