package storage

import (
	"changeme/go/utils/structs"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

func InitDatabase(dbPath string) *sql.DB {
	os.Mkdir(".data/", 0777)
	// Open a connection to the SQLite database file

	db, err := sql.Open("sqlite3", dbPath)

	if err != nil {
		log.Fatal(err)
	}
	// defer db.Close()

	// Create the images table
	createTable := `
		CREATE TABLE IF NOT EXISTS images (
			id INTERGER NOT NULL PRIMARY KEY,
			name TEXT NOT NULL,
			data TEXT NOT NULL,
			extension TEXT NOT NULL 
		);
	`

	imageTable, _ := db.Prepare(createTable)
	imageTable.Exec()

	createImage, _ := db.Prepare(`
	 INSERT INTO images (id, name, data, extension) VALUES (?, ?, ?, ?)
	`)

	createImage.Exec("123DD123DS-312DDSD0-SAD232DW-DAS21DSQ", "Test Image", "00100102001002", "png")

	fmt.Println("Database and table created successfully!")

	return db
}

func InsertImage(db *sql.DB, image structs.ExifFile) error {
	println("CREATING IMAGE IN DB ", image.Id)

	createImage, _ := db.Prepare(`
	 INSERT INTO images (id, name, data, extension) VALUES (?, ?, ?, ?)
	`)

	_, err := createImage.Exec(image.Id, image.Name, image.ImageData, image.Extension)
	if err != nil {
		println(err)
		return err
	}

	return nil
}

func GetImage(db *sql.DB, ImageID string) string {
	rows, _ := db.Query(`SELECT ? FROM images`, ImageID)

	var id string
	var name string

	for rows.Next() {
		rows.Scan(&id, &name)
		fmt.Println(id + ": " + name)
	}

	type Image struct {
		Id   string
		Name string
	}

	foundImage := Image{
		Id:   id,
		Name: name,
	}

	jsonData, err := json.Marshal(foundImage)
	if err != nil {
		fmt.Println("Error:", err)
	}

	return string(jsonData)
}

func DeleteImage(db *sql.DB, ImageID string) sql.Result {
	var statement = `DELETE FROM images WHERE Id = ?`
	deleteResponse, err := db.Exec(statement, ImageID)
	if err != nil {
		fmt.Println("Error:", err)
	}

	return deleteResponse
}
