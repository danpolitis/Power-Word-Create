import React, { useState, useContext, useEffect } from 'react';
import { PageContext } from './PageContext.jsx';

const LandingPage = (props) => {
  const { page, setPage } = useContext(PageContext);
  const [currentPage, setCurrentPage] = useState(page);

  const changePage = () => {
    setCurrentPage(1)
  }

  useEffect(() => {
    setPage(currentPage)
  }, [currentPage])

  return (
    <div>
      <div>
        <h1>Welcome to Power Word Create!</h1>
        <h2>Click the create character button to begin.</h2>
        <button onClick={changePage}>Create Character</button>
      </div>
    </div>
  )
}

export default LandingPage