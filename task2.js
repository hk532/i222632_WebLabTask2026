class Conference {
  constructor(maxCapacity = 100) {
    this.maxCapacity = maxCapacity;
    this.attendees = [];
  }

  addAttendee(name, email, ticketType) {
    if (this.isFull()) {
      console.log("Conference is full. Cannot add more attendees.");
      return;
    }
    const attendee = { name, email, ticketType };
    this.attendees.push(attendee);
    console.log(`${name} registered successfully.`);
  }

  isFull() {
    return this.attendees.length >= this.maxCapacity;
  }

  listAttendees() {
    console.log("Registered Attendees:");
    this.attendees.forEach((attendee, index) => {
      console.log(
        `${index + 1}. Name: ${attendee.name}, Email: ${attendee.email}, Ticket: ${attendee.ticketType}`
      );
    });
  }

  countByTicketType(type) {
    return this.attendees.filter(
      (attendee) => attendee.ticketType === type
    ).length;
  }
}

const conference = new Conference();

conference.addAttendee("Humair", "humair@nu.com", "General");
conference.addAttendee("Rafay", "rafay@nu.com", "VIP");
conference.addAttendee("Haseeb", "haseeb@nu.com", "Speaker");


conference.listAttendees();

console.log("VIP Count:", conference.countByTicketType("VIP"));
console.log("Is Conference Full?", conference.isFull());