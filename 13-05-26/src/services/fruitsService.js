import { pool } from "../data/db.js"

class fruitsService {

    async getAll() {
        try {
            const fruits = await pool.query("SELECT * FROM lm_fruits")
            return fruits.rows
        } catch (error) {
            console.error(error)
        }
    }

    async getById (id) {
        try{
            const fruits = await pool.query("SELECT * FROM lm_fruits WHERE id = $1", [id])
            return fruits.rows
        } catch (error) {
            console.error(error)
        }
    }

    async create (data) {
        try {
            const fruits = await pool.query("insert into lm_fruits (nome, quantidade) values ($1, $2) returning *", [data.nome, data.quantidade])
            return fruits.rows
        } catch (error) {
            console.error(error)
        }
    }

    async updatePatch(id, data) {
        try {
            const query = "UPDATE lm_fruits SET nome=($1), quantidade=($2) WHERE id = ($3) RETURNING *"
            const res = await pool.query( query, [data.nome, data.quantidade, id])
            
            return res.rows

        } catch (error) {
            console.error(error)
        }
    }
    async updatePut(id, data) {
        try {
            const query = "UPDATE lm_fruits SET nome = ($1), quantidade = ($2) WHERE id = ($3) returning *"
            const res = await pool.query( query, [data.nome, data.quantidade, id])
            return res.rows
        } catch (error) {
            console.error(error)
        }
    }
    
    async delete(id) {
        try {
            const query = "DELETE FROM public.lm_fruits WHERE id = $1"
            const res = await pool.query(query, [id])
            return res.rows
        } catch (error) {
            
        }
    } 
}


export const FruitsService = new fruitsService()