import { Topsection } from "../Topsection/Topsection";
import "./Homepage.css";
import "../CategorySection/Category.css";
import { CategorySection } from "../CategorySection/CategorySection";

export const Homepage = () => {
  return (
    <>
      <div className="contentBody">
        <div className="content">
          <Topsection />
          <CategorySection />
        </div>
      </div>
    </>
  );
};
