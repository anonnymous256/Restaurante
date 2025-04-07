import { db, collection, addDoc, query, where, getDocs, limit } from "../firebase_config_test.js";
//import { db, collection, addDoc, query, where, getDocs, limit } from "../firebase_config.js";


class Cliente {
    constructor(id = "", nome = "", cpf = "") {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
    }

    async addCliente(nome, cpf) {
        try {
            const docRef = await addDoc(collection(db, "cliente"), {
                nome,
                cpf
            });
            return true;
        } catch (e) {
            console.error("Erro ao adicionar cliente: ", e);
            return null;
        }
    }

    async getClienteByCpf(cpf) {
        try {
            const q = query(collection(db, "cliente"), where("cpf", "==", cpf), limit(1));
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
                return null;
            } else {
                const doc = querySnapshot.docs[0];
                return { id: doc.id, ...doc.data() };
            }
        } catch (e) {
            console.error("Erro ao buscar cliente: ", e);
            return null;
        }
    }

    static async getClientes() {
        try {
            const querySnapshot = await getDocs(collection(db, "cliente"));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (e) {
            console.error("Erro ao buscar clientes: ", e);
            return [];
        }
    }
}

export default Cliente;