import IAddress from '../interfaces/IAddress';

const URL = `http://localhost:3001/address`;

export const fetchAddress = async (zipCode: string) => {
  const URL = `https://viacep.com.br/ws/${zipCode}/json/`;
  const data = await fetch(URL);
  const address = await data.json();
  
  return address;
};

export const saveAddress = async (address: IAddress): Promise<void> => {
  await fetch(URL, { 
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(address),
  });
};

export const fetchAddresses = async (): Promise<IAddress[]> => {
  const data = await fetch(URL);
  const addresses = data.json();

  return addresses;
};

export const updateAddress = async (cep: string, address: IAddress) => {
  await fetch(`${URL}/${cep}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(address),
  });
};

export const deleteAddress = async (cep: string): Promise<void> => {
  await fetch(`${URL}/${cep}`, { method: 'DELETE' });
};
