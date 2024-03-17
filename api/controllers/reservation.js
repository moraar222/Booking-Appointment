import Reservation from "../models/Reservation.js";

// import Station from "../models/Station.js";
// import sendEmail from "../routes/utils/sendEmail.js";

export const createReservation = async (req, res, next) => {
  const newReservation = new Reservation(req.body);

  try {
    const savedReservation = await newReservation.save();
    res.status(200).json(savedReservation);
  } catch (err) {
    next(err);
  }
};

export const updateReservation = async (req, res, next) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedReservation);
  } catch (err) {
    next(err);
  }
};

export const deleteReservation = async (req, res, next) => {
  try {
    await Salon.findByIdAndDelete(req.params.id);

    res.status(200).json("reservation has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getReservation = async (req, res, next) => {
  try {
    const Reservation = await Reservation.findById(req.params.id);
    console.log("Get Reservation", req.params.id);
    res.status(200).json(Reservation);
  } catch (err) {
    next(err);
  }
};

export const getAvailableSlots = async (req, res, next) => {
  try {
    function formatDate(dateString) {
      const date = new Date(dateString);
      const month = date.getMonth() + 1; // Months are 0-indexed, so we add 1
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }
    // const selectedDate = req.query.selectedDate;
    const selectedDate = formatDate(req.query.selectedDate);

    // Find all reservations for the selected date
    const reservations = await Reservation.find({ date: selectedDate });

    const salonOpeningTime = 800; // 8:00 am
    const salonClosingTime = 2000; // 8:00 pm
    let availableSlots = [];
    let bookedSlots = [];

    function convertTimeTo24HourFormat(timeString) {
      // Extract hours and minutes
      const [time, period] = timeString.split(" ");
      let [hoursString, minutesString] = time.split(":");
      let hours = parseInt(hoursString);
      const minutes = parseInt(minutesString);

      // Adjust hours for PM
      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }

      // Convert hours and minutes to 24-hour format
      const hoursFormatted = hours.toString().padStart(2, "0");
      const minutesFormatted = minutes.toString().padStart(2, "0");

      // Return time in 24-hour format without colon
      return hoursFormatted + minutesFormatted;
    }

    // Convert to 24 hrs then sort them
    reservations.forEach((reservation) => {
      const start = reservation.startTime;
      const end = reservation.endTime;
      bookedSlots.push([
        convertTimeTo24HourFormat(start),
        convertTimeTo24HourFormat(end),
      ]);
    });

    // Function to convert time string to numerical value (minutes past midnight)
    function timeToNumericValue(timeString) {
      const hours = parseInt(timeString.slice(0, 2));
      const minutes = parseInt(timeString.slice(2));
      return hours * 60 + minutes;
    }

    // Sort the time ranges based on the start time
    const sortedTimeRanges = bookedSlots.sort((a, b) => {
      const startA = timeToNumericValue(a[0]);
      const startB = timeToNumericValue(b[0]);
      return startA - startB;
    });

    // Calculate available time slots


    function findFreeSlots(bookedSlots) {
      const booked = new Set();
      
      bookedSlots.forEach(slot => {
          const [start, end] = slot.map(time => parseInt(time));
          for (let i = start; i < end; i++) {
              booked.add(i);
          }
      });
      
      const freeSlots = [];
      let currentTime = 800;
      while (currentTime < 2000) {
          if (!booked.has(currentTime)) {
              let startTime = currentTime;
              while (currentTime < 2000 && !booked.has(currentTime)) {
                  currentTime++;
              }
              freeSlots.push([startTime.toString().padStart(4, '0'), currentTime.toString().padStart(4, '0')]);
          } else {
              currentTime++;
          }
      }
      
      return freeSlots;
  }
  const freeSlots = findFreeSlots(bookedSlots);  

    // Send the available slots as a response
    res.status(200).json(freeSlots);
  } catch (error) {
    next(error);
    console.error("Error fetching available slotssss:", error);
    res.status(500).json({ error: "Internal Server Errorrrrrr" }); // Handle error and send response
  }
};

export const getReservations = async (req, res, next) => {
  const { Servicename, Duration, Salonistid, startTime, ...others } = req.query;
  try {
    let query = { ...others };
    if (name) {
      query.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search for similar names
    }
    if (title) {
      query.title = { $regex: new RegExp(title, "i") }; // Case-insensitive search for similar titles
    }

    const reservation = await Reservation.find({
      ...query,
      startTime: { $gt: satrt | 8, $lt: stop || 8 },
    }).limit(req.query.limit || 50);

    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
};

export const countByDuration = async (req, res, next) => {
  const Duration = req.query.days.split(",");
  try {
    const list = await Promise.all(
      Duration.map((Duration) => {
        return Reservation.countByDuration({ Duration: Duration });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};


export const makeReservation = async (req, res, next) => {
  try {
    // Extract data from the request body
    const { date, startTime, endTime, serviceName, duration, price } = req.body;

    // Create a new reservation object
    const newReservation = new Reservation({
      date,
      startTime,
      endTime,
      serviceName,
      duration,
      price,
    });

    // Save the new reservation to the database
    const savedReservation = await newReservation.save();

    // Respond with the saved reservation
    res.status(201).json(savedReservation);
  } catch (error) {
    // Handle errors
    console.error("Error making reservation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const countByType = async (req, res, next) => {
//   try {
//     const spaTreatmentCount = await Salon.countDocuments({
//       type: "spaTreatment",
//     });
//     const fullMakeupCount = await Salon.countDocuments({ type: "fullMakeup" });
//     const braidingAndHairstylesCount = await Salon.countDocuments({
//       type: "braidingAndHairstyles",
//     });
//     const manicureAndPedicureCount = await Salon.countDocuments({
//       type: "manicureAndPedicure",
//     });
//     const haircutAndStylingCount = await Salon.countDocuments({
//       type: "haircutAndStyling",
//     });

//     res.status(200).json([
//       { type: "spaTreatment", count: spaTreatmentCount },
//       { type: "fullMakeup", count: fullMakeupCount },
//       { type: "braidingAndHairstyles", count: braidingAndHairstylesCount },
//       { type: "manicureAndPedicure", count: manicureAndPedicureCount },
//       { type: "haircutAndStyling", count: haircutAndStylingCount },
//     ]);
//   } catch (err) {
//     next(err);
//   }
// };
// export const getSalonStations = async (req, res, next) => {
//   try {
//     const salon = await Salon.findById(req.params.id);
//     const list = await Promise.all(
//       salon.stations.map((station) => {
//         return Station.findById(station);
//       })
//     );
//     res.status(200).json(list);
//   } catch (err) {
//     next(err);
//   }
// };
