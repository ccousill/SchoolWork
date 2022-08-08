const { ApolloServer, gql } = require('apollo-server');
const uuid = require('uuid');//for generating _id's
const key = "00GHfVwuSTSTNpoiohpYwaa8p_Io2XXDbXNXFp5XDtI"
const axios = require("axios");

const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//Create the type definitions for the query and our data
const typeDefs = gql`
  type Query {
    unsplashImages(pagenum:Int) : [ImagePost]
    binnedImages : [ImagePost]
    userPostedImages : [ImagePost]
  }

  type ImagePost {
    id: ID!
    url: String!
    posterName: String!
    description: String
    userPosted: Boolean!
    binned: Boolean!
  }

  type Mutation {
    uploadImage(
      url: String!
      description: String
      posterName: String
    ): ImagePost

    updateImage(
      id: ID!
      url: String
      posterName: String
      description: String 
      userPosted: Boolean 
      binned: Boolean
    ): ImagePost

    deleteImage(id: ID!): ImagePost
  }
`;

/* parentValue - References the type def that called it
    so for example when we execute numOfEmployees we can reference
    the parent's properties with the parentValue Paramater
*/

/* args - Used for passing any arguments in from the client
    for example, when we call 
    addEmployee(firstName: String!, lastName: String!, employerId: Int!): Employee
		
*/

const resolvers = {
  Query: {
    unsplashImages: async (_, args) => {
      console.log("pagenum:")
      console.log(args.pagenum.toString())
      let x = []
      let image = {}
      const url = `https://api.unsplash.com/photos?page=${args.pagenum.toString()}&client_id=${key}`
      const allImages = await axios.get(url)
      for(let i = 0; i < allImages.data.length; i++){
        const cachedImage = await client.hgetAsync('images', "image" + allImages.data[i].id);
        if(cachedImage === null){
          image = {
            id: allImages.data[i].id,
            url: allImages.data[i].urls.full,
            posterName: allImages.data[i].user.username,
            description: allImages.data[i].description,
            userPosted: false,
            binned: false
          }
          console.log("not cached image")
          console.log(image)
        }else{
          console.log("in the else")
          image = JSON.parse(cachedImage)
          console.log("cached image")
          console.log(image)
        }
        
      x.push(image)
     }
      return x
    },

    binnedImages: async (_, args) => {

      let cachedImageList = await client.hgetallAsync('images');
      let x = []
  
      if(cachedImageList === null){
        return x
      }
      for(let [k,v] of Object.entries(cachedImageList)){
        let value = JSON.parse(v)
        if(value.binned === true){
            x.push(value)
        }

      }
      return x
    },

    userPostedImages: async (_, args) => {
      let cachedImageList = await client.hgetallAsync('images');
      let x = []
      if(cachedImageList === null){
        return x
      }
      for(let [k,v] of Object.entries(cachedImageList)){
        let value = JSON.parse(v)
        if(value.userPosted === true){
            x.push(value)
        }

      }

      return x
    }
  },

  Mutation: {
    uploadImage: async (_, args) => {
      const newImage = {
        id: uuid.v4(),
        url : args.url,
        description : args.description,
        posterName : args.posterName,
        userPosted : true,
        binned : false
      };

      cacheForImage = await client.hsetAsync('images', "image" + newImage.id, JSON.stringify(newImage));
      return newImage;
    },

    deleteImage: async (_, args) => {
      let cachedImage = await client.hgetAsync('images',"image" + args.id);
      await client.hdelAsync("images", "image" + args.id)
      return JSON.parse(cachedImage);
    },

    updateImage: async (_, args) => {
      let cachedImageString = await client.hgetAsync('images',"image" + args.id);
      let cachedImage = JSON.parse(cachedImageString)

      if(cachedImage === null){
          cachedImage = {
            id: args.id,
            url : args.url,
            description : args.description,
            posterName : args.posterName,
            userPosted : args.userPosted,
            binned : args.binned
        };

      }
     
        let cachedImageTemp = JSON.parse(JSON.stringify(cachedImage))
        if(args.url){
          cachedImage.url = args.url;
        }
        if( args.posterName ){
          cachedImage.posterName = args.posterName;
        }
        if( args.description ){
          cachedImage.description = args.description;
        }
        if(args.userPosted === false || args.userPosted === true){
          cachedImage.userPosted = args.userPosted;
        }
        if(args.binned === false || args.binned === true){
          cachedImage.binned = args.binned;
        }

      let updatedImageString = JSON.stringify(cachedImage)
      if(cachedImageTemp.binned === false && args.binned === true){
        await client.hsetAsync('images','image' + args.id,updatedImageString)
        return cachedImage
      }


      if(cachedImageTemp.binned === true && args.binned === false && cachedImage.userPosted == false){
        await client.hdelAsync('images','image' + args.id,updatedImageString)
        return cachedImage
      }

      await client.hsetAsync('images','image' + args.id,updatedImageString)
      return cachedImage

    },

  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});
