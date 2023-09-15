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
 return <section className="w-full md:h-screen background_gradient">
    <div className="flex w-full flex-col justify-center items-center my-2">
    <h2 className="font-semibold text-7xl my-6 ">About</h2>
    <p className="container text-xl font-sans max-sm:px-9">{About}</p>
    </div>
    <div>
      <h2 className="font-semibold text-7xl my-6 text-center">Team</h2>
      <ul className="flex max-md:flex-col md:justify-around justify-center items-center gap-2 w-full my-6">
        {Team.map((member) => (
          <li key={member.id} className="flex justify-center items-center md:mx-4 border border-gray-500 md:p-5 p-2 mx-2 rounded-lg sm:gap-3 gap-1 text-lg my-2">
          <div>
             <img className="w-40 h-40 rounded-md" src={member.image} alt={member.name} />
          </div>
          <div>
              <h3 className="font-semibold md:text-2xl text-lg">{member.name}</h3>
              <p className="font-semibold text-sm text-gray-400 md:my-1">{member.role}</p>
              <p className="font-semibold md:text-xl"><span className="font-semibold md:mr-3 max-sm:text-base">Github:</span> <a href={member.github} target="_blank" className="text-gray-400 md:text-base text-sm">Click me</a></p>
              <p className="font-semibold md:text-xl "><span className="font-semibold md:mr-3 max-sm:text-base">Linkdin:</span><a href={member.linkdin} className="text-gray-400 md:text-base text-sm" target="_blank">Click me</a></p>
              {member.Twitter && <p className="font-semibold md:text-xl max-sm:text-base">Twitter: <a href={member.Twitter} className="text-gray-400 ml-2 md:text-base text-sm" target="_blank">Click me</a></p>}
          </div>
          </li>
        ))}
      </ul>
    </div>
  </section>;
};

export default AboutPage;
