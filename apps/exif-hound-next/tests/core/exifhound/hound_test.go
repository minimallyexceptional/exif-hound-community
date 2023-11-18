package hound

import (
	"changeme/go/core/exifhound"
	fileutils "changeme/go/utils/file"
	"changeme/go/utils/structs"
	"log"
	"os"
	"testing"
)

func TestParseExif(t *testing.T) {

	exifData, err := exifhound.ParseExif("../../../tests/images/test.jpg")
	if err != nil {
		t.Error("Test Failed! Failed to get exif data!")
		t.Fail()
	}

	if exifData.Name == "test" {
		t.Log("Test Passed! New metadata object created!")
	}

}

func TestParse(t *testing.T) {

	bytes, err := os.ReadFile("../../../tests/images/test.jpg")
	if err != nil {
		log.Fatal(err)
	}

	b64Result := fileutils.EncodeBase64Image(bytes)

	newStruct := structs.ExifFile{
		Id:        fileutils.UUID(),
		Name:      "test",
		ImageData: b64Result,
		Extension: "jpg",
	}

	exifData, err := exifhound.Parse(newStruct, "./.tmp/")
	if err != nil {
		t.Error("Test Failed! Failed to get exif data!")
		t.Fail()
	}
	if exifData != "" {
		t.Log("Test Passed! New metadata object created!")
	}

}
