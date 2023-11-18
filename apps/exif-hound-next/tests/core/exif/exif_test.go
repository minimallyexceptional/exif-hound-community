package exif

import (
	"changeme/go/core/exif"
	"testing"
)

func TestGetExif(t *testing.T) {
	exifData, err := exif.GetExif("../../../tests/images/test.jpg")
	if err != nil {
		t.Error("Test Failed! Failed to get exif data!")
		t.Fail()
	}
	if exifData.Id != "" {
		t.Log("Test Passed! New metadata object created!")
	} else if exifData.GPSLatitude != "" {
		t.Log("Test Passed! New metadata object created!")
	} else if exifData.GPSLongitude != "" {
		t.Log("Test Passed! New metadata object created!")
	}

}
