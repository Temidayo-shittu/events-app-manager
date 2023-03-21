# Events Management App Schema Design

## User Story

As an event organizer, I want to create and manage events through a web platform. I should be able to:

Register and log in to the platform (I should get a welcome mail when I register).
Create new events with details such as name, date, location, description.
Manage attendees by adding, editing and removing attendees from the event (attendees should get a mail when they are added to or removed from an event).
Generate reports for each event with information about attendee count etc.

## Requirements Analysis

### Entities:

-   Organiser: An organiser should have a name, email and a password.
-   Events: Events should be created with a registered organiser and it contains name,date,location and description of event.
-   Attendee: An attendee has a unique identifier, full-name, email, cityLocation, eventId and eventName.
-   Report: This should contain attendeecount for each event.




## API Endpoints

```
-   GET /events - Get a list of all events available to attend.
-   POST /organisers - To register/create an organiser.
-   POST /login - To verify/login an organiser.
-   POST /attendees - To create attendees for various events.
-   GET /attendees - To get all attendees for various events.
-   GET /events/reports - To get reports of an event with attendee count.

```
