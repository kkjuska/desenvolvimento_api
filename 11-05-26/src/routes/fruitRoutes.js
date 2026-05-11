import { Router } from "express";
import { fruitService } from "../services/fruitservice.js";
import { validateFruit } from "../middlewares/validatefruits.js";
import { AppError } from "../utils/appError.js";
import { successResponse } from "../utils/response.js"


const router = Router();

router.get("/", async (req, res, next) => {
try {
        const fruits = await fruitService.getAll()
        console.log(fruits);
        
        console.log("cheguei aqui");
        
        res.json(fruits)
    }
    catch(error) {
        console.log(error);
        
    }
});

router.get("/:id", validateFruit.id, async (req, res, next) => {
    try {
        const { id } = req.params;

        const fruit = await fruitService.getById(id);

        if(!fruit){
            throw new AppError("fruta não encontrada", 404);
        }
        return successResponse(
            res,
            200,
            "fruta encontrada com sucesso",
            fruit
        );
    }
    catch (error){
        next(error)
    }
});

router.post("/", validateFruit.post, async (req, res, next) => {
    try{
        const newFruit = await fruitService.create(req.body);

        return successResponse(
            res,
            201,
            "fruta criada com sucesso",
            newFruit
        )
    }
    catch(error) {
        next(error);
    }
});

router.patch("/:id", validateFruit.id, validateFruit.patch, async(req, res, next) => {
    try {
        const { id } = req.params;

        const updateFruit = await fruitService.updatePatch(id, req.body);

        if(!updateFruit){
            throw new AppError("fruta não encontrada", 404);
        }

        return successResponse(
            res,
            200,
            "Fruta atualizada com sucesso",
            updateFruit
        );
    }
    catch(error){
        next(error);
    }
});

router.put("/:id", validateFruit.id, validateFruit.put, async(req, res, next) => {
    try{
        const { id } = req.params;

        const updatedfruit = await fruitService.updatePut(
            id, req.body
        );
        
        if (!updatedfruit) {
            throw new AppError("fruta não encontrada", 404);
        }

        return successResponse(
            res,
            200,
            "Fruta substituida com sucesso",
            updatedfruit
        );
        }
        catch(error){
            next(error);
        }
    });

    router.delete("/:id", validateFruit.id, async(req, res, next) => {
        try{
            const { id } = req.params;

            const deleted = await fruitService.delete(id);

            if (!deleted){
                throw new AppError("fruta não encontrada", 404);
            }

            return successResponse(
                res,
                200,
                "fruta deletada com sucesso"
            )
        }
        catch(error){
            next(error)
        }
    });

    export { router as fruitRoutes };