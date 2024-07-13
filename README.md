# W_Status_App 

- This is a simple backend application that uses the OpenWeather API and updates the user by sending an email to the user every 3 hours about the weather condition.
  
Technology Stacks and used for the System 
 -  Java Script(Language)
 -  Node.js
 -  Express.js
 -  EmailJS Library 
 -  NoSQL(MongoDB)

## Set up the project 

### 1. Clone the repository:

``` bash
git clone https://github.com/ManulaGunatilleke/W_Status_App.git
```
### 2. Backend navigation:

- Go to inside restaurant-service folder

``` bash
cd W_Status_App 
```

### 3. Install dependencies for backend:

``` bash
npm init 
```
-Note -: install required libraries by using "npm i {Name of the Library}"

### 4. Backend .env file configurations:

- MONGODB_URL = (MONGODB_URL)
- EMAILJS_SERVICE_ID= (SERVICE_ID)
- EMAILJS_TEMPLATE_ID= (TEMPLATE_ID)
- EMAILJS_USER_ID= (PUBLIC_KEY)
- OPENWEATHERMAP_API_KEY= (API_KEY)

### 5. Run Backend:

- inside W_Status_App path
  
``` bash
npm run dev 
```
-Note -: Need to install nodemon library by using "npm i nodemon" and add it to the package.json
