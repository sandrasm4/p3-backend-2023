import { Router } from "express";
import prisma from "./prisma-client.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
      const result = await prisma.menu.findMany({});
      res.status(200).json({ menus: result, ok: true });
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
      const menu = await prisma.menu.findUnique({
        where: { id: Number(id) },
      });
      if (menu === null) {
        return res.status(404).json({
          error: `Menu with ID ${id} not found`,
        });
      }
      res.status(200).json(menu);
    } catch (e) {
      res.status(500).json({
        type: e.constructor.name,
        message: e.toString(),
      });
    }
  });

 

export default router;