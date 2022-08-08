import '../App.css';
import {useState} from 'react'
import {useSelector} from 'react-redux'
import AddTrainer from './AddTrainer'
import Trainer from './Trainer'

const Trainers = () => {
	const [addTrainerToggle, setTrainerToggle] = useState(false)
	const allTrainers = useSelector((state) => state.trainers)
	
	console.log('ALLTRAINERS',allTrainers)
	return (
		<div>
		<h1> Trainer page </h1>
		<button className="simple-button" onClick={() => setTrainerToggle(!addTrainerToggle)}> Add Trainer </button>
		<br/>
		<br/>
		{addTrainerToggle && <AddTrainer />}
		<br/>
		{allTrainers.map((trainer) =>{
			console.log(trainer)
			return <Trainer key={trainer.id} trainer={trainer} />
		})}
		</div>
		
	);
};

export default Trainers;
