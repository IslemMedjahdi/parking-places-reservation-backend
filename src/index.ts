import express from "express";
import bodyParser from "body-parser";
import { faker } from "@faker-js/faker";

const app = express();

app.use(bodyParser.json());

app.get("/parkings", (req, res) => {
  res.send(Array.from({ length: 10 }, generateParking));
});

const FAKE_PARKING_IMAGES = [
  "https://t4.ftcdn.net/jpg/03/30/78/77/360_F_330787755_RSUhTI7LvN3UUvGWus7t90Sh8yACJ8Lb.jpg",
  "https://cdn.vox-cdn.com/thumbor/okY54qvEzKcEa2RpTNu84xArEFI=/0x0:5464x3640/1200x675/filters:focal(2295x1383:3169x2257)/cdn.vox-cdn.com/uploads/chorus_image/image/72262173/GettyImages_1354859135__1_.0.jpg",
  "https://assets-prd.raicore.com/-/media/project/rai-amsterdam/intertraffic/news/2022/parkingshape1-550-x-300-px.png?h=300&iar=0&w=550&rev=cb95d922f0984100ba4515d55baca3b0&extension=,webp&hash=643D7E1F1F3FD4BC9C577BEAEC3F7DCD0",
  "https://thumbs.dreamstime.com/b/car-parking-lot-viewed-above-aerial-view-top-129426684.jpg",
];

function generateParking() {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    totalPlaces: faker.number.int({ min: 50, max: 200 }),
    freePlaces: faker.number.int({ min: 0, max: 50 }),
    price: parseFloat(faker.finance.amount({ min: 200, max: 1200 })),
    rating: parseFloat(faker.finance.amount({ min: 1, max: 5 })),
    photoUrl:
      FAKE_PARKING_IMAGES[
        faker.number.int({ min: 0, max: FAKE_PARKING_IMAGES.length - 1 })
      ],
    description: faker.lorem.paragraph(),
  };
}

app.post("/auth/login", (req, res) => {
  res.send({ token: "1234" });
});

app.post("/auth/register", (req, res) => {
  res.sendStatus(201);
});

app.post("/reservations", (req, res) => {
  res.send({
    id: faker.string.uuid(),
  });
});

app.get("/parkings/:id", (req, res) => {
  res.send(generateParking());
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
