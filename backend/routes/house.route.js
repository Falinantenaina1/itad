import { Router } from "express";

const houseRoutes = Router();

houseRoutes.get("/", (req, res) => res.send({ title: "GET ALL HOUSE" }));

houseRoutes.get("/:id", (req, res) => res.send({ title: "GET HOUSE DETAILS" }));

houseRoutes.post("/", (req, res) => res.send({ title: "CREATE HOUSE" }));

houseRoutes.put("/:id", (req, res) => res.send({ title: "UPDATE HOUSE" }));

houseRoutes.delete("/:id", (req, res) =>
  res.send({ title: "DELETE ONE HOUSE" })
);

export default houseRoutes;
