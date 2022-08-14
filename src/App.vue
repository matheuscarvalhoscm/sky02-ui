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
