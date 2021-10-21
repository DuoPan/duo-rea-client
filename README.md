# duo-rea-client
Front end project of the UI code challenge.

Based on Create-react-app

### How to Run
```npm install```

```npm start```

Remember to start the server.

### Run unit test
```npm test```

### Project Structure
In the 'src' folder:

* components folder: Some basic components that can be shared by multiply pages. Also there test cases.
* constant folder: Put const values here.
* HomePage folder: The container component for the page. Retrieve data and handle business logic.

### Others
* Display loading icon when the network is slow.
* Display error information when the server is not available.
* Display a placeholder when nothing is in the 'saved properties' column.
* Display different snackbars after adding and removing actions.
* One property can only add once unless removed.
* Suit to the moble view.
* Refresh the page will not lose data and provide a 'reset' button.
* Use PropTypes and shape.
* Learn and use Material UI 5.0.4, and its new 'styled' component.
* Basic unit tests.