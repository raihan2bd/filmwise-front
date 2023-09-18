const Spinner = () => {
  return (
    <div className="w-full h-full bg-transparent flex justify-center item-center">
      <p className="w-[100px] h-[100px] max-w-[100%] max-h-[100%]">
        <svg className="animate-spin h-full w-full text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      </p>
    </div>
  
  )
}

export default Spinner