
export class DocumentUtils {

/*     document:string

    constructor(document:string){
        this.document = document;
    } */

     validateCpf = (cpf:string):string|false|true => {

        cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
      
        if (cpf.length !== 11) {
          return false;
        }
      
        // Verificação de CPFs inválidos conhecidos
        if (
          cpf === '00000000000' ||
          cpf === '11111111111' ||
          cpf === '22222222222' ||
          cpf === '33333333333' ||
          cpf === '44444444444' ||
          cpf === '55555555555' ||
          cpf === '66666666666' ||
          cpf === '77777777777' ||
          cpf === '88888888888' ||
          cpf === '99999999999'
        ) {
          return false;
        }
      
        let sum = 0;
        let rest;
      
        for (let i = 1; i <= 9; i++) {
          sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
      
        rest = (sum * 10) % 11;
      
        if (rest === 10 || rest === 11) {
          rest = 0;
        }
      
        if (rest !== parseInt(cpf.substring(9, 10))) {
          return false;
        }
      
        sum = 0;
      
        for (let i = 1; i <= 10; i++) {
          sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
      
        rest = (sum * 10) % 11;
      
        if (rest === 10 || rest === 11) {
          rest = 0;
        }
      
        if (rest !== parseInt(cpf.substring(10, 11))) {
          return false;
        }
      
        return true;
      }

       generateCPF = async ():Promise<any> => {
        const n = 9; // Número de dígitos no CPF
        let digits = '';
        
        // Gere os primeiros 9 dígitos aleatórios
        for (let i = 0; i < n; i++) {
          digits += Math.floor(Math.random() * 10);
        }
        
        // Calcule o primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < n; i++) {
          sum += parseInt(digits.charAt(i)) * (n + 1 - i);
        }
        let remainder = 11 - (sum % 11);
        let firstDigit = (remainder >= 10) ? 0 : remainder;
        
        // Adicione o primeiro dígito verificador aos dígitos
        digits += firstDigit;
        
        // Calcule o segundo dígito verificador
        sum = 0;
        for (let i = 0; i < n + 1; i++) {
          sum += parseInt(digits.charAt(i)) * (n + 2 - i);
        }
        remainder = 11 - (sum % 11);
        let secondDigit = (remainder >= 10) ? 0 : remainder;
        
        // Adicione o segundo dígito verificador aos dígitos
        digits += secondDigit;
        
        return digits.slice(0, 3) + '.' + digits.slice(3, 6) + '.' + digits.slice(6, 9) + '-' + digits.slice(9);
      }
      
      validateCNPJ = (cnpj:string):string|false|true =>{
        // Remove caracteres não numéricos
        cnpj = cnpj.replace(/\D/g, '');
      
        // Verifica se o CNPJ tem 14 dígitos
        if (cnpj.length !== 14) {
          console.log('diferente 14');
          return false;
        }
      
        // Verifica se todos os dígitos são iguais (caso contrário, será considerado válido)
        const isAllDigitsEqual = /^(\d)\1*$/.test(cnpj);
        if (isAllDigitsEqual) {
          console.log('digitos iguais');
          return false;
        }
      
        // Calcula o primeiro dígito verificador
        let sum = 0;
        let factor = 5;
        for (let i = 0; i < 12; i++) {
          sum += parseInt(cnpj.charAt(i)) * factor;
          factor = factor === 2 ? 9 : factor - 1;
        }
        const firstVerifierDigit = 11 - (sum % 11);

        // Calcula o segundo dígito verificador
        sum = 0;
        factor = 6;
        for (let i = 0; i < 13; i++) {
          sum += parseInt(cnpj.charAt(i)) * factor;
          factor = factor === 2 ? 9 : factor - 1;
        }
        const secondVerifierDigit = 11 - (sum % 11);

        // Verifica os dígitos verificadores
        if (
          parseInt(cnpj.charAt(12)) !== firstVerifierDigit &&
          parseInt(cnpj.charAt(13)) !== secondVerifierDigit
        ) {
          return false;
        }
      
        return true;
      } 

      generateCNPJ = async ():Promise<any> =>  {
        // Gere 12 dígitos aleatórios (números de 0 a 9)
        const randomDigits = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));
        
        // Crie os primeiros dois dígitos verificadores
        const firstVerifierDigit = this.calculateCnpjVerifierDigit(randomDigits, 5);
        const secondVerifierDigit = this.calculateCnpjVerifierDigit(randomDigits.concat(firstVerifierDigit), 6);
        
        // Formate o CNPJ
        const formattedCNPJ = randomDigits.join('') + firstVerifierDigit + secondVerifierDigit;
        
        return formattedCNPJ;
      }
      
      calculateCnpjVerifierDigit(digits:number[], multiplier:number) {
        let sum = 0;
        for (let i = 0; i < digits.length; i++) {
          sum += digits[i] * multiplier;
          multiplier--;
          if (multiplier < 2) {
            multiplier = 9;
          }
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
      }
      
}