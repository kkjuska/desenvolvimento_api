import { pool } from "../data/db.js"

class FruitService {

    async getAll() {
        try {
            const fruits = await pool.query("SELECT * FROM lm_frutas")
            return fruits
        } catch (error) {
            console.error(error)
        }
    }

    async getById () {
        try{
            const fruits = await pool.query("SELECT id FROM lm_frutas")
            return fruits
        } catch (error) {
            console.error(error)
        }
    }

    async getAll () {
        
    }

}

export const fruitService = new FruitService()