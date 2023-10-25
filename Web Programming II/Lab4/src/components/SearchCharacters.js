import React from 'react';

const SearchCharacters = (props) => {
	const handleChange = (e) => {
		props.searchValue(e.target.value);
	};
	return (
		<form
			method='POST'
			onSubmit={(e) => {
				e.preventDefault();
			}}
			name='formName'
			className='center'
		>
			<label>
				<input placeholder="Search Characters..." className="searchBar" autoComplete='off' type='text' name='searchTerm' onChange={handleChange} />
			</label>
		</form>
	);
};

export default SearchCharacters;