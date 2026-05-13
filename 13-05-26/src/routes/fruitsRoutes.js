import { Router } from "express";
import { legumesService } from "../services/legumeservice.js";
import { validateFruit } from "../middlewares/validatefruits.js";
import { AppError } from "../utils/appError.js";
import { successResponse } from "../utils/response.js"


const router = Router();

router.get("/", async (req, res, next) => {
try {
        const legumes = await legumesService.getAll()
        console.log(legumes);
        
        res.json(legumes)
    }
    catch(error) {
        console.log(error);
        
    }
});

router.get("/:id", validateFruit.id, async (req, res, next) => {
    try {
        const { id } = req.params;

        const legumes = await legumesService.getById(id);

        if(!legumes){
            throw new AppError("Legumes não encontrados", 404);
        }
        return successResponse(
            res,
            200,
            "Legume encontrado com sucesso",
            legumes
        );
    }
    catch (error){
        next(error)
    }
});

router.post("/", async (req, res, next) => {
    const data = req.body
    const newLegume = await legumesService.create(data);

    res.json(newLegume)
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
        
        const updateLegumes = await legumesService.updatePatch(id, data);
        console.log(updateLegumes);
        
        res.json(updateLegumes)

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

        const updatedLegumes = await legumesService.updatePut( id, data );
        console.log(updatedLegumes);

        res.json(updatedLegumes)

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

            const deleted = await legumesService.delete(id);

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

    export { router as legumesRoutes };