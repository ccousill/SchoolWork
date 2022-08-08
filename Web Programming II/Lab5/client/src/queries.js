import { gql } from '@apollo/client';


 const GET_IMAGEPOST = gql`
  query unspashImages($pagenum : Int){
    unsplashImages(pagenum : $pagenum){
    id
    url
    posterName
    description
    userPosted
    binned
    }
  }
`;

const GET_BINNEDIMAGEPOST = gql`
  query{
    binnedImages{
    id
    url
    posterName
    description
    userPosted
    binned
    }
  }
`;

const GET_USERIMAGEPOST = gql`
  query{
    userPostedImages{
    id
    url
    posterName
    description
    userPosted
    binned
    }
  }
`;

const UPLOAD_IMAGE = gql`
  mutation uploadImage($url: String!, $description: String, $posterName: String){
    uploadImage(url : $url, description : $description, posterName : $posterName){
      url
      description
      posterName

    }
  }`

const UPDATE_IMAGE = gql`
  mutation updateImage($id:ID!, $url: String, $description: String, $posterName: String, $userPosted:Boolean, $binned:Boolean){
      updateImage(id : $id, url : $url, description : $description, posterName : $posterName, userPosted : $userPosted, binned : $binned){
        id
        url
        posterName
        description
        userPosted
        binned
      }
      
  }`

const DELETE_IMAGE = gql`
  mutation deleteImage($id:ID!){
    deleteImage(id : $id){
      id
    }
  }`



let exported = {
  GET_IMAGEPOST,
  GET_BINNEDIMAGEPOST,
  GET_USERIMAGEPOST,
  UPLOAD_IMAGE,
  UPDATE_IMAGE,
  DELETE_IMAGE
};

export default exported;
