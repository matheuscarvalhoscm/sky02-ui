import IAddress from '../interfaces/IAddress';

export const fetchAddress = async (zipCode: string) => {
  const URL = `https://viacep.com.br/ws/${zipCode}/json/`;
  const data = await fetch(URL);
  const address = await data.json();
  
  return address;
};

export const saveAddress = async (address: IAddress): Promise<void> => {
  const URL = 'http://localhost:3001/address';
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
  const URL = 'http://localhost:3001/address';
  const data = await fetch(URL);
  const addresses = data.json();

  return addresses;
};
