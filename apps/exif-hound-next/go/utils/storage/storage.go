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
		defer db.Close()

	}

	// Create the images table
	createImageTable := `
		CREATE TABLE IF NOT EXISTS images (
			id INTERGER NOT NULL PRIMARY KEY,
			name TEXT NOT NULL,
			data TEXT NOT NULL,
			extension TEXT NOT NULL
		);
	`

	imageTable, imageErr := db.Prepare(createImageTable)
	if imageErr != nil {
		println(imageErr)
	}

	imageTable.Exec()

	createExifTable := `
		CREATE TABLE IF NOT EXISTS exifdata (
			id INTERGER NOT NULL PRIMARY KEY,
			latitude TEXT NOT NULL,
			longitude TEXT NOT NULL
		);
	`

	exifTable, exifErr := db.Prepare(createExifTable)
	if exifErr != nil {
		println(exifErr)
	}

	exifTable.Exec()

	return db
}

// CREATE
func InsertImage(db *sql.DB, image structs.ExifFile) error {
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

func InsertExif(db *sql.DB, image structs.Meta) error {
	createMeta, _ := db.Prepare(`
	INSERT INTO images (id, latitude, longitude) VALUES (?, ?, ?)
   `)

	_, err := createMeta.Exec(image.Id, image.GPSLatitude, image.GPSLongitude)
	if err != nil {
		println(err)
		return err
	}

	return nil
}

// READ
func GetImage(db *sql.DB, ImageID string) string {
	rows, _ := db.Query(`SELECT ? FROM images`, ImageID)

	var id string
	var name string
	var data string
	var ext string

	for rows.Next() {
		rows.Scan(&id, &name, &data, &ext)
		fmt.Println(id + ": " + name)
	}

	foundImage := structs.ExifFile{
		Id:        id,
		Name:      name,
		ImageData: data,
		Extension: ext,
	}

	jsonData, err := json.Marshal(foundImage)
	if err != nil {
		fmt.Println("Error:", err)
	}

	return string(jsonData)
}

// DELETE
func DeleteImage(db *sql.DB, ImageID string) sql.Result {
	var statement = `DELETE FROM images WHERE Id = ?`
	deleteResponse, err := db.Exec(statement, ImageID)
	if err != nil {
		fmt.Println("Error:", err)
	}

	return deleteResponse
}
