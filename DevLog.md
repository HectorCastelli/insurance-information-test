# DevLog

## Getting Started

I will be detailing my decisions on this DevLog, in order to make the architecture and development choices clear for whoever is reading this.

To allow me to focus on quality with as much peace of mind as possible, I will start by analyzing the assignment and choosing appropriate tooling to catch and treat common errors.

I will also use some time to research the problem-space and lay out a plan on how the API should be structured.

My approach here will be test-first, since the requirements are clear, this will allow me to focus on solving the problem rather than checking if I actually solved it.

### Authentication and Authorization

To simplify the scope of this project, authentication will be done via an endpoint that will receive an email and will return a JWT token containing the information related to authentication.

To avoid showing potential PII, data that is not relevant to the authentication will not be transmitted. Therefore this token will have the following format:

```json
{
  "id": string,
  "role": string
}
```

As far as implementation is concerned, my first idea is to use a single simple middleware that receives the allowed roles for each end-point, and fails for every other role not detailed.

### Data storage

WHen thinking about the scope of this application and what is needed to properly test it, data is a key factor. My first technical decision is to abstract the data-storage layer of the application and use the URLs provided to fetch the data.

Another option would be to move the data into a local database, however, this would mean assuming how the data will be stored, meaning, choosing between structured (SQL) or unstructured (NoSQL) databases, which isn't the point here, and most likely would be already decided if this was a real world scenario.

One of the main disadvantages to this approach would be the need to "hack" something together in order to write new data to this fake database. However, since the API only performs read operations, there is no need to add this functionality.

Therefore, in order to keep the spirit of a Middleware, a layer of glue that provides a service, I will place the data storage in a different module, that basically calls that URL then queries the data based on my input.

### Error Handling

An API needs to be easy to use, this means, that it will work flawlessly in normal conditions and will throw informative errors that developers can work with otherwise.

A problem with "informative errors" is that this means that the context of the request is important. However, for general errors like time-outs and rate-limiting, a general error message would be the best, since it would isolate the error logic from the business-errors.

### Documentation

Developers need to be able to use, modify and update software. To allow for this, documentation will need to be created in two fronts, each with a different focus:

- User-facing: Meant for the end-user and other teams to read when they need to interact with the API
- Developer-facing: Meant for developers working on this API.

In general terms, the documentation needs to be sufficient so, whatever question each group might have, will have answers. For the users, this means what endpoints are available, how to use-them and what data to expect from them. For developers, this means how the modules are spread-out, how to add functionality, how to test the API and how & why decisions were made.

### Plans for next session

My plans for the next sit-down session are:

- Setup basic express API (with no data or operations)
- Mock authentication for tests
- Mock User-related tests for Admin and User roles
- Mock Policy-related tests for Admin and User roles
- Document session and plan next-steps

## Bootstrapping

To achieve the goals listed before, I started by starting up a NPM project and added Express.js and ESLINT, using Google's default configuration for convenience.

### Basic API

Then, I started to establish the general structure of the API codebase without implementing any functionality. This way, I can write the tests and the mocks before moving into implementation.

The project is structured under two main folders: services and controllers.

The goal is to separate the business logic from the API mappings. So, in short terms, anything related to Express.js and how the HTTP request/response exchange works will be under controllers. Anything related to processing would be under services.

### Unit testing and Service Mocking

The idea is to start by writing unit tests, based on the anticipated functionality that each Service will need to serve the necessary data to the users.

This way, the methods will be implemented on each Service and the Controller methods only need to call these.

#### Authentication

I will start by testing the Authentication-related functionality, since there is not a lot of overlap with the other services. I will first write unit tests for basic JWT manipulation, then move on to write integration tests with API calls at a later time.

#### User

For users, there is not a lot of functionality, so the Unit tests will be fairly simple.
