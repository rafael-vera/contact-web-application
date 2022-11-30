package database

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/rafael-vera/contact-web-application/config"
)

var DB *sql.DB

func ConnectDB() {
	cfg := config.Database("", "")
	var err error

	DB, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	pingErr := DB.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected to the database!")
}
