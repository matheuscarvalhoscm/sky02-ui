<template>
  <div>
    <img src="../assets/sk-logo-transparent-white.png" alt="SKY02 Logo"/>
    <form>
      <label for="zipcode-input">Pesquisar por CEP</label>
      <input
        type="text"
        name="zipCode"
        id="zipcode-input"
        placeholder="11010010"
        v-model="zipCode"
        @change="handleZipCodeSearch"
      />
      <label for="street-input">Rua</label>
      <input type="text" name="street" id="street-input" v-model="street" />
      <label for="district-input">Bairro</label>
      <input type="text" name="district" id="district-input" v-model="district" />
      <label for="city-input">Cidade</label>
      <input type="text" name="city" id="city-input" v-model="city" />
      <label for="state-input">Estado</label>
      <input type="text" name="state" id="state-input" v-model="state" />
  
      <button type="submit" @click="handleSaveAddress">Salvar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as api from '../services/api';

export default defineComponent({
  name: 'FormsComponent',
  data() {
    return {
      zipCode: '',
      street: '',
      district: '',
      city: '',
      state: '',
    };
  },
  methods: {
    async handleZipCodeSearch(): Promise<void> {
      const address = await api.fetchAddress(this.zipCode);
      const { logradouro, bairro, localidade, uf } = address;
      this.street = logradouro;
      this.district = bairro;
      this.city = localidade;
      this.state = uf;
    },
    async handleSaveAddress(event: Event): Promise<void> {
      event.preventDefault();
      const form = {
        cep: this.zipCode,
        street: this.street,
        district: this.district,
        city: this.city,
        state: this.state
      }
      
      await api.saveAddress(form);
    }
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;700&display=swap');

div {
  background-color: #5e685e;
  border-radius: 1em;
  padding: 1em;
}

img {
  width: 14em;
}

form {
  color: #fff;
  font-family: 'Manrope', sans-serif;
  padding: 0.7em;
}

form label {
  padding: 1em;
}

form input {
  border-radius: 5px;
  padding: 0.2rem;
}

form input:focus {
  border: 3px solid #959e95;
  outline: none;
}

form button {
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #fff;
  color: #5e685e;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  margin: 0 1em;
  padding: 0.2em 1em;
  transition: 0.5s;
}

form button:hover {
  background-color: #5e685e;
  color: #fff;
  cursor: pointer;
}

</style>
