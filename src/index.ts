import express from "express";
import bodyParser from "body-parser";
import { faker } from "@faker-js/faker";
import parkings from "../data/parkings.json";

const app = express();

app.use(bodyParser.json());

app.get("/parkings", (req, res) => {
  res.send(parkings);
});

app.post("/auth/login", (req, res) => {
  res.send({ token: faker.string.uuid() });
});

app.post("/auth/register", (req, res) => {
  res.sendStatus(201);
});

app.post("/reservations", (req, res) => {
  const parkingId = req.body.parkingId;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  const parking = parkings.find((p) => p.id === parkingId);

  if (!parking) {
    res.sendStatus(404);
    return;
  }

  res.send({
    id: faker.string.uuid(),
    startDate,
    endDate,
    parkingId,
    parkingName: parking.name,
    parkingPhotoUrl: parking.photoUrl,
    parkingAddress: parking.address,
  });
});

app.get("/parkings/:id", (req, res) => {
  const parking = parkings.find((p) => p.id === req.params.id);
  if (!parking) {
    res.sendStatus(404);
    return;
  }
  res.send(parking);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
