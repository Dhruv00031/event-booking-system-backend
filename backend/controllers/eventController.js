// Django ke events/views.py (EventListCreateView, EventDetailView) ka MERN version.

const Event = require('../models/Event');

// @route  GET /api/events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @route  POST /api/events
const createEvent = async (req, res) => {
  try {
    const { title, date, location, totalSeats } = req.body;

    if (!title || !date || !location || totalSeats === undefined) {
      return res.status(400).json({ error: 'title, date, location and totalSeats are required' });
    }

    // availableSeats jaan-bujh kar nahi bheja - Event model ka pre-save
    // hook khud hi ise totalSeats ke barabar set kar dega
    const event = await Event.create({ title, date, location, totalSeats });

    return res.status(201).json(event);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// @route  GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    return res.status(200).json(event);
  } catch (error) {
    return res.status(404).json({ error: 'Event not found' });
  }
};

// @route  PUT /api/events/:id
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    return res.status(200).json(event);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// @route  DELETE /api/events/:id
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getEvents, createEvent, getEventById, updateEvent, deleteEvent };

/*
===================== HINGLISH NOTES (Viva / Interview) =====================
1. Q: createEvent mein availableSeats field kyun nahi bheja request body
      se?
   A: Kyunki Event.js model ke andar "pre('save')" hook already
      availableSeats ko totalSeats ke barabar set kar deta hai jab naya
      document create hota hai - yahi Django ke model.save() override ka
      MERN equivalent hai (previous file mein detail comment hai).

2. Q: updateEvent mein PUT se availableSeats bhi manually change ho
      sakta hai - kya yeh sahi hai?
   A: Haan, kyunki update ke time pre-save hook nahi chalta (wo sirf
      naye document banate waqt chalta hai, isNew check ki wajah se) -
      yeh Django ke original behaviour jaisa hi hai, jahan available_seats
      field readonly nahi thi PUT request mein (sirf admin panel mein
      "readonly_fields" tha, API level pe nahi).

3. Q: Yahan koi admin-only restriction (create/update/delete pe) kyun
      nahi lagayi?
   A: Kyunki original Django EventListCreateView aur EventDetailView,
      dono ke permission_classes sirf [IsAuthenticated] the — koi bhi
      logged-in user event create/edit/delete kar sakta tha. Humne
      exactly wahi behaviour maintain kiya (isse alag karna scope-creep
      hota).
===============================================================================
*/
