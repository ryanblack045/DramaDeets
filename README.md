# DramaDeets
Drama Deets is a platform for artists to share their reviews of art related businesses/classes/instructors.

Check out the app: [Live Demo]()

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Feature List](#feature-list)
3. [MVP](#mvp)
4. [Front End Routes](#front-end-routes)
5. [Back End Routes](#back-end-routes)
6. [Redux Architechture](#redux-architecture
7. [Database Schema](#database-schema)

---

## **Technologies Used**

* React
* Redux
* Google Map API
  * [Places API](https://developers.google.com/places/web-service/overview)
* Flask

---

## **Feature List**

---

## **MVP**

1. Users

    * User registration with validations
    * Guest User for demonstration
    * Create/Edit/Delete user info
    * Create/Edit Business
    * Create/Edit/Delete Review of business (limited to one review per user)

2. Businesses

    * Will have google map location with business info displayed
    * Will display reviews/avg rating

3. Reviews

    * User can create/edit review of business
    * User must send "proof image" that they did business with the business they reviewed 

4. Likes/Dislikes

    * Users can like/dislike reviews for businesses
    
Stretch Goals
  * Have an admin account that has ability to take down reviews/businesses
  * Have a report button on reviews so admin can review if "proo" of review is real
  * Users can search for businesses

---

## **Front End Routes**

---

## **Back End Routes**
 * users
  * GET /users/:id -> get a single users info (return email)
  * POST /users => create a new user (returns userId and token)
  * POST /users/token => verifies user login and returns token for the user
  * PUT /users/:id -> edit a user's info
  * DELETE /users/:id => delete a user
* businesses
  * GET /businesses/:id => gets a single buisness (returns name, address, state, zipcode, imgurl , description)
  * GET /businesses => gets all of the buisnesses
  * GET /businesses/:type => gets all the buisnesses of a certain type
* reviews
  * GET /reviews/users/:id => gets all reviews from a single user
  * GET /buisnesses/:id/reviews => gets all reviews for a single buisness
  * POST /buisnesses/:id/reviews => create a new review for a single business
  * PUT /users/:id/reviews/:id => edit a review
  * DELETE /reviews/:id => delete a review
* Likes
  * GET /stories/:id/claps => gets all claps for a single story
  * GET /stories/:id/responses/:id/claps => gets all claps for a single response
  * POST /stories/:id/claps => adds a clap to a single story
  * POST /stories/:id/responses/:id/claps => adds a clap to a single response

---

## **Redux Architecture**

---

## **Schema**

![Database Schema]()
