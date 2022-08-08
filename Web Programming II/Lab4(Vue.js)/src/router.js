import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import CharacterList from './components/CharacterList.vue';
import Character from './components/Character.vue';
import ComicList from './components/ComicList.vue';
import Comic from './components/Comic.vue';
import SeriesList from './components/SeriesList.vue';
import Series from './components/Series.vue';
import ErrorPage from './components/ErrorPage.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/characters/page/:page',
      name: 'characterList',
      component: CharacterList
    },
    {
      path: '/characters/:id',
      name: 'character',
      component: Character
    },
    {
      path: '/comics/page/:page',
      name: 'comicList',
      component: ComicList
    },
    {
      path: '/comics/:id',
      name: 'comic',
      component: Comic
    },
    {
      path: '/series/page/:page',
      name: 'seriesList',
      component: SeriesList
    },
    {
      path: '/series/:id',
      name: 'series',
      component: Series
    },
    {
      path: '*',
      name: 'notFound',
      component: ErrorPage
    }
  ]
});
