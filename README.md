# Sports Day Events Registration App

A ReactJS web application to help users register for events in the Sports Day. This application uses mock data to simulate fetching events and provides a user interface for selecting and deselecting events.

## Features

- Display a list of events in a card tile format.
- Each card tile displays the name, category, and timings of the event.
- Users can select events from the list.
- A separate list displays all the selected events.
- Users can deselect events from the selected list.
- Constraints:
  - Users can select a maximum of 3 events.
  - Users cannot select events with conflicting timings.

## Technologies Used

- UI : React.js
- State Management : Context with Reducers
- Toast : React Hot Toast
- Testing : React Testing Library
- Deployment : Netlify

## Getting Started

### Prerequisites

Make sure you have Node.js and Yarn installed on your machine.

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
    ```
   git clone https://github.com/pankajdagar/sports-day-events.git
   cd sports-day-events
2. Install the dependencies:
    ```
    yarn install


# Available Scripts
    

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

