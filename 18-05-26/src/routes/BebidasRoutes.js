import { Router } from "express";
import { bebidasService } from "../services/bebidaservice.js";
import { validateFruit } from "../middlewares/validatefruits.js";
import { AppError } from "../utils/appError.js";
import { successResponse } from "../utils/response.js"


const router = Router();

router.get("/", async (req, res, next) => {
try {
        const bebidas = await bebidasService.getAll()
        console.log(bebidas);
        
        res.json(bebidas)
    }
    catch(error) {
        console.log(error);
        
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const bebidas = await bebidasService.getById(id);
        console.log(bebidas)

        res.json(bebidas)

        if(!bebidas){
            throw new AppError("bebidas não encontrados", 404);
        }
        // return successResponse(
        //     res,
        //     200
        // );
    }
    catch (error){
        next(error)
    }
});

router.post("/", async (req, res, next) => {
    const data = req.body
    const newBebida = await bebidasService.create(data);

    res.json(newBebida)
        // return successResponse(
        //     res,
        //     201,
        //     "fruta criada com sucesso",
        //     newFruit
        // )
});

router.patch("/:id", async(req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body

        console.log(data);
        
        const updateBebidas = await bebidasService.updatePatch(id, data);
        console.log(updateBebidas);
        
        res.json(updateBebidas)

        // return successResponse(
        //     res,
        //     200,
        //     "Fruta atualizada com sucesso",
        //     updateFruit
        // );
    }
    catch(error){
        next(error);
    }
});

router.put("/:id",  async(req, res, next) => {
    try{
        const { id } = req.params;
        const data = req.body

        const updatedBebidas = await bebidasService.updatePut( id, data );
        console.log(updatedBebidas);

        res.json(updatedBebidas)

        // return successResponse(
        //     res,
        //     200,
        //     "Fruta substituida com sucesso",
        //     updatedfruit
        // );
        }
        catch(error){
            next(error);
        }
    });

    router.delete("/:id", async(req, res, next) => {
        try{
            const { id } = req.params;

            const deleted = await bebidasService.delete(id);
            res.json(deleted)
            // return successResponse(
            //     res,
            //     200,
            //     "fruta deletada com sucesso"
            // )
        }
        catch(error){
            next(error)
        }
    });

    export { router as BebidasRoutes };