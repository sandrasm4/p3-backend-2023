import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
      const result = await prisma.plato.findMany({});
      res.status(200).json({ platos: result, ok: true });
    } catch (e) {
      res.status(500).json({
        type: e.constructor.name,
        message: e.toString(),
      });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const plato = await prisma.plato.findUnique({
        where: { id: Number(id) },
      });
      if (plato === null) {
        return res.status(404).json({
          error: `Plato con ID ${id} not found`,
        });
      }
      res.status(200).json(plato);
    } catch (e) {
      res.status(500).json({
        type: e.constructor.name,
        message: e.toString(),
      });
    }
  });

  router.post("/", errorChecked(async (req, res) => {
      const newPlato = await prisma.plato.create({ data: req.body });
      res.status(200).json({ newPlato, ok: true });
    })
  );
  
  router.delete("/:id", errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedPlato = await prisma.plato.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(deletedPlato);
    })
  );

  router.put( "/:id", errorChecked(async (req, res) => {
    const { id } = req.params;
    const updatedPlato = await prisma.plato.update({
        where: { id: Number(id) },
        data: req.body,
      });
      res.status(200).json(updatedPlato);
    })
  );

export default router;