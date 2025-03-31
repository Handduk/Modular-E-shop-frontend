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
        options: ["Bryggmalet", "Böna"],
        variants: ["250g", "500g", "1kg", "2,5kg"],
      },
      {
        id: 2,
        categoryId: 1,
        name: "Coldbrew",
        description: "Kallt kaffe",
        img: ["/IMG/cold-brew.jpg"],
        price: 39,
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
        discount: 20,
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
    <span className="w-full flex flex-wrap justify-center mb-6 pr-4">
      {categorys &&
        categorys.map((res, index) => (
          <div className="w-6/12 pl-4 pb-4" key={index}>
            <div className="h-[175px] border border-secondary-color rounded-[2.5px] border-solid">
              <img
                src={res.img}
                alt={res.name}
                className="h-full w-full object-cover cursor-pointer rounded-[5px]"
                onClick={() => navigate(res.link)}
              />
            </div>
            <div className="flex justify-center mb-2">
              <a
                href={res.link}
                className="!no-underline !text-secondary-color border-b border-secondary-color"
              >
                {res.name}
              </a>
            </div>
          </div>
        ))}
    </span>
  );
};
