import Dashboard from '../class/dashboard.js';

//const Dashboard = require('../class/dashboard.js');

class DashboardTest {
    constructor() {
        this.dashboard = new Dashboard();
    }

    async testCarregarDados() {
        const result = await this.dashboard.carregarDados();
        expect(result).not.toBeNull();
        expect(result.entrada).toBeGreaterThanOrEqual(0);
        expect(result.saida).toBeGreaterThanOrEqual(0);
        expect(result.produtos).toBeGreaterThanOrEqual(0);
        expect(result.clientes).toBeGreaterThanOrEqual(0);
        expect(result.funcionarios).toBeGreaterThanOrEqual(0);
    }
}

describe('Dashboard', () => {
    let dashboardTest;

    beforeEach(() => {
        dashboardTest = new DashboardTest();
        jest.clearAllMocks();
    });

    test('Deve carregar os dados corretamente', async () => {
        await dashboardTest.testCarregarDados();
    });
});
