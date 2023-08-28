import ImageSlider from "../components/ImageSlider/ImageSlider";
import PopularMovies from "../components/FeatureMovies/PopularMovies";
import ActionMovies from "../components/FeatureMovies/ActionMovies";
import DramaMovies from "../components/FeatureMovies/DramaMovies";
import MysteryMovies from "../components/FeatureMovies/MysteryMovies";

const HomePage = () => {
  const sectionClasses = 'bg-white/5 mt-5 p-4';
  const titleClasses = 'text-xl font-bold text-yellow-500 border-s-4 ps-4 my-4'
  return (
    <>
      <ImageSlider />
      <section className={sectionClasses}>
        <h2 className={titleClasses}>Popular Movies</h2>
        <PopularMovies />
      </section>
      
      <section className={sectionClasses}>
        <h2 className={titleClasses}>Action Movies</h2>
        <ActionMovies />
      </section>

      <section className={sectionClasses}>
        <h2 className={titleClasses}>Drama Movies</h2>
        <DramaMovies />
      </section>

      <section className={sectionClasses}>
        <h2 className={titleClasses}>Drama Movies</h2>
        <MysteryMovies />
      </section>
    </>
  );
};

export default HomePage;
