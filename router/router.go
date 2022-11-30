package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/rafael-vera/contact-web-application/handlers"
)

func SetUpRoutes(app *fiber.App) {
	api := app.Group("/api", logger.New())

	contacts := api.Group("/contacts")
	contacts.Get("/", handlers.GetContacts)
	contacts.Post("/", handlers.CreateContact)
	contacts.Put("/", handlers.UpdateContact)
	contacts.Delete("/:id", handlers.DeleteContact)
}
