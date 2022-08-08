import {v4 as uuid } from 'uuid'
const initialState = [{
	id : uuid(),
	team : "Ash Ketchum",
	selected : false,
	pokemon : []

}]

let copyState = null 
let index = 0

const trainerReducer = (state = initialState, action) => {
	const {type,payload} = action;

	switch(type){
		case 'CREATE_TRAINER':
			console.log('payload',payload)
			return [...state, {id : uuid() , team : payload.team, selected: false, pokemon : [] }]
		case 'DELETE_TRAINER':
			copyState = [...state]
			index = copyState.findIndex((x) => x.id === payload.id)
			copyState.splice(index,1)
			return [...copyState]
		case "SELECT_TRAINER":
			copyState = [...state]
			index = copyState.findIndex((x) => x.id === payload.id)
			copyState[index].selected = true
			return [...copyState]
		case "DESELECT_TRAINER":
			copyState = [...state]
			index = copyState.findIndex((x) => x.id === payload.id)
			copyState[index].selected = false
			return [...copyState]
		case "CATCH_POKEMON":
			copyState = [...state]
			index = copyState.findIndex((x) => x.selected === true)
			copyState[index].pokemon.push({name: payload.name, id : payload.id})
			return [...copyState]
		case "RELEASE_POKEMON":
			copyState = [...state]
			index = copyState.findIndex((x) => x.selected === true)
			const pos = copyState[index].pokemon.findIndex(x => x.name === payload.pokemon)
			if(pos > -1){
				copyState[index].pokemon.splice(pos, 1)
			}
			return [...copyState]

		default:
			return state;
	}
}

export default trainerReducer;