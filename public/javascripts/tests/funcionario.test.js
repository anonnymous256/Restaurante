//const Cliente = require('../class/cliente.js');

import Funcionario from '../class/funcionario.js';

class FuncionarioTest {
    constructor() {
        this.funcionario = new Funcionario();
    }

    async testAddFuncionario() {
        const cpf = "12345678901";
        const nome = "Idk";

        const result = await this.funcionario.addFuncionario(cpf, nome);

        expect(result).toBe(true);

    }

    async testGetFuncionario() {
        const cpf = "12345678901";
        
        const resultado = await this.funcionario.getFuncionarioByCpf(cpf);
        expect(resultado).toEqual({ cpf, nome: "Idk", id: "0yU60MfKuy9W5hWIcpjx" });
    }

    async testGetFuncionarioNotFound() {
        const cpf = "2345678901";
        const resultado = await this.funcionario.getFuncionarioByCpf(cpf);
        expect(resultado).toBeNull();
    }

    async testGetAllFuncionarios() {
     
        const resultado = await Funcionario.getFuncionarios();
        expect(resultado.length).toBeGreaterThan(0);
    }

   
}

describe('Funcionario', () => {
    let funcionarioTest;

    beforeEach(() => {
        funcionarioTest = new FuncionarioTest();
        jest.clearAllMocks();
    });



    test('Deve adicionar um Funcionario', async () => {
        await funcionarioTest.testAddFuncionario();
    });

    test('Deve buscar um Funcionario', async () => {
        await funcionarioTest.testGetFuncionario();
    });

    test('Deve retornar null quando nenhum funcionario for encontrado', async () => {
        await funcionarioTest.testGetFuncionarioNotFound();
    });

    test('Deve passar se tiver algum Funcionario', async () => {
        await funcionarioTest.testGetAllFuncionarios();
    });

});