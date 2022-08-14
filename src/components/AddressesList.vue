<template>
  <section>
    <table>
      <tr>
        <th>Logradouro</th>
        <th>Bairro</th>
        <th>Cidade</th>
        <th>Estado</th>
      </tr>
      <tr v-for="address in addressesList" :key="address['cep']">
        <td>{{ address['cep'] }}</td>
        <td>{{ address['street'] }}</td>
        <td>{{ address['district'] }}</td>
        <td>{{ address['city'] }}</td>
        <td>{{ address['state'] }}</td>
      </tr>
    </table>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import * as api from '../services/api';

export default defineComponent({
  name: 'AddressesList',
  data() {
    return {
      addressesList: [],
    }
  },
  async mounted() {
    this.addressesList = await api.fetchAddresses();
  },
  async updated() {
    this.addressesList = await api.fetchAddresses();
  }
})
</script>
