package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/rafael-vera/contact-web-application/database"
	"github.com/rafael-vera/contact-web-application/router"
)

func main() {
	app := fiber.New()

	database.ConnectDB()

	app.Static("/", "public/")
	router.SetUpRoutes(app)

	log.Fatal(app.Listen(":80"))
	defer database.DB.Close()
}
