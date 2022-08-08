const addTrainer = (team) =>({
	type: 'CREATE_TRAINER',
	payload:{
		team : team
	}
});

const deleteTrainer = (id)=>({
	type: 'DELETE_TRAINER',
	payload:{
		id:id
	}
})
const selectTrainer = (id)=>({
	type: 'SELECT_TRAINER',
	payload:{
		id:id
	}
})
const deselectTrainer = (id)=>({
	type: 'DESELECT_TRAINER',
	payload:{
		id:id
	}
})

const catchPokemon = (name, id) => ({
	type : 'CATCH_POKEMON',
	payload :{
		name : name,
		id : id
	}
})

const releasePokemon = (pokemon) => ({
	type: 'RELEASE_POKEMON',
	payload :{
		pokemon : pokemon
	}
})
module.exports = {
	addTrainer,
	deleteTrainer,
	selectTrainer,
	deselectTrainer,
	catchPokemon,
	releasePokemon
}