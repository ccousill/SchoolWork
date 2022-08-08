import { useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../actions';

function AddTrainer() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ team: ''});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addTrainer = () => {
    dispatch(actions.addTrainer(formData.team));
    document.getElementById('team').value = '';
  };
  console.log(formData);
  return (
    <div className="add">
      <div className="input-selection">
        <label>
          Trainer:
          <input
            onChange={(e) => handleChange(e)}
            id="team"
            name="team"
            placeholder="Trainer name..."
          />
        </label>
      </div>
      <button onClick={addTrainer}>Add Trainer</button>
    </div>
  );
}

export default AddTrainer;