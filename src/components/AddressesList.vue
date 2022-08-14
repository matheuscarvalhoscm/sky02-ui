<template>
  <section>
    <table>
      <tr>
        <th>Logradouro</th>
        <th>Bairro</th>
        <th>Cidade</th>
        <th>Estado</th>
      </tr>
      <tr v-for="address in addressesList" :key="address.cep">
        <template v-if="editingCep === address.cep">
          <td><input type="text" v-model="editing.street"/></td>
          <td><input type="text" v-model="editing.district"/></td>
          <td><input type="text" v-model="editing.city"/></td>
          <td><input type="text" v-model="editing.state"/></td>

          <button @click="handleUpdate(editingCep)">Salvar</button>
          <button @click="editingCep = ''">Cancelar</button>
        </template>
        <template v-else>
          <td>{{ address.cep }}</td>
          <td>{{ address.street }}</td>
          <td>{{ address.district }}</td>
          <td>{{ address.city }}</td>
          <td>{{ address.state }}</td>
          <button @click="handleUpdating(address.cep)">Editar</button>
          <button @click="handleDelete(address.cep)">Deletar</button>
        </template>
      </tr>
    </table>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import IAddress from '../interfaces/IAddress';
import * as api from '../services/api';

const list: IAddress[] = [];

export default defineComponent({
  name: 'AddressesList',
  data() {
    return {
      addressesList: list,
      editingCep: '',
      editing: {
        street: '',
        district: '',
        city: '',
        state: '',
      }
    }
  },
  methods: {
    handleUpdating(cep: string) {
      this.editingCep = cep;
      const update = this.addressesList.filter((address: IAddress) => address.cep === cep)[0];
      this.editing.street = update.street;
      this.editing.district = update.district;
      this.editing.city = update.city;
      this.editing.state = update.state;
    },
    async handleUpdate(cep: string) {
      const updatedAddress = {
        cep: this.editingCep,
        ...this.editing
      }

      await api.updateAddress(cep, updatedAddress);
      this.editingCep = '';
    },
    async handleDelete(cep: string) {
      await api.deleteAddress(cep);
    },
  },
  async mounted() {
    this.addressesList = await api.fetchAddresses();
  },
  async updated() {
    this.addressesList = await api.fetchAddresses();
  }
})
</script>
