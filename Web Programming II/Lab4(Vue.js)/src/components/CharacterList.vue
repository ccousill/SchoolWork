<template>
  <div v-if= "characters.count !== 0 && page >= 0">

    <h1> List of Characters </h1>
    <nav>

    <router-link v-if = "page != 0" :to="'/characters/page/' + (parseInt(page) - 1).toString()"> Prev </router-link>
    <router-link v-if = "parseInt(page) + 1 <= Math.floor(characters.total/characters.limit)" :to="'/characters/page/' + (parseInt(page) + 1).toString()"> Next </router-link>

    </nav>


    <ul>
      <li v-for="(character,index) in characters.results" :key="index">
        <router-link :to="{name: 'character', params: {id: character.id}}">
          <img alt = "Character" :src = "character.thumbnail.path + '.' + character.thumbnail.extension" width ="175" height = "175"/>
          <br />
         {{character.name}} 
         
         

      </router-link>

      </li>
    </ul>

  </div>
  <p v-else> Error 404 </p>
</template>

<script>
import axios from "axios";
const md5 = require('blueimp-md5');
const publickey = '064af32e99a8f1a057b985bd73eac44f';
const privatekey = '68316e2e638896c37d0e725ee3daf8044d8d58a5';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
let baseUrl = null;
let url = null;

export default {
  name: "CharacterList",
  data() {
    return {
      characters: {},
      page: this.$route.params.page
    };
  },

  methods:{
      getCharacterList(page){
        baseUrl = 'https://gateway.marvel.com:443/v1/public/characters?offset='+(parseInt(page) * 20).toString(),
        url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash
        axios
          .get(url)
          .then(({ data }) => (this.characters = data.data));
          },
      log(data){
        console.log(data)
      }
  },
  created() {
      this.getCharacterList(this.$route.params.page)

  },  
  watch:{
    $route(){
      this.getCharacterList(this.$route.params.page)
      this.page = this.$route.params.page
    }
  }
  
};

</script>
<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  padding: 20px;
  font-size: 1.3em;
  background-color: #e0edf4;
  border-left: 5px solid #3eb3f6;
  margin-bottom: 2px;
  color: #3e5252;
}

p {
  text-align: center;
  padding: 30px 0;
  color: gray;
}
</style>