const Footer = () => {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <footer className="p-6 text-center">
        <p>&copy; {year} FilmWise, Inc. All Rights Reserved.</p>
      </footer>
  )
}

export default Footer