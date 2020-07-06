# Insurance Information API

## Introduction

This API externalizes functionality related to Insurance information regarding Clients and Policies.

## Overview

This API was developed as a showcase/test, so its surface area is extremely limited.

## Error Codes

| Error Code | Meaning                                     | What should you do?                                                                    |
| :--------- | :------------------------------------------ | :------------------------------------------------------------------------------------- |
| 400        | Your request is not in the expected format. | Check the error message for details on how your request has failed the format check.   |
| 401        | Your request is not Authenticated.          | Make sure you are [using your identity](#using-your-identity) properly.                |
| 403        | You do not have the required access level.  | This means your account is not cleared for the information you are trying to retrieve. |
| 404        | Resource Missing or Search has no results.  |                                                                                        |
| 500        | Something else went wrong!                  | File a Bug!                                                                            |

## Authentication

All endpoints require authentication.

Access-control is enforced before any data-exchange.

### Authenticating yourself

To request for a token for yourself, perform a request to the `/authenticate` endpoint with the appropriate data.

| Method | Path             | Request Body          | Response  |
| :----- | :--------------- | :-------------------- | :-------- |
| POST   | /authentication/ | `{ email: <string> }` | `<token>` |

### Using your identity

To call other endpoint, you have to attach the `token` acquired on the previous step on the `Authentication` header in the following format:

`Authentication: <token>`

## Clients

Users and Admins both have access to query the Clients API endpoint.

This endpoint provides two main functionalities:

- Access a specific Client
- Search for clients based on IDs or Names

### Endpoints

| Method | Path           | Request Body                                      | Response                                              |
| :----- | :------------- | :------------------------------------------------ | :---------------------------------------------------- |
| GET    | /clients/{id}/ |                                                   | [Client Resource](#client-resource)                   |
| GET    | /clients/      | [Client Search Resource](#client-search-resource) | `{clients:[<`[Client Resource](#client-resource)`>]}` |

### Client Resource

The Client Resource has the following format:

```json
{
  "id": "<string>",
  "name": "<string>",
  "email": "<string>",
  "role": "<string>",
}
```

| Field | Format                                                   |
| :---- | :------------------------------------------------------- |
| id    | A string. IDs have unique identifier in the UUID format. |
| name  | A string.                                                |
| email | A string.                                                |
| role  | A string. Either "user" or "admin"                       |

### Client Search Resource

The Client Search Resource specifies which list of `ids` or `names` should be matched (meaning that for a Client to be returned, its `id` **or** its `name` need to be included in this list). It has the following format:

```json
{
  "ids": ["<string>"],
  "names": ["<string>"],
}
```

| Field | Format                                                                                                         |
| :---- | :------------------------------------------------------------------------------------------------------------- |
| ids   | An Array of strings. These IDs will be matched against [Client Resource](#client-resource) `id` attribute.     |
| names | An Array of strings. These names will be matched against [Client Resource](#client-resource) `name` attribute. |

## Policies

Only Admins have access to query the Policies API endpoint.

This endpoint provides two main functionalities:

- Access a specific Policy
- Search for policies based on the Client's ID or Advisor's Email

### Endpoints

| Method | Path            | Request Body                                      | Response                                               |
| :----- | :-------------- | :------------------------------------------------ | :----------------------------------------------------- |
| GET    | /policies/{id}/ |                                                   | [Policy Resource](#policy-resource)                    |
| GET    | /policies/      | [Policy Search Resource](#policy-search-resource) | `{policies:[<`[Policy Resource](#policy-resource)`>]}` |

### Policy Resource

The Policy Resource has the following format:

```json
{
  "id": "<string>",
  "amountInsured": "<float>",
  "email": "<string>",
  "inceptionDate": "<string>",
  "installmentPayment": "<boolean>",
  "clientId": "<string>",
}
```

| Field              | Format                                                                                                                  |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------- |
| id                 | A string. IDs have unique identifier in the UUID format.                                                                |
| amountInsured      | A float.                                                                                                                |
| email              | A string. This matches the `email` field from a [Client](#clients) and represents the Advisor in charge of this Policy. |
| inceptionDate      | A string representation of a Date.                                                                                      |
| installmentPayment | A boolean.                                                                                                              |
| clientId           | A string. This matches the `id` field from a [Client](#clients) and represents the Client protected by this Policy.     |

### Policy Search Resource

The Policy Search Resource specifies which list of `clients` or `advisors` should be matched (meaning that for a Policy to be returned, its `clientId` **or** its `email` need to be included in this list). It has the following format:

```json
{
  "clients": ["<string>"],
  "advisors": ["<string>"],
}
```

| Field    | Format                                                                                                           |
| :------- | :--------------------------------------------------------------------------------------------------------------- |
| clients  | An Array of strings. These IDs will be matched against [Policy Resource](#policy-resource) `clientId` attribute. |
| advisors | An Array of strings. These names will be matched against [Policy Resource](#policy-resource) `email` attribute.  |
