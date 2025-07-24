import React from 'react'
import Searchicon from '../../public/search.svg'

const Search = ({searchTerm ,setSearchTerm}) => {
  return (
    <div className='search'>
        <div>
      <img src={Searchicon} alt="Seach Icon" />
      <input type="text"
      placeholder='Search through thousands of movies'
       value ={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value) }
       />
     </div>
    </div>
  )
}

export default Search
