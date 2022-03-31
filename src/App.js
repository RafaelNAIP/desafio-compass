import { useEffect, useState } from 'react';
import api from './api';
import './App.css';
import Repos from './components/Repos';
import Starred from './components/Starred';
import glass from './images/glass.png';
function App() {
  const [filterInfo, setFilterInfo] = useState('')
  const [userInfos, setUserInfo] = useState({})
  const [repoList, setRepoList] = useState([])
  const [starredList, setStarredList] = useState([])

  const handleFilter = async () => {
    const user = await api.get(`users/${filterInfo}`)
    console.log(user.data)
    setUserInfo(user.data)
  }

  const handleRepo = async () => {
    if(filterInfo){
      const userRepo = await api.get(`users/${filterInfo}/repos`)
      setRepoList(userRepo.data)
      setStarredList([])
      return
    }
    return alert('Ache um usuário')
  }

  const handleStarred = async () => {
    if(filterInfo){
      const userStarred = await api.get(`users/${filterInfo}/starred`)
      console.log(userStarred.data)
      setStarredList(userStarred.data)
      setRepoList([])
      return
    }
    return alert('Ache um usuário')
  }

  return (
    <div className="app">
      <div className="header">
        <input className='filter' onChange={(e) => setFilterInfo(e.target.value)} />
        <button className='search-button' onClick={handleFilter}>
          <img src={glass} className='glass-image' />
        </button>
      </div>
        <div className='user-infos'>
          <h2>Name: {userInfos?.name}</h2>
          <h4>Bio: {userInfos?.bio}</h4>
          <div className='follows-part'>
            <h5>Following: {userInfos?.following}</h5>
            <h5 style={{ marginLeft: 10 }}>Followers: {userInfos?.followers}</h5>
          </div>
          <h4>Public repos: {userInfos.public_repos}</h4>
        </div>
        <div className='button-repos-stared-container'>
          <button className='buttons-repos-stared' onClick={handleRepo}>Repos</button>
          <button className='buttons-repos-stared' onClick={handleStarred}>Starred</button>
        </div>
        {repoList.length > 0 && (
          <Repos repoList={repoList} />
        )}
        {starredList.length > 0 && (
          <Starred starredList={starredList} />
        )}
    </div>
  );
}

export default App;
