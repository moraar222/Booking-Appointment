import Station from "./models/Station";


function isBlockedTime(date, time, lunchHours) {
    const dayOfWeek = date.getDay(); // 0 - Sunday, 6 - Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (lunchHours) {
        const bookedTime = new Date(date.getTime());
        bookedTime.setHours(parseInt(time.split(':')[0]));
        bookedTime.setMinutes(parseInt(time.split(':')[1]));

        const lunchStartTime = new Date(date.getTime());
        lunchStartTime.setHours(parseInt(lunchHours.start.split(':')[0]));
        lunchStartTime.setMinutes(parseInt(lunchHours.start.split(':')[1]));

        const lunchEndTime = new Date(date.getTime());
        lunchEndTime.setHours(parseInt(lunchHours.end.split(':')[0]));
        lunchEndTime.setMinutes(parseInt(lunchHours.end.split(':')[1]));

        return isWeekend || (bookedTime >= lunchStartTime && bookedTime <= lunchEndTime);
    } else {
        return isWeekend;
    }
}

async function makeReservation(salonId, stationId, date, time) {
    // ... existing validation and station retrieval logic ...

    const station = await Station.findById(stationId);

    // Check for blocked weekends or lunch hours
    if (station.blockedWeekends && (date.getDay() === 0 || date.getDay() === 6)) {
        throw new Error('Station unavailable on weekends');
    } else if (station.lunchHours) {
        if (isBlockedTime(date, time, station.lunchHours)) {
            throw new Error('Station unavailable during lunch hours');
        }
    }

    // ... existing reservation creation and saving logic ...
}
