<template>
  <FormsComponent />
  <AddressesList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormsComponent from './components/FormsComponent.vue';
import AddressesList from './components/AddressesList.vue';

export default defineComponent({
  name: 'App',
  components: {
    FormsComponent,
    AddressesList,
}
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
