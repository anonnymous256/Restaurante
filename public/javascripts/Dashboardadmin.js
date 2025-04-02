// public/javascripts/DashboardClient.js
//const Dashboard = require("../public/javascripts/Dashboard");
import Dashboard from "../javascripts/class/dashboard.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const dashboard = new Dashboard();
        const dados = await dashboard.carregarDados();
  
      if (!dados) {
        console.error("Erro ao carregar dados");
        return;
      }
  
      const ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Entrada", "Saída", "Produtos", "Clientes", "Funcionários"],
          datasets: [{
            label: "Dados do Restaurante",
            data: [
              dados.entrada,
              dados.saida,
              dados.produtos,
              dados.clientes,
              dados.funcionarios
            ],
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(153, 102, 255, 0.2)"
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(153, 102, 255, 1)"
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } catch (error) {
      console.error("Erro ao carregar os dados do gráfico:", error);
    }
  });
  