//const { db, collection, addDoc, limit, doc, getDoc, getDocs, where, updateDoc } = require("../firebase_config.js");

//const { query } = require("../firebase_config.js");

import { db, collection, addDoc, limit, doc, getDoc, getDocs, where, updateDoc } from "../firebase_config_test.js";
import { query } from "../firebase_config.js";

class Funcionario {
    constructor(id = "", cpf, nome) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
    }

    async addFuncionario(cpf, nome) {
        try {
            const docRef = await addDoc(collection(db, "funcionario"), {
                cpf,
                nome
            });
            return true;
        } catch (e) {
            console.error("Error adding document: ", e);
            return false;
        }
    }

    async getFuncionario(cpf) {
        const docRef = collection(db, "funcionario");
        const q = query(docRef, where("cpf", "==", cpf), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        } else {
            const docData = querySnapshot.docs[0].data();
            return { ...docData, id: querySnapshot.docs[0].id };
        }
    }

    static async getFuncionarios() {
        const querySnapshot = await getDocs(collection(db, "funcionario"));
        return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }

    async updateFuncionario(id, cpf, nome) {
        const docRef = doc(db, "funcionario", id);
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


export default Funcionario;