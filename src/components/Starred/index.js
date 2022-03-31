import React from 'react';

// import { Container } from './styles';

function Starred(props) {
  return (
    <div>
    {props.starredList.map((repos, repoPosition) => {
      return (
        <div className='repos'>
          <h2>{repoPosition + 1}</h2>
          <div>
            <h3>{repos.name}</h3>
            <h3>{repos.language}</h3>
            <a href={repos.html_url}>{repos.html_url}</a>
          </div>
        </div>
      )
    })}
  </div>
  );
}

export default Starred;