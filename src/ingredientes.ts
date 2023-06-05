import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
      const result = await prisma.ingrediente.findMany({});
      res.status(200).json({ ingredientes: result, ok: true });
    } catch (e) {
      res.status(500).json({
        type: e.constructor.name,
        message: e.toString(),
      });
    }
  });

  router.get( "/:id", errorChecked(async (req, res) => {
    const { id } = req.params;
    const ingrediente = await prisma.ingrediente.findUniqueOrThrow({
      where: { id: Number(id) },
    });
      res.status(200).json(ingrediente);
    })
  );

  router.post("/", errorChecked(async (req, res) => {
      const newIngrediente = await prisma.ingrediente.create({ data: req.body });
      res.status(200).json({ newIngrediente, ok: true });
    })
  );
  
  router.delete("/:id", errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedIngrediente = await prisma.ingrediente.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(deletedIngrediente);
    })
  );

  router.put( "/:id", errorChecked(async (req, res) => {
    const { id } = req.params;
    const updatedIngrediente = await prisma.ingrediente.update({
        where: { id: Number(id) },
        data: req.body,
      });
      res.status(200).json(updatedIngrediente);
    })
  );

export default router;