FROM openjdk:23-jdk-slim

# Install curl
RUN apt-get update && apt-get install -y curl

WORKDIR /app

# Download the JAR file from GitHub Releases
RUN curl -L -o ecommerce.jar https://github.com/SukyH/Automative-Ecommerce/releases/download/v1.0/Ecommerce-0.0.1-SNAPSHOT.jar

EXPOSE 8080

CMD ["java", "-jar", "ecommerce.jar"]
