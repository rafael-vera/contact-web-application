package config

import (
	"os"

	"github.com/go-sql-driver/mysql"
)

func Database(userEnvName, passwdEnvName string) mysql.Config {
	var user, password string

	if userEnvName != "" {
		user = os.Getenv(userEnvName)
	} else {
		user = "root" // Default user
	}

	if passwdEnvName != "" {
		password = os.Getenv(passwdEnvName)
	} else {
		password = "" // Default password
	}

	return mysql.Config{
		User:                 user,
		Passwd:               password,
		Net:                  "tcp",
		Addr:                 "127.0.0.1:3306",
		DBName:               "contacts",
		Collation:            "utf8_general_ci",
		AllowNativePasswords: true,
	}
}
