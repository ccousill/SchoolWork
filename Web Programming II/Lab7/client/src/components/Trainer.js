import { useDispatch } from 'react-redux';
import actions from '../actions';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import '../App.css';
function Trainer(props) {
  const dispatch = useDispatch();
  const allTrainers = useSelector((state) => state.trainers)
  const deleteTrainer = () => {
    dispatch(actions.deleteTrainer(props.trainer.id));
  };
let bool = true
let isSelected = null
let deleteButton = null
  const completeTrainerToggle = (compFlag) => {
    console.log(bool)
    if (compFlag === 'sel') {
      for(let i = 0; i < allTrainers.length; i++){
        if(allTrainers[i].selected === true){
          bool = false
        }
      }

     if(bool){
        dispatch(actions.selectTrainer(props.trainer.id));
      }else{
        window.alert("Cannot Select more than two trainers")
      }
    }
    if (compFlag === 'desel') dispatch(actions.deselectTrainer(props.trainer.id));
  };

const array = props.trainer.pokemon.map((pokemon) =>
<Link to={`/pokemon/${pokemon.id}`}><ul><li key={pokemon.id}> {pokemon.name} </li> </ul> </Link>)


for(let i = 0; i < allTrainers.length; i++){
  if(allTrainers[i].selected === true)
      bool = false
      break;
}

if(props.trainer.selected){
  isSelected = <tr>
    <td className = "selected">Currently Selected!</td>
  </tr>
  deleteButton = null
}else{
  isSelected = null
  deleteButton = <td>
              <button className="button-19" onClick={deleteTrainer}>Delete Trainer</button>
            </td>
}
  return (
    <div className="trainer-wrapper">
      <table>
        <tbody>
        {isSelected}
          <tr>
            <td>Trainer:</td>
            <td>{props.trainer.team}</td>
          </tr>
          <tr>
            <td> Pokemon: </td>
             <td> {array} </td>
          </tr>
          <tr>
            {deleteButton}
            <td>
              {!props.trainer.selected && (
                <button className="button-19" onClick={() => completeTrainerToggle('sel')}>
                  Select
                </button>
              )}
              {props.trainer.selected && (
                <button className="button-19" onClick={() => completeTrainerToggle('desel')}>
                  DeSelect
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Trainer;