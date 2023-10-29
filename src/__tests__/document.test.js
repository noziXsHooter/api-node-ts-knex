const axios = require('axios');

const cpf = 'cpf';
const cnpj = 'cnpj';

const usedVar = cnpj;

async function makeRequest() {
  try {
    let generateResponse = await axios.get(`http://localhost:3000/generate-${usedVar}`);
    //generateResponse.data.message = '73274834732'
    const validateResponse = await axios.get(`http://localhost:3000/validate-${usedVar}/${generateResponse.data.message}`);

    console.log('Resposta:', validateResponse.data.status);
    return validateResponse.data.status;
  } catch (error) {
    console.error('Erro:', false);
    return false;
  }
}

async function sendRequestsEverySecond() {

  for (let index = 0; index < 50; index++) {
    const result = await makeRequest();

    if(result == false){
      console.log('PAROU!!!');
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Aguarda 1 segundo
  }

}

sendRequestsEverySecond();
