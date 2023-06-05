import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
      const result = await prisma.nevera.findMany({});
      res.status(200).json({ neveras: result, ok: true });
    } catch (e) {
      res.status(500).json({
        type: e.constructor.name,
        message: e.toString(),
      });
    }
  });

  router.get( "/:id", errorChecked(async (req, res) => {
    const { id } = req.params;
    const nevera = await prisma.nevera.findUniqueOrThrow({
      where: { id: Number(id) },
    });
      res.status(200).json(nevera);
    })
  );

  router.post("/", errorChecked(async (req, res) => {
      const newNevera = await prisma.nevera.create({ data: req.body });
      res.status(200).json({ newNevera, ok: true });
    })
  );
  
  router.delete("/:id", errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedNevera = await prisma.nevera.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(deletedNevera);
    })
  );

  router.put( "/:id", errorChecked(async (req, res) => {
    const { id } = req.params;
    const updatedNevera = await prisma.nevera.update({
        where: { id: Number(id) },
        data: req.body,
      });
      res.status(200).json(updatedNevera);
    })
  );

export default router;