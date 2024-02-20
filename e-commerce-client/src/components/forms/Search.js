import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="search"
        value={text}
        className="form-control me-2"
        placeholder="Search"
      />
      <div className="colorsearch p-2 d-flex flex-column justify-content-center">
        <AiOutlineSearch
          onClick={handleSubmit}
          style={{ cursor: "pointer" }}
          size={20}
          className="search"
        />
      </div>
    </form>
  );
};

export default Search;
