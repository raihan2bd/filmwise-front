const AboutPage = () => {
  const About =
    "FilmWise: Your Ultimate Movie Hub. Experience movies like never before with FilmWise, the web application that allows you to dive into detailed movie information, share your thoughts through comments and reviews, and connect with fellow cinephiles. Discover, discuss, and decide on your favorite films, all in one place. FilmWise is the ultimate movie hub for all your cinematic needs. You can search for movies and dramas by name or genre. If you like a movie that is not on the list, you can add it so that your friends can see it.";
  const Team = [
    {
      id: 1,
      image: "https://avatars.githubusercontent.com/u/35267447?v=4",
      name: "Abu Rihan",
      role: "Frontend + Backed",
      github: "https://github.com/raihan2bd",
      linkdin: "https://www.linkedin.com/in/raihan2bd/",
      Twitter: "https://twitter.com/raihan2bd",
    },
    {
      id: 2,
      image: "https://avatars.githubusercontent.com/u/80938128?v=4",
      name: "Hassaan Baig",
      role: "Frontend",
      github: "https://github.com/hassaanjbaig-code",
      linkdin: "https://www.linkedin.com/in/hassaan-jawwad-baig/",
    }
  ]
 return <section className="w-full">
    <div className="flex w-full flex-col justify-center items-center my-2">
    <h2 className="font-semibold text-7xl my-6 ">About</h2>
    <p className="container text-xl font-sans">{About}</p>
    </div>
    <div>
      <h2 className="font-semibold text-7xl my-6 text-center">Team</h2>
      <ul className="flex max-md:flex-col md:justify-between justify-center items-center gap-2 w-full my-4">
        {Team.map((member) => (
          <li key={member.id} className="flex justify-center items-center md:mx-4 gap-3">
          <div>
             <img className="w-40 h-40 rounded-md" src={member.image} alt={member.name} />
          </div>
          <div>
              <h3 className="font-semibold text-2xl">{member.name}</h3>
              <p className="font-semibold text-xl">{member.role}</p>
              <p className="font-semibold text-xl"><span className="font-semibold">Github:</span> <a href={member.github} className="text-gray-400 text-lg">Click me</a></p>
              <p className="font-semibold text-xl">Linkdin: <a href={member.linkdin} className="text-gray-400 text-lg">Click me</a></p>
              {member.Twitter && <p className="font-semibold text-xl">Twitter: <a href={member.Twitter} className="text-gray-400 ml-2 text-lg">Click me</a></p>}
          </div>
          </li>
        ))}
      </ul>
        <div className="">
          </div>
    </div>
  </section>;
};

export default AboutPage;
