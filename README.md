# Wanderlust

Wanderlust is a vacation-rental listing application inspired by Airbnb. Visitors can explore and search stays, open listing details with a map, and create an account to publish listings or leave reviews.

## Features

- Browse listing cards and search by listing title, location, or country.
- Register and sign in with username/password authentication.
- Create, edit, and delete listings. Only the listing owner can edit or delete it.
- Upload listing images to Cloudinary.
- View listing locations on an interactive Mapbox map; listing locations are geocoded when a listing is created.
- Add 1- to 5-star reviews and comments. Only the review author can delete their review.
- Persist login sessions in MongoDB and show success/error feedback with flash messages.
- Validate listing and review input on the server with Joi, with additional browser form validation.

## Technology

- **Server:** Node.js, Express 5
- **Views and UI:** EJS, EJS-Mate, Bootstrap 5, custom CSS and browser JavaScript
- **Database and sessions:** MongoDB, Mongoose, connect-mongo, express-session
- **Authentication:** Passport, passport-local, passport-local-mongoose
- **Uploads and maps:** Cloudinary, Multer, Mapbox GL JS, Mapbox Geocoding API
- **Validation:** Joi

## Getting Started

### Requirements

- Node.js 26.7.0 (the version declared in `package.json`)
- A MongoDB connection string (for example, a MongoDB Atlas database URL)
- A Cloudinary account for listing image uploads
- A Mapbox access token for geocoding and map display

### Setup

1. Install dependencies:

	```bash
	npm install
	```

2. Create a `.env` file in the project root and set the following values:

	```dotenv
	ATLASTDB_URL=mongodb+srv://<username>:<password>@<cluster>/<database>
	SECRET=replace-with-a-long-random-session-secret
	CLOUD_NAME=your-cloudinary-cloud-name
	CLOUD_API_KEY=your-cloudinary-api-key
	CLOUD_API_SECRET=your-cloudinary-api-secret
	MAP_TOKEN=your-mapbox-access-token
	```

	`ATLASTDB_URL` is the environment variable name currently read by the application. Restrict credentials to your own services, and do not commit `.env` or expose Cloudinary secrets. The Mapbox token is used by both the server-side geocoder and browser map, so configure an appropriate public token for browser use.

3. Start the server:

	```bash
	node app.js
	```

4. Open [http://localhost:7070](http://localhost:7070).

The app loads `.env` outside production. In production, provide the same variables through the hosting environment. The database connection is initiated when the server starts.

## Project Structure

```text
app.js                 Express setup, database/session connection, middleware, and routes
package.json           Project metadata, scripts, and dependency requirements
package-lock.json      Locked dependency versions
routes/                Listing, review, and authentication route definitions
controllers/           Request handlers and application behavior
models/                Mongoose models for listings, users, and reviews
views/                 EJS pages and shared layout/partials
middleware.js          Authentication, ownership checks, and Joi validation
cloudConfig.js         Cloudinary configuration and Multer storage adapter
public/                Stylesheets and browser-side JavaScript
init/                  Sample listing data and optional database seeding script
```

## Resume Notes

Possible project bullets to adapt to your own contribution:

- Built a full-stack vacation-rental listing platform with Express, MongoDB, Mongoose, and server-rendered EJS views.
- Implemented local authentication, persistent sessions, and owner/author authorization for listing and review operations.
- Integrated Cloudinary image uploads and Mapbox geocoding/maps to attach searchable location context to listings.
- Added server-side Joi validation, destination search, and CRUD workflows for listings and reviews.

## Current Scope

- This project does not currently include booking, payment, or reservation workflows.
- Category labels on the listings page are presentation only; the working search is by title, location, and country.
- `package.json` does not define a start script, and its test script is a placeholder rather than an automated test suite.
- `node init/index.js` seeds a local database named `wanderlust`, clears its existing listings, and assigns a hard-coded owner ID. Review `init/index.js` before using it; it is not configured for the Atlas URL above.
