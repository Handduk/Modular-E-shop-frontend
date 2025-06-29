import { Topsection } from "../Sections/Topsection/Topsection";
import { CategorySection } from "../Sections/CategorySection/CategorySection";
import { SecondSection } from "../Sections/SecondSection/SecondSection";
import { Header } from "../Sections/Header/Header";

export const Homepage = () => {
  return (
    <>
      <div className="contentBody md:pt-0">
        <div className="content">
          <Header />
          <Topsection />
          <CategorySection />
          <SecondSection />
        </div>
      </div>
    </>
  );
};
