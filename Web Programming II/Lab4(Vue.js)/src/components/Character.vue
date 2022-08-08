<template>
  <div v-if="character && character.id > 0">
   <!--  <i v-on:click="log(character)"> log </i> -->
    <h1>{{this.character.name}}</h1>
    <br />
    <img alt = "character" :src="character.thumbnail.path + '.' + character.thumbnail.extension" width = 200 length = 200/>
    <br />
    <span v-html="this.character.description"></span>
    <br />

    <h2 v-if="character.stories.items && character.stories.items.length">Comics:</h2>
    <ul>
      <li v-for="comic in this.character.stories.items" :key="comic.name">{{comic.name}}</li>
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
  name: "Character",
  data() {
    return {
      id: this.$route.params.id,
      character: { name: null, thumbnail :{path: null, extension : null}, stories: {items: null}}
    };

  },

  methods: {
    getCharacter(id) {
      baseUrl = 'https://gateway.marvel.com:443/v1/public/characters?id='+(id.toString())
      url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash
      axios
        .get(url)
        .then(({ data }) => (this.character = data.data.results[0]));
    },
    log(data){
      console.log(data)
    }
  },
  created() {
      this.getCharacter(this.$route.params.id);
  },
  watch: {
    $route() {
      this.getCharacter(this.$route.params.id);
    }
  }
};
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
span {
  text-align: center;
  max-width: 50%;
}
div {
  max-width: 50%;
  margin: 0 auto;
}
</style>