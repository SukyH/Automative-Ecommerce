# Use an official OpenJDK runtime as a parent image
FROM openjdk:21-jdk-slim

# Set the working directory to /app
WORKDIR /app

# Download the JAR file from GitHub Releases
RUN curl -L -o ecommerce.jar https://github.com/SukyH/Automative-Ecommerce/releases/download/v1.0/Ecommerce-0.0.1-SNAPSHOT.jar

# Expose the port the app runs on (adjust if necessary)
EXPOSE 8080

# Run the JAR file
CMD ["java", "-jar", "ecommerce.jar"]
