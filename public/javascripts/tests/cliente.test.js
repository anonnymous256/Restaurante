//const Cliente = require('../class/cliente.js');

import Cliente from '../class/cliente.js';

class ClienteTest {
    constructor() {
        this.cliente = new Cliente();
    }

    async testAddCliente() {
        const cpf = "12345678901";
        const nome = "João Silva";

        const result = await this.cliente.addCliente(cpf, nome);

        expect(result).toBe(true);

    }

    async testGetCliente() {
        const cpf = "12345678901";
        
        const resultado = await this.cliente.getCliente(cpf);
        expect(resultado).toEqual({ cpf, nome: "João Silva Atualizado", id: "1" });
    }

    async testGetClienteNotFound() {
        const cpf = "2345678901";
        const resultado = await this.cliente.getCliente(cpf);
        expect(resultado).toBeNull();
    }

    async testGetAllClientes() {
     
        const resultado = await Cliente.getClientes();
        expect(resultado.length).toBeGreaterThan(0);
    }

    async testUpdateCliente() {
        const id = "1";
        const cpf = "12345678901";
        const nome = "João Silva Atualizado";

        const updateDoc = await this.cliente.updateCliente(id, cpf, nome);
        expect(updateDoc).toBe(true);
    }
}

describe('Cliente', () => {
    let clienteTest;

    beforeEach(() => {
        clienteTest = new ClienteTest();
        jest.clearAllMocks();
    });



    test('Deve adicionar um cliente', async () => {
        await clienteTest.testAddCliente();
    });

    test('Deve buscar um cliente', async () => {
        await clienteTest.testGetCliente();
    });

    test('Deve retornar null quando nenhum cliente for encontrado', async () => {
        await clienteTest.testGetClienteNotFound();
    });

    test('Deve passar se tiver algum cliente', async () => {
        await clienteTest.testGetAllClientes();
    });

    test('Deve atualizar um cliente corretamente', async () => {
        await clienteTest.testUpdateCliente();
    });
});