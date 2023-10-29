package exifhound

import (
	fileutils "changeme/go/utils/file"
	"changeme/go/utils/storage"
	"changeme/go/utils/structs"
	"database/sql"
	"encoding/json"
	"fmt"
	"os"
)

func CacheFile(image structs.ExifFile) string {
	var fileData = []byte(fileutils.DecodeBase64(image.ImageData))

	fileId := fileutils.UUID()
	path := fmt.Sprintf(".tmp/%s.%s", fileId, image.Extension)

	os.Mkdir(".tmp/", 0777)
	os.WriteFile(path, fileData, 0777)

	exif := structs.ExifFile{
		Id:        fileId,
		Name:      image.Name,
		ImageData: image.ImageData,
		Extension: image.Extension,
	}

	jsonData, err := json.Marshal(exif)
	if err != nil {
		fmt.Println("Error:", err)
	}

	return string(jsonData)
}

func SaveFile(db *sql.DB, image structs.ExifFile) string {
	storage.InsertImage(db, image)
	return CacheFile(image)
}

func ParseExif(image structs.ExifFile) {
	CacheFile(image)
}

func ClearCache() {
	os.RemoveAll(".tmp/")
}

func Parse() {
}
