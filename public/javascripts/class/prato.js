//import { db, collection, addDoc, doc, getDoc, getDocs, updateDoc, deleteDoc, } from "../firebase_config.js";
import { db, collection, addDoc, doc, getDoc, getDocs, updateDoc, deleteDoc, } from "../firebase_config_test.js";
class Prato {
    constructor(id = "", nome, descricao, imagem, preco, categoria) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.imagem = imagem;
        this.preco = preco;
        this.categoria = categoria;
    }

    async addPrato(nome, descricao, imagem, preco, categoria) {
        try {
            const docRef = await addDoc(collection(db, "cardapio"), {
                nome,
                descricao,
                imagem,
                preco,
                categoria,
                dataCriacao: new Date()
            });
            return true;
        } catch (e) {
            console.error("Erro ao adicionar prato: ", e);
            return false;
        }
    }

    async getPrato(id) {
        try {
            const docRef = doc(db, "cardapio", id);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                return { ...docSnap.data(), id: docSnap.id };
            } else {
                return null;
            }
        } catch (e) {
            console.error("Erro ao buscar prato: ", e);
            return null;
        }
    }

    static async getPratos() {
        try {
            const querySnapshot = await getDocs(collection(db, "cardapio"));
            return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        } catch (e) {
            console.error("Erro ao buscar pratos: ", e);
            return [];
        }
    }

    async updatePrato(id, nome, descricao, imagem, preco, categoria) {
        const docRef = doc(db, "cardapio", id);
        try {
            await updateDoc(docRef, {
                nome,
                descricao,
                imagem,
                preco,
                categoria
            });
            return true;
        } catch (error) {
            console.error("Erro ao atualizar prato: ", error);
            return false;
        }
    }

    async deletePrato(id) {
        try {
            await deleteDoc(doc(db, "cardapio", id));
            return true;
        } catch (error) {
            console.error("Erro ao deletar prato: ", error);
            return false;
        }
    }
}

export default Prato;