//const Cliente = require('../class/cliente.js');

import Funcionario from '../class/funcionario.js';

class FuncionarioTest {
    constructor() {
        this.funcionario = new funcionario();
    }

    async testAddFuncionario() {
        const cpf = "12345678901";
        const nome = "José alves";

        const result = await this.funcionario.addFuncionario(cpf, nome);

        expect(result).toBe(true);

    }

    async testGetFuncionario() {
        const cpf = "12345678901";
        
        const resultado = await this.funcionario.getFuncionario(cpf);
        expect(resultado).toEqual({ cpf, nome: "José alves Atualizado", id: "1" });
    }

    async testGetFuncionarioNotFound() {
        const cpf = "2345678901";
        const resultado = await this.funcionario.getFuncionario(cpf);
        expect(resultado).toBeNull();
    }

    async testGetAllCFuncionarios() {
     
        const resultado = await Funcionario.getFuncionarios();
        expect(resultado.length).toBeGreaterThan(0);
    }

    async testUpdateFuncionario() {
        const id = "1";
        const cpf = "12345678901";
        const nome = "José alves Atualizado";

        const updateDoc = await this.funcionario.updateFuncionario(id, cpf, nome);
        expect(updateDoc).toBe(true);
    }
}

describe('Funcionario', () => {
    let funcionarioTest;

    beforeEach(() => {
        funcionarioTest = new FuncionarioTest();
        jest.clearAllMocks();
    });



    test('Deve adicionar um funcionario', async () => {
        await funcionarioTest.testAddFuncionario();
    });

    test('Deve buscar um funcionario', async () => {
        await funcionarioTest.testGetFuncionario();
    });

    test('Deve retornar null quando nenhum funcionario for encontrado', async () => {
        await funcionarioTest.testGetFuncionarioNotFound();
    });

    test('Deve passar se tiver algum funcionario', async () => {
        await funcionarioTest.testGetAllFuncionarios();
    });

    test('Deve atualizar um funcionario corretamente', async () => {
        await funcionarioTest.testUpdateFuncionario();
    });
});