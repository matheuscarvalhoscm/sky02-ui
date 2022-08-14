<template>
  <table>
    <tr>
      <th>CEP</th>
      <th>Logradouro</th>
      <th>Bairro</th>
      <th>Cidade</th>
      <th>Estado</th>
    </tr>
    <tr v-for="address in addressesList" :key="address.cep">
      <template v-if="editingCep === address.cep">
        <td>{{ editingCep }}</td>
        <td><input type="text" v-model="editing.street"/></td>
        <td><input type="text" v-model="editing.district"/></td>
        <td><input type="text" v-model="editing.city"/></td>
        <td><input type="text" v-model="editing.state"/></td>

        <button class="save-button" @click="handleUpdate(editingCep)">Salvar</button>
        <button class="delete-button" @click="editingCep = ''">Cancelar</button>
      </template>
      <template v-else>
        <td>{{ serializeCep(address) }}</td>
        <td>{{ address.street }}</td>
        <td>{{ address.district }}</td>
        <td>{{ address.city }}</td>
        <td>{{ address.state }}</td>
        <td>
          <button class="edit-button" @click="handleUpdating(address.cep)">Editar</button>
          <button class="delete-button" @click="handleDelete(address.cep)">Deletar</button>
        </td>
      </template>
    </tr>
  </table>
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
    serializeCep(address: IAddress): string {
    const { cep } = address;
    return `${cep.substring(0, 2)}.${cep.substring(2, 5)}-${cep.substring(5, 8)}`
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;700&display=swap');

table {
  border-radius: 10px;
  box-shadow: 0 0 6px rgb(199, 199, 199);
  font-family: 'Manrope', sans-serif;
  margin: 1em 0;
  padding: 2em;
  text-align: center;
  width: 100%;
}

button {
  border-radius: 5px;
  border: 1px solid;
  cursor: pointer;
  color: #fff;
  font-weight: 700;
  margin: 0.5em;
  padding: 0.5em;
  transition: 0.5s;
  width: 10em;
}

.edit-button {
  background-color: #ffcc00;
}

.edit-button:hover {
  color:#ffcc00;
  background-color: #fff;
}

.delete-button {
  background-color: #cc3300;
}

.delete-button:hover {
  color: #cc3300;
  background-color: #fff;
}

.save-button {
  background-color: #339900;
}

.save-button:hover {
  color: #339900;
  background-color: #fff;
}

</style>
