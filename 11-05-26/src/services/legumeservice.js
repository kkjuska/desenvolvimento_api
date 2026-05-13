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
}

export const legumesService = new LegumesService()