import { Router } from "express";
import prisma from "./prisma-client.js";

const router = Router();

router.get("/menus", async (req, res) => {
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