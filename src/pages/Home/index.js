import { useState } from "react";
import { Header } from "../../components/Header/index";
import background from "../../assets/image.svg";
import ItemList from "../../components/ItemList";
import "./styles.css";

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const useData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await useData.json();

    if (newUser.name) {
      const { avatar_url, name, bio , login } = newUser;
      setCurrentUser({ avatar_url, name, bio ,login });

      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      );
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} alt="background app" className="background" />
        <div className="info">
          <div>
            <input
              type="text"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              name="usuario"
              placeholder="username"
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (
            <>
              <div className="perfil">
                <img
                  src={currentUser.avatar_url}
                  alt=""
                  className="profile"
                />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}
          <h3 className="repositorio">Repositórios</h3>
          {repos?.length ? (
          <div className="item-list">
              {repos.map(repo => (
                <ItemList title={repo.name} description={repo.description} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
