import React, { useEffect, useState } from "react";
import './Search.css';
import {useLocation, useNavigate} from 'react-router-dom';
const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const searchHandler =(event) => {
        event.preventDefault();
        navigate(`/search/${keyword}`)
    }

    const clearKeyword = () => {
        setKeyword("")
    }

    useEffect(()=>{
        if(location.pathname === '/'){
            clearKeyword();
        }
    },[location])

    return (
        <div className="col-12 col-md-6 mt-2 mt-md-0">
            <form onSubmit={searchHandler}>
                <div className="input-group">
                    <input
                        type="text"
                        id="search_field"
                        className="form-control"
                        placeholder="Enter Product Name ..."
                        onChange={(event)=>{setKeyword(event.target.value)}}
                        value={keyword}
                    />
                    <div className="input-group-append">
                        <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Search;