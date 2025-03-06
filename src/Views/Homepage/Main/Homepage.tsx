import { Topsection } from "../Sections/Topsection/Topsection";
import { CategorySection } from "../Sections/CategorySection/CategorySection";
import { SecondSection } from "../Sections/SecondSection/SecondSection";

export const Homepage = () => {
  return (
    <>
      <div className="contentBody">
        <div className="content">
          <Topsection />
          <CategorySection />
          <SecondSection />
        </div>
      </div>
    </>
  );
};
