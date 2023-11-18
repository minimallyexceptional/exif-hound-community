package exifhound

import (
	"changeme/go/core/exif"
	fileutils "changeme/go/utils/file"
	"changeme/go/utils/storage"
	"changeme/go/utils/structs"
	"database/sql"
	"encoding/json"
	"fmt"
	"os"
)

var db = storage.InitDatabase(".data/data.db")

func CacheFile(image structs.ExifFile, fpath string) string {
	var fileData = []byte(fileutils.DecodeBase64(image.ImageData))

	fileId := fileutils.UUID()
	path := fmt.Sprintf("%s%s.%s", fpath, fileId, image.Extension)

	os.Mkdir(fmt.Sprintf("%s", fpath), 0777)
	os.WriteFile(path, fileData, 0777)

	return path
}

func SaveFile(image structs.ExifFile, path string) string {
	storage.InsertImage(db, image)
	return CacheFile(image, path)
}

func ParseExif(path string) (structs.Meta, error) {
	metadata, err := exif.GetExif(path)
	if err != nil {
		fmt.Printf("Error: %v", err)
		return metadata, err
	}

	return metadata, nil

}

func ClearCache(path string) {
	os.RemoveAll(path)
}

func Parse(image structs.ExifFile, tmpPath string) (string, error) {
	savePath := SaveFile(image, tmpPath)

	metadata, err := ParseExif(savePath)
	if err != nil {
		fmt.Printf("Error: %v", err)
		return "Error", err
	}

	jsonData, err := json.Marshal(metadata)
	if err != nil {
		fmt.Printf("Error: Metadata failed while marshaling %v", err)
	}

	return string(jsonData), nil
}

func GetImage(id string) string {
	return storage.GetImage(db, id)
}

func DeleteImage(id string) *sql.Result {
	var result = storage.DeleteImage(db, id)
	fmt.Println(result)
	return &result
}
