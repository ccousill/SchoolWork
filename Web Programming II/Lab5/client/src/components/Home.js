import { NavLink} from 'react-router-dom';
import './App.css';
import React, { useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import queries from '../queries';


function Home() {
  const [pagenum, incPageNum] = useState(1);
  const [binImage] = useMutation(queries.UPDATE_IMAGE, {
     onError: (e) => {
        console.log(e.message);
  }})

  const [deleteImage] = useMutation(queries.DELETE_IMAGE, {
     onError: (e) => {
        console.log(e.message);
  }})
  let data = null;
  let binButton = null
  let getMore = null
  let deleteButton = null
  let postButton =null
  let uBool = true
  let binBool = true
  let userBool = true
  
  if(window.location.pathname === '/'){
    uBool = false
  }
  else if(window.location.pathname === '/my-bin'){
    binBool = false
  }
  else if(window.location.pathname === '/my-posts'){
    userBool = false
  }

    const unsplashed = useQuery(queries.GET_IMAGEPOST, {
     onError: (err) => {
        alert(err.message);
    },
    variables : {
      pagenum : 1
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip : uBool
  });

  const binned = useQuery(queries.GET_BINNEDIMAGEPOST, {
     onError: (err) => {
        alert(err.message);
     },
    fetchPolicy: 'cache-and-network',
    skip : binBool
  });

  const userposted = useQuery(queries.GET_USERIMAGEPOST, {
     onError: (err) => {
        alert(err.message);
      },
    fetchPolicy: 'cache-and-network',
    skip : userBool
  });

  

  function setButton(image){
    //unbin button
    if(image.binned){
      return(
        <button
                  className="button"
                  onClick={() => {
                  
                    binImage({
                      variables:{
                        id : image.id,
                        url : image.url,
                        description : image.description,
                        posterName : image.posterName,
                        userPosted : image.userPosted,
                        binned : false
                      }
                    })
                     alert("image unbinned")
                  }}
                >
                  Remove from Bin
                </button>
        )
    }else{
      //unbin button
      return(
        <button
                  className="button"
                  onClick={() => {
                    
                    binImage({
                      variables:{
                        id : image.id,
                        url : image.url,
                        description : image.description,
                        posterName : image.posterName,
                        userPosted : image.userPosted,
                        binned : true
                      }
                    })
                     alert("image binned")
                  }}
                >
                  Add to Bin
                </button>
        )
    }
  }

  function setDeleteButton(image){
      return(
        <button
                  className="button"
                  onClick={() =>  {
                      deleteImage({
                        variables:{
                          id : image.id
                        }
                      })
                    window.location.reload();
                     alert("image deleted")
                  }}
                >
                  Delete Image
                </button>
        )
  }
 if (unsplashed.data || binned.data || userposted.data) {
  
  if(window.location.pathname === '/'){
    const { unsplashImages } = unsplashed.data;
    data = unsplashImages
    console.log(data)
    getMore = <button
                  className="button"
                  onClick={() =>  {
                      unsplashed.fetchMore({
                        variables:{
                          pagenum : pagenum +1
                        }
                      })
                       incPageNum(pagenum +1);
                  }}
                >
                  Get more
                </button>

      
  }

  else if(window.location.pathname === '/my-bin'){
    const { binnedImages } = binned.data;
    data = binnedImages
  }

  
  else if(window.location.pathname === '/my-posts'){
    const { userPostedImages } = userposted.data;
    data = userPostedImages
    postButton = <NavLink className="postlink" to="/new-post">
                New Post
              </NavLink>
  }

    try{
    return (

      <div>
      <br />
  
      {postButton}

        {data.map((image) => {
          binButton = setButton(image)
          
          if(window.location.pathname === '/my-posts'){
             deleteButton = setDeleteButton(image)
          }

          return (
            <div className="card" key={image.id}>
              <div className="card-body">
                <h2 className="card-title">
                  {image.description}
                </h2>
                  Image by: {image.posterName}
                <br />
                <img className="image" src={image.url} alt="" width="300" height="300"></img>
                <br />
                {binButton}
                <br />
                {deleteButton}
              </div>
            </div>
          );
        })}
        {getMore}
        </div>
        );
  }catch(e){
    return <div> {e} </div>
  }

  }

   else if (unsplashed.loading || binned.loading || userposted.loading) {
    return <div>Loading</div>;
  } else if (unsplashed.error || binned.error || userposted.error) {
    return <div>{unsplashed.error.message}</div>;
  }
}

export default Home;
