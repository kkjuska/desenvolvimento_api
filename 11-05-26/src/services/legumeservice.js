import { pool } from "../data/db.js"

class LegumesService {

    async getAll() {
        try {
            const legumes = await pool.query("SELECT * FROM lm_legumes")
            return legumes.rows
        } catch (error) {
            console.error(error)
        }
    }

    async getById (id) {
        try{
            const legumes = await pool.query("SELECT * FROM lm_legumes WHERE id = $1", [id])
            return legumes.rows
        } catch (error) {
            console.error(error)
        }
    }

    async create (data) {
        try {
            const legumes = await pool.query("insert into lm_legumes (nome, quantidade) values ($1, $2) returning *", [data.nome, data.quantidade])
            return legumes.rows
        } catch (error) {
            console.error(error)
        }
    }

    async updatePatch(id, data) {
        try {
            const query = "UPDATE lm_legumes SET nome=($1), quantidade=($2) WHERE id = ($3) RETURNING *"
            const res = await pool.query( query, [data.nome, data.quantidade, id])
            
            return res.rows

        } catch (error) {
            console.error(error)
        }
    }
    async updatePut(id, data) {
        try {
            const query = "UPDATE lm_legumes SET nome = ($1), quantidade = ($2) WHERE id = ($3) returning *"
            const res = await pool.query( query, [data.nome, data.quantidade, id])
            return res.rows
        } catch (error) {
            console.error(error)
        }
    }
    
    async delete(id) {
        try {
            const query = "DELETE FROM public.lm_legumes WHERE id = $1"
            const res = await pool.query(query, [id])
            return res.rows
        } catch (error) {
            
        }
    } 
}


export const legumesService = new LegumesService()