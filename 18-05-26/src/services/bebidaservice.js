import { pool } from "../data/db.js"

class BebidasService {

    async getAll() {
        try {
            const bebidas = await pool.query("SELECT * FROM lm_bebidas")
            return bebidas.rows
        } catch (error) {
            console.error(error)
        }
    }

    async getById (id) {
        try{
            const bebidas = await pool.query("SELECT * FROM lm_bebidas WHERE id = $1", [id])
            console.log("cheguei aqui", bebidas.rows)
            return bebidas.rows
        } catch (error) {
            console.error(error)
        }
    }

    async create (data) {
        try {
            const bebidas = await pool.query("insert into lm_bebidas (name) values ($1) returning *", [data.name])
            console.log("cheguei aqui", bebidas.rows)
            return bebidas.rows
        } catch (error) {
            console.error(error)
        }
    }

    async updatePatch(id, data) {
        try {
            const query = "UPDATE lm_bebidas SET name=($1) WHERE id = ($2) RETURNING *"
            const res = await pool.query( query, [data.nome, id])
            
            return res.rows

        } catch (error) {
            console.error(error)
        }
    }
    async updatePut(id, data) {
        try {
            const query = "UPDATE lm_bebidas SET name = ($1) WHERE id = ($2) returning *"
            const res = await pool.query( query, [data.nome, id])
            return res.rows
        } catch (error) {
            console.error(error)
        }
    }
    
    async delete(id) {
        try {
            const query = "DELETE FROM public.lm_bebidas WHERE id = $1"
            const res = await pool.query(query, [id])
            return res.rows
        } catch (error) {
            
        }
    } 
}


export const bebidasService = new BebidasService()