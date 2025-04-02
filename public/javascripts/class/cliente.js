//const { db, collection, addDoc, limit, doc, getDoc, getDocs, where, updateDoc } = require("../firebase_config.js");

//const { query } = require("../firebase_config.js");

import { db, collection, addDoc, limit, doc, getDoc, getDocs, where, updateDoc } from "../firebase_config.js";
import { query } from "../firebase_config.js";

class Cliente {
    constructor(id = "", cpf, nome) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
    }

    async addCliente(cpf, nome) {
        try {
            const docRef = await addDoc(collection(db, "cliente"), {
                cpf,
                nome
            });
            return true;
        } catch (e) {
            console.error("Error adding document: ", e);
            return false;
        }
    }

    async getCliente(cpf) {
        const docRef = collection(db, "cliente");
        const q = query(docRef, where("cpf", "==", cpf), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        } else {
            const docData = querySnapshot.docs[0].data();
            return { ...docData, id: querySnapshot.docs[0].id };
        }
    }

    static async getClientes() {
        const querySnapshot = await getDocs(collection(db, "cliente"));
        return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }

    async updateCliente(id, cpf, nome) {
        const docRef = doc(db, "cliente", id);
        try {
            await updateDoc(docRef, {

                cpf,
                nome
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}


export default Cliente;