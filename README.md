# Dockerisation of a Web Application Built on MERN Stack (DASS Assignment - 2)

## Assignment - 2 documentation
## Running the code

```
docker-compose up
```

If there aren't enough permission you may need to use `sudo`

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

<details>
<summary>Assignment - 1 documentation</summary>

### Running the code

* Run Mongo daemon:
```
sudo mongod
```
Mongo will be running on port 27017.


* Run Express Backend:
```
cd backend/
npm install
npm start
```

* Run React Frontend:
```
cd frontend
npm install
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

### Additional Packages used

- `@emailjs/browser` to send emails on acceting/rejecting an order.
- `sweetalert2` to beautify alert boxes.
- `validator` to validate entered e-mails.

All other packages used are same as the ones used in the boilerplate code

### Assumptions made

- In Statistics page we show the no.of orders placed, rejected and active, in that an order counts as only 1 even when the buyer orders 3 items of the same kind in a single order.

### Bonus tasks implemented

- This website is deployed on Heroku at [https://intense-lake-23403.herokuapp.com](https://intense-lake-23403.herokuapp.com)
- An email will be sent to the buyer when his/her order is accepted/rejected.
</details>
