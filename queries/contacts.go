package queries

import (
	"github.com/rafael-vera/contact-web-application/database"
	"github.com/rafael-vera/contact-web-application/entities"
)

func GetContacts() (*entities.Contacts, error) {
	db := database.DB
	rows, err := db.Query("SELECT * FROM contact")
	if err != nil {
		return nil, err
	}
	contacts := entities.Contacts{}
	for rows.Next() {
		var id int
		var name string
		var phone string
		var email string
		if err := rows.Scan(&id, &name, &phone, &email); err != nil {
			return nil, err
		}
		contacts.Contacts = append(contacts.Contacts, entities.Contact{
			ID:    id,
			Name:  name,
			Phone: phone,
			Email: email,
		})
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return &contacts, nil
}

func CreateContact(contact *entities.CreateContact) (int64, error) {
	db := database.DB
	result, err := db.Exec(
		"INSERT INTO contact (contact_name, contact_phone, contact_email) VALUES (?, ?, ?)",
		contact.Name,
		contact.Phone,
		contact.Email,
	)
	if err != nil {
		return -1, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return -1, err
	}
	return id, nil
}

func UpdateContact(contact *entities.Contact) error {
	db := database.DB
	_, err := db.Exec(
		"UPDATE contact SET contact_name = ?, contact_phone = ?, contact_email = ? WHERE id_contact = ?",
		contact.Name,
		contact.Phone,
		contact.Email,
		contact.ID,
	)
	if err != nil {
		return err
	}
	return nil
}

func DeleteContact(id int) error {
	db := database.DB
	_, err := db.Exec(
		"DELETE FROM contact WHERE id_contact = ?",
		id,
	)
	if err != nil {
		return err
	}
	return nil
}
