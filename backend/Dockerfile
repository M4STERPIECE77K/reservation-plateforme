FROM gradle:9.2.1-jdk21-alpine AS builder
WORKDIR /app

COPY build.gradle settings.gradle ./
COPY gradle gradle
COPY src ./src

RUN gradle --version
RUN gradle bootJar -x test --no-daemon

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=builder /app/build/libs/backend.jar app.jar

EXPOSE 8089
ENTRYPOINT ["java", "-jar", "app.jar"]
