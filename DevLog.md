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

#### Users & Policies

For users and policies, there is not a lot of functionality, so the Unit tests will be fairly simple. They only include test-data for each case of the search functionality.

### Goals for next session

My plans for the next sit-down session are:

- Start writing Database Service
- Implement Authentication Service and Controller
- Create authentication middleware to filter-by-role
- Add request object validation middleware (with express-validation and JOI)

## Integrating Data

I decided to get started on the Database aspect of the project as my first item on the last session. To achieve this I will start by creating the necessary methods to query the data from the two URLs.

Instead of adding another library like JSON-Query, I decided to use Array functions to filter and map the Arrays retrieved from the website into the necessary objects.

### A change of plans

I have run into a service outage from *mocky.io* (the website hosting the data), so, I've decided it would be most prudent to save that data locally in JSON objects to avoid this situation in the future.

The current data (as of *04/06/2020*) is now saved under the `data` directory.

### Implementing Authentication

Now that we have a functional Database Service, it's time to implement the first part of logic: Authentication.

Implementing this logic means basically just mapping JWT methods to more friendly names and using the methods from Database Service to find the relevant Users and then encode a JWT claim.

After some slight modifications and some changes to the testing syntax, I was able to get all the test to run successfully, meaning I am ready to move on to the next task.

### Authentication Middleware

To keep the project neat and tidy, I've created a new folder: `middleware`.

This middleware is an important step into access-control, so I will need to write some tests for it. It's functionality will be fairly simple: analyze a JWT token attached to the Authorization header on the Request and verify that its:

- Valid
- Not expired
- Has the correct role

If any of these conditions fail, the request should be rejected with the appropriate error.

### Data validation

Since the API relies on data being passed either by URL or by the Request's Body, some validation needs to be implemented.

To do this in an easy manner, I will user [express-validation](https://www.npmjs.com/package/express-validation) to add a simple middleware that uses [joi](https://github.com/hapijs/joi) to validate JSON objects.

### Validating Authentication endpoint

After the data-validation aspect was added to the Authentication controller, some integration tests needed to be added, to make sure the HTTP requests would behave as expected.

This was done with Chai-HTTP and was fairly straightforward.

### Where to go from here

Since the Authentication and Database Service are finally working, we can start validating the authentication middleware and can focus on implementing the rest of the logic. For the next session, I plan on:

- Implementing User Service & Controller (without authentication)
- Adding Authentication to User Controller
- Integration testing for User Controller (with authentication)
- Implementing Policy Service

## Implementing Logic

As mentioned before, the goal of this session is to implement the rest of the logic on the API.

To start with this, let's move to the Users Service.

### The User Service

I've decided to start on the User Service with the Service. After creating a service that can successfully search for one or more Users by Name or IDs, I was able to setup Unit tests.

One these tests were done, I started focusing on the Controllers, the functionality I had planned at first was to have two endpoints: `users/` and `users/{id}`, to search for user by name or to open users by ID. But I realized that I could incorporate Searches by IDs on the `users/` endpoint as well, allowing users to search multiple IDs and get multiple Users with a single API call.

To support this decision I went back to Controller and added some logic to treat cases where a user searches for a User by their Name **and** their ID. Before my fix, this would lead to duplicate Users being returned, and since that would be inconvenient for the API users, I decided to treat this situation before returning.

After adding more tests for these aspects, I was ready to move into the Authentication part of the User Controller.

### Adding Access-Control with Middleware

As I had expected, my Middleware was able to filter the requests based on the `Authentication` header.

After fixing a small syntax mistake (using `this` in the wrong context), I then proceeded to add test-cases on my Controller for making API calls authenticated as an Admin, a User and as a third (incorrect) role.

Now, knowing that this structure works, I am able to move into the Policy Controller with more confidence that the technical aspect works.

### Making the Policy Service work

Since the foundations and the models are almost all established from the User Controller and Service, this is mostly an adaptation.

The idea to have similar structure and functionality should increase familiarity when working with other Services in the future, so, setting a standard in this case is an advantage.

Because each policy have two fields that could be tied to users, I had to make a decision on how to interpret them.

This being the case I chose to see the field `email` and the "advisor" that is responsible, from the side of the company, for the specific policy, while `clientId` is the "client", that will be the beneficiary of the policy.

With this in mind, I decided to provide two ways to search for policies:

- Search by Client ID; or
- Search by Advisor Email.

This way, this API could be used in a versatile way to compile information for reports like: "Which clients are under my belt?" and "How many policies this client has with us?".

### Final session

For the last session of development, my hopes are:

- Verify Documentation quality and get a feel of the codebase
- Compile a developer-facing documentation page (from the JSDocs comments)
- Create a user-manual for the API
- Run the codebase against code-quality tools to spot and fix problems
- Update Github repository with Tags relevant to each session
- Update README with instructions to run and test the API

## Final Session

Before moving into other technical aspects of the API, I wanted to take a moment and review what exists here and how it interacts with the rest of the application.

### Improve Documentation Gaps (JSDocs)

My process here was to check each file and verify that my JSDocs comments were complete and meaningful. I verified my methods and completed the missing fields where appropriate.

After reading thru the code-base with some care for overall structure rather than per-file structure, I found that there were some naming problems on the Users side of things.
