import React ,{useState}from 'react';
import './App.css';

function App() {
  const[username,setUsername]=useState("");
  const[userData,setUserData]=useState(null);
  const[repositories,setRepositories]=useState(null);
  const handleSearch=async()=>{
    try{
      const userResponse=await fetch(
        `https://api.github.com/users/${username}`
      );
      const userData=await userResponse.json();        {/*await for looping */}
      setUserData(userData);
      const repositoriesResponse=await fetch(userData.repos_url);
      const repositoriesData=await repositoriesResponse.json();
      setRepositories(repositoriesData);
      console.log(repositoriesData);
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div>
      <center>
        <div className='App'>
          <h1>GITHUB PROFILE VIEWER</h1>
          <input type="text"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        placeholder="Enter a githhub username"/>
        <button onClick={handleSearch}>Search the username</button>
        </div>
        {userData &&(
          <div>
            <img src={userData.avatar_url} alt="profile"/>
            <h2>{userData.name}</h2>
            <p>{userData.bio}</p>
            <p>Followers:{userData.followers}</p>
            <p>Following:{userData.following}</p>
            <p>Public repositories:{userData.public_repos}</p>
          </div>
        )}
        {
          repositories&&(
            <div>
              <h2>repositories</h2>
              <ul>
                {
                  repositories.map((repo)=>(
                    <li key={repo.id}>
                      <a href={repo.html_url}
                      target="_blank"
                      rel="nopener
                      noreferrer">
                        {repo.name}
                      </a>
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }
    
      </center>
    </div>
  );
}

export default App;