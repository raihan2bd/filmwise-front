const AboutPage = () => {
  const About =
    "FilmWise: Your Ultimate Movie Hub. Experience movies like never before with FilmWise, the web application that allows you to dive into detailed movie information, share your thoughts through comments and reviews, and connect with fellow cinephiles. Discover, discuss, and decide on your favorite films, all in one place. FilmWise is the ultimate movie hub for all your cinematic needs. You can search for movies and dramas by name or genre. If you like a movie that is not on the list, you can add it so that your friends can see it.";
  return <section className="w-full">
    <div className="flex w-full flex-col justify-center items-center my-2">
    <h2 className="font-semibold text-7xl my-6 ">About</h2>
    <p className="container text-xl font-sans">{About}</p>
    </div>
    <div>
      <h2 className="font-semibold text-7xl my-6 ">Team</h2>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <img className="w-40 h-40 rounded-full" src="https://avatars.githubusercontent.com/u/77647073?v=4" alt="profile" />
          <h3 className="font-semibold text-2xl my-2">Jihoon Kim</h3>
          <p className="font-semibold text-xl my-2">Frontend</p>
          <p className="font-semibold text-xl my-2">Github: <a href="#">jihoon7949</a></p>
          <p className="font-semibold text-xl my-2">Linkdin: <a href="#">jihoon7949</a></p>
          </div>
          </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <img className="w-40 h-40 rounded-full" src="https://avatars.githubusercontent.com/u/77647073?v=4" alt="profile" />
          <h3 className="font-semibold text-2xl my-2">Jihoon Kim</h3>
          <p className="font-semibold text-xl my-2">Frontend</p>
          <p className="font-semibold text-xl my-2">Github: <a href="#">jihoon7949</a></p>
          <p className="font-semibold text-xl my-2">Linkdin: <a href="#">jihoon7949</a></p>
          </div>
          </div>
    </div>
  </section>;
};

export default AboutPage;
