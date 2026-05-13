import { Router } from "express";
import { FruitsService } from "../services/fruitsService.js";
import { validateFruit } from "../middlewares/validatefruits.js";
import { AppError } from "../utils/appError.js";
import { successResponse } from "../utils/response.js"


const router = Router();

router.get("/", async (req, res, next) => {
try {
        const fruits = await FruitsService.getAll()
        console.log(fruits);
        
        res.json(fruits)
    }
    catch(error) {
        console.log(error);
        
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const fruits = await FruitsService.getById(id);

        if(!fruits){
            throw new AppError("fruits não encontrados", 404);
        }
        // return successResponse(
        //     res,
        //     200,
        //     "Legume encontrado com sucesso",
        //     legumes
        // );
    }
    catch (error){
        next(error)
    }
});

router.post("/", async (req, res, next) => {
    const data = req.body
    const newfruit = await FruitsService.create(data);

    res.json(newfruit)
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
        
        const updatefruits = await FruitsService.updatePatch(id, data);
        console.log(updatefruits);
        
        res.json(updatefruits)

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

        const updatedfruits = await FruitsService.updatePut( id, data );
        console.log(updatedfruits);

        res.json(updatedfruits)

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

            const deleted = await FruitsService.delete(id);

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

    export { router as fruitsRoutes };