import express from "express";
import { connectDB } from "./config/db.js"; 
import { Booking } from "./models/synergia.js"; 

const PORT = 3001;
const app = express();


app.use(express.json());


connectDB();

app.get("/", (req, res) => {
  res.send(" Welcome to Synergia Event Booking API!");
});


app.post("/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body); 
    await booking.save(); 
    res.status(201).send(booking); 
  } catch (error) {
    res.status(400).send({ error: error.message }); 
  }
});


app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find(); 
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send({ error: error.message }); 
  }
});


app.get("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).send({ error: "Booking not found" });
    }
    res.status(200).send(booking);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.put("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, 
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking updated successfully", booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.delete("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
