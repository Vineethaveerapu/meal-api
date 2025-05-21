import "./heroSection.scss";
import Search from "@/components/Search";

const HeroSection = () => {
  return (
    <div className="hero__container">
      <div className="hero__container__content">
        <h1>Experience Global Cuisine</h1>
        <p>
          Discover the finest culinary experiences and authentic flavors from
          around the world. Your journey to exceptional dining starts here.
        </p>
        <Search />
      </div>
    </div>
  );
};

export default HeroSection;
