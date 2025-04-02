Automotive E-Commerce Project

This is a web-based e-commerce platform designed for an electric vehicle retail company. The application allows customers to browse and purchase electric vehicles, while administrators can manage inventory, run reports, and monitor application usage. The platform is developed with a multi-tier architecture, ensuring clear separation between the frontend and backend.
Project Overview

The project aims to create an online store that specializes in electric vehicles, both new and used. Key features include vehicle browsing, shopping cart functionality, checkout process, and user reviews. Administrators can generate sales and usage reports. The platform also supports customer registration, login, and the ability to interact with a chatbot for assistance.
Tech Stack

    Frontend: React.js

        React.js is used to create a dynamic and responsive single-page application (SPA).

        Utilizes components for the vehicle catalog, shopping cart, checkout process, and customer account management.

    Backend: Spring Boot (Java)

        The backend is developed using Spring Boot to manage the application's business logic.

        REST APIs serve as the bridge between the frontend and backend.

        Data persistence is handled through a MySQL database hosted on AWS RDS.

    Database: MySQL

       Railway is used to host the relational database for storing information such as vehicles, customers, orders, and address details.

    Chatbot : Dialogflow (for customer support and assistance)

    Data Persistence: AWS S3

        AWS S3 is utilized to store vehicle images for each electric vehicle listing.

    Deployment:

        Frontend: AWS Amplify for frontend hosting.

        Backend: Render for backend deployment using Docker.

        Database: Railway (for MySQL database).

        Image Storage: AWS S3 (for storing vehicle images).

        Chatbot: Dialogflow 

Features

    For Customers:
        User login and registration

        Browse the catalog of vehicles 

        Sort and filter vehicle listings by brand, model, price, mileage, and history.

        View detailed vehicle information, including vehicle history and images.

        Add/remove vehicles from the shopping cart and proceed to checkout.

        Use the loan calculator to estimate monthly payments.

        Write reviews and rate vehicles with a 5-star system.

        Wishlist feature to save favorite vehicle.

        Register and log in for account management.

        Chatbot for support and navigation assistance.
        
        Checkout process with credit card payment.

        

    For Administrators:

        View and manage the vehicle catalog.

        Run reports on vehicle sales and website usage.

        Manage user accounts and orders.

        Generate sales reports and monitor application usage.



How to run the project locally:

Steps

    Clone the repository:

git clone https://github.com/your-username/automotive-ecommerce.git
cd automotive-ecommerce


    Spring Boot Backend:

        Navigate to the backend directory.

        Build and run the application using the following command:

    ./mvnw spring-boot:run

    The backend will run locally on port 8080. (make sure all environmental variables are set)


  

  Set up MySQL Database:

      Set up MySQL and import the schema (located in database/schema.sql) to your MySQL database.

      Update the backend configuration (application.properties) with your database connection details.
    
Required Environment Variables:

Ensure the following environment variables are set for the project to run correctly:

    For Spring Boot Backend:

        SPRING_DATASOURCE_URL: The URL for your MySQL database (e.g., jdbc:mysql://localhost:3306/automotive_ecommerce).

        SPRING_DATASOURCE_USERNAME: The username to connect to your MySQL database.

        SPRING_DATASOURCE_PASSWORD: The password to connect to your MySQL database.

        JWT_SECRET_KEY: The secret key used for generating JWT tokens.

         For AWS S3 :

        AWS_ACCESS_KEY_ID: Your AWS Access Key ID.

        AWS_SECRET_ACCESS_KEY: Your AWS Secret Access Key.

        AWS_REGION: The AWS region where your S3 bucket is located (e.g., us-east-1).

        AWS_S3_BUCKET_NAME: The name of your S3 bucket.


    You can set these variables in your application.properties or in a .env file for convenience.


React Frontend:

    Navigate to the frontend directory.

    Install the necessary dependencies:

npm install

Start the development server:

        npm start

        The frontend will be available on http://localhost:3000.
        Make sure to update backend_url to where your backend is running locally (e.g., http://localhost:8080).

Ensure both services are running locally to test the full application.


Security and Performance
For securing user authentication, we use JWT (JSON Web Tokens) for stateless authentication and session management.
The backend utilizes bcrypt for hashing and securely storing passwords. To prevent unauthorized access and ensure security across different origins, CSRF protection is enabled in the backend, and CORS (Cross-Origin Resource Sharing) is configured to allow only specific domains to interact with the API.
These configurations ensure both security and performance optimization across different services in the application.


Future Improvements

    Add user authentication and authorization (e.g., JWT).

    Expand the analytics component for deeper insights into user behavior.

    Implement a more advanced loan calculator with dynamic interest rates.

    Add vehicle search functionality using advanced filters.

Online Deployment Links:
The application is deployed in the cloud. Visit the live application here: https://dev.d3alkj1qcancnl.amplifyapp.com/
This is the backend server hosted online https://automative-ecommerce-bus4.onrender.com/

Hosting Information:

The backend is hosted on Render's free-tier hosting, so the first request after deployment might take up to two minutes to "wake up" as the container spins up. Please be patient during the initial request.
