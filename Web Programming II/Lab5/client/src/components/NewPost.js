import './App.css';
import queries from '../queries';
import React from 'react';
import { useMutation } from '@apollo/client';

function NewPost() {
  const [addImage] = useMutation(queries.UPLOAD_IMAGE)
  let url;
  let description;
  let posterName;
  return (
    <form
        className="form"
        id="add-Image"
        onSubmit={(e) => {
          e.preventDefault();
          addImage({
            variables: {
              url: url.value,
              description: description.value,
              posterName: posterName.value
            }
          });
          url.value = '';
          description.value = '';
          posterName.value = '';
          alert('Image Added');
        }}
      >
    

        <div className="form-group">
          <label>
            Description:
            <br />
            <input
              ref={(node) => {
                description = node;
              }}
              required
            />
          </label>
        </div>
        <br />

        <div className="form-group">
          <label>
            Url:
            <br />
            <input
              ref={(node) => {
                url = node;
              }}
              required
              autoFocus={true}
            />
          </label>
        </div>

        <br />

        <div className="form-group">
          <label>
            Poster Name:
            <br />
            <input
              ref={(node) => {
                posterName = node;
              }}
              required
            />
          </label>
        </div>
        <br />

        <br />
        <br />
        <button className="button add-button" type="submit">
          Add Image
        </button>
      </form>
  );
}

export default NewPost;