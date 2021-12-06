import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./Component/UserCard";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [query, setQuery] = useState("masai");
  const [text, setText] = useState("");

  const getUsers = ({ query, page }) => {
    const config = {
      url: `https://api.github.com/search/users?q=${query}&page=${page}`,
      method: "get"
    };
    return axios(config);
  };

  useEffect(() => {
    getUsers({
      query,
      page
    })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        if (res.data.total_count) {
          const totalPage = Math.ceil(res.data.total_count / 30);
          setTotalPage(totalPage);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, query]);

  const Pagination = ({ totalPage, onClickCallback, currentPage }) => {
    console.log(`total page ${totalPage}`);
    const pages = new Array(totalPage).fill(0).map((_, i) =>
      i + 1 === currentPage ? (
        <button key={i} disabled>
          {i + 1}
        </button>
      ) : (
        <button key={i} onClick={() => onClickCallback(i + 1)}>
          {i + 1}
        </button>
      )
    );
    return <div className={"pageBtn"}>{pages}</div>;
  };

  const handlePageChange = (value) => {
    setPage(value);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    setQuery(text);
  };

  return (
    <div className="App">
      <div className="Nav">
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="logo"
        />
        <input placeholder="...enter username" onChange={handleChange} />
        <button onClick={handleSubmit}>Search</button>
      </div>
      {isLoading ? (
        <h3>Loading ...</h3>
      ) : (
        <>
          {data?.items?.map((user) => (
            <UserCard
              id={user.login}
              key={user.id}
              name={user.login}
              url={user.url}
              avatar={user.avatar_url}
            />
          ))}
        </>
      )}
      <Pagination
        onClickCallback={handlePageChange}
        totalPage={totalPage}
        currentPage={page}
      />
    </div>
  );
}
