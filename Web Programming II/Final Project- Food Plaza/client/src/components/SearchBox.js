import React, { useState } from "react";

function SearchBox() {
    const [search, setSearchText] = useState("");

    function handleSearchEdit(newSearch) {
        setSearchText(newSearch)
        return
    }

    return (
        <div className="buttonGroup searchBarr">
            <form action="/search" method="get">
                <label htmlFor="header-search">
                    <span hidden>Search Recipe:&nbsp;</span>
                </label>
                <input
                    value={search}
                    onChange={event => handleSearchEdit(event.target.value)}
                    type="text"
                    id="header-search"
                    placeholder="Search Recipes"
                    name="query"
                />
                &nbsp;
                <button type="submit">Search</button>
            </form>

        </div>
    );

}

export default SearchBox;
