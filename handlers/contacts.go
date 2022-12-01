package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rafael-vera/contact-web-application/entities"
	"github.com/rafael-vera/contact-web-application/queries"
)

func GetContacts(c *fiber.Ctx) error {
	contacts, err := queries.GetContacts()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "Error",
			"message": "Ocurrió un error mientras se obtenian los contactos",
			"data":    nil,
		})
	}
	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{
		"status":  "Success",
		"message": "Se recuperó la lista de contactos",
		"data":    contacts,
	})
}

func CreateContact(c *fiber.Ctx) error {
	var newContact *entities.CreateContact
	if err := c.BodyParser(&newContact); err != nil {
		return c.SendStatus(fiber.StatusUnauthorized)
	}
	id, err := queries.CreateContact(newContact)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "Error",
			"message": "Ocurrió un error creando el contacto",
			"data":    nil,
		})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"status":  "Success",
		"message": "Se creó el contacto",
		"data":    id,
	})
}

func UpdateContact(c *fiber.Ctx) error {
	var contact *entities.Contact
	if err := c.BodyParser(&contact); err != nil {
		return c.SendStatus(fiber.StatusUnauthorized)
	}
	err := queries.UpdateContact(contact)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "Error",
			"message": "Ocurrió un error modificando el contacto",
			"data":    nil,
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "Success",
		"message": "Se modificó el contacto",
		"data":    nil,
	})
}

func DeleteContact(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.SendStatus(fiber.StatusUnauthorized)
	}
	err = queries.DeleteContact(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "Error",
			"message": "Ocurrió un error eliminando el contacto",
			"data":    nil,
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "Success",
		"message": "Se eliminó el contacto",
		"data":    nil,
	})
}
