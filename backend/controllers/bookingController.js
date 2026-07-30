// Django ke events/views.py (BookEventView, MyBookingsView) ka MERN version.

const Event = require('../models/Event');
const Booking = require('../models/Booking');

// @route  POST /api/events/:eventId/book
const bookEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const seatsRequested = Number(req.body.seatsBooked);

    if (!seatsRequested || seatsRequested < 1) {
      return res.status(400).json({ error: 'Invalid seat number' });
    }

    // ===== Race-condition safe seat booking =====
    // Django mein transaction.atomic() + select_for_update() se row lock
    // karke seats check + decrement kiya jata tha, taaki 2 log ek saath
    // book karein to seats negative na ho jayein.
    //
    // MERN/Mongoose mein hum ek hi atomic query se yeh kaam karte hain:
    // findOneAndUpdate() ke andar HI condition (availableSeats >= seatsRequested)
    // check hoti hai aur decrement bhi usi ek DB operation mein hota hai -
    // isliye do requests ek saath aayein to bhi dono ek dusre ko overwrite
    // nahi kar sakti.
    const event = await Event.findOneAndUpdate(
      { _id: eventId, availableSeats: { $gte: seatsRequested } },
      { $inc: { availableSeats: -seatsRequested } },
      { new: true }
    );

    if (!event) {
      // Do possibilities: event exists hi nahi, ya seats kam hain
      const eventExists = await Event.exists({ _id: eventId });
      if (!eventExists) {
        return res.status(404).json({ error: 'Event not found' });
      }
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      event: eventId,
      seatsBooked: seatsRequested,
    });

    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @route  GET /api/my-bookings
const myBookings = async (req, res) => {
  try {
    // .populate() se related Event ka data bhi saath mein le aate hain
    // (Django mein yeh select_related jaisa kaam hai)
    const bookings = await Booking.find({ user: req.user._id }).populate('event');
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { bookEvent, myBookings };

/*
===================== HINGLISH NOTES (Viva / Interview) =====================
1. Q: Django ka transaction.atomic() + select_for_update() yahan
      findOneAndUpdate() se kaise replace hua? Yeh sabse important
      viva question hai is file ka!
   A: select_for_update() database row ko lock kar deta tha jab tak
      transaction complete na ho, taaki 2 parallel requests same event
      ko simultaneously na modify kar sakein (race condition rokta hai).
      MongoDB mein findOneAndUpdate() khud hi atomic hota hai - matlab
      "condition check + update" ek hi indivisible step mein hota hai.
      Isliye agar 2 requests ek saath aayein aur seats sirf 1 bache hon,
      to MongoDB dono ko sequentially process karega - dusri request
      ka availableSeats: {$gte: seatsRequested} condition fail ho
      jayega aur wo null return karega.

2. Q: Agar findOneAndUpdate() null return kare to kaise pata karein ki
      event exist nahi karta ya seats kam hain?
   A: Ek extra query - Event.exists({_id: eventId}) - se check karte
      hain. Agar event hi exist nahi karta to 404, warna 400 "Not enough
      seats" bhejte hain. (Extra DB call lagti hai lekin logic simple
      aur readable rehta hai - beginner-friendly approach.)

3. Q: $inc operator kya karta hai?
   A: MongoDB operator jo kisi number field ko directly database level
      pe increment/decrement karta hai (yahan -seatsRequested se
      decrement). Ye "read karo, JS mein minus karo, phir save karo"
      wale approach se better hai kyunki beech mein koi doosri request
      value change nahi kar sakti.

4. Q: populate('event') kya karta hai?
   A: Booking document mein "event" field sirf ObjectId store karta hai.
      populate() us ObjectId ko use karke actual Event document DB se
      fetch karke response mein jod deta hai - jaise Django ka
      select_related('event') ya serializer mein nested data.
===============================================================================
*/
