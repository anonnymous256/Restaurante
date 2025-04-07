import Prato from '../class/prato.js';

class PratoTest {
    constructor() {
        this.prato = new Prato();
        this.testId = null; // Armazenará o ID do item de teste
    }

    async testAddPrato() {
        const nome = "Livro de Teste";
        const descricao = "Descrição do livro para testes";
        const imagem = "https://example.com/imagem-teste.jpg";
        const preco = 29.99;
        const categoria = "História";

        const result = await this.prato.addPrato(nome, descricao, imagem, preco, categoria);
        expect(result).toBe(true);
    }

    async testGetPratos() {
        const resultado = await Prato.getPratos();
        
        // Verifica se retornou uma lista
        expect(Array.isArray(resultado)).toBe(true);
        
        // Verifica se há pelo menos um item na lista
        expect(resultado.length).toBeGreaterThan(0);
        
        // Armazena o ID do primeiro item para usar nos testes de edição e exclusão
        if (resultado.length > 0) {
            this.testId = resultado[0].id;
        }
        
        return resultado;
    }


    async testUpdatePrato() {
        // Primeiro obtém a lista para pegar um ID válido
        const pratos = await this.testGetPratos();
        if (pratos.length === 0) {
            throw new Error("Não há pratos para testar");
        }
        
        const id = this.testId || pratos[0].id;
        const nome = "Livro de Teste Atualizado";
        const descricao = "Descrição atualizada para testes";
        const imagem = "https://example.com/imagem-atualizada.jpg";
        const preco = 39.99;
        const categoria = "Romance";

        const updateResult = await this.prato.updatePrato(id, nome, descricao, imagem, preco, categoria);
        expect(updateResult).toBe(true);
        
        // Verifica se os dados foram realmente atualizados
        const pratoAtualizado = await this.prato.getPrato(id);
        expect(pratoAtualizado.nome).toBe(nome);
        expect(pratoAtualizado.descricao).toBe(descricao);
        expect(pratoAtualizado.preco).toBe(preco);
        expect(pratoAtualizado.categoria).toBe(categoria);
    }

    async testDeletePrato() {
        // Primeiro adiciona um novo prato específico para o teste de exclusão
        const nome = "Livro para Excluir";
        const descricao = "Este livro será excluído no teste";
        const imagem = "https://example.com/imagem-exclusao.jpg";
        const preco = 19.99;
        const categoria = "Terror";

        // Adiciona o prato
        await this.prato.addPrato(nome, descricao, imagem, preco, categoria);
        
        // Busca o prato recém-criado
        const pratos = await Prato.getPratos();
        const pratoParaExcluir = pratos.find(p => p.nome === nome);
        
        if (!pratoParaExcluir) {
            throw new Error("Não foi possível encontrar o prato para exclusão");
        }
        
        // Testa a exclusão
        const deleteResult = await this.prato.deletePrato(pratoParaExcluir.id);
        expect(deleteResult).toBe(true);
        
        // Verifica se o prato foi realmente excluído
        const pratosAposExclusao = await Prato.getPratos();
        const pratoExcluido = pratosAposExclusao.find(p => p.id === pratoParaExcluir.id);
        expect(pratoExcluido).toBeUndefined();
    }
}

describe('Prato', () => {
    let pratoTest;

    beforeEach(() => {
        pratoTest = new PratoTest();
        jest.clearAllMocks();
    });

    test('Deve adicionar um livro', async () => {
        await pratoTest.testAddPrato();
    });

    test('Deve obter a lista de livros', async () => {
        await pratoTest.testGetPratos();
    });

    test('Deve atualizar um livro corretamente', async () => {
        await pratoTest.testUpdatePrato();
    });

    test('Deve excluir um livro corretamente', async () => {
        await pratoTest.testDeletePrato();
    });
});