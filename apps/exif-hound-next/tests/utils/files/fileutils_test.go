package fileutils

import (
	fileutils "changeme/go/utils/file"
	"log"
	"os"
	"strings"
	"testing"
)

func TestUUID(t *testing.T) {
	var uuid = fileutils.UUID()

	if uuid != "" {
		t.Logf("Test Passsed! Generated a UUID!")
	} else {
		t.Error("Test Failed! UUID generated an empty string!")
		t.Fail()
	}
}

func TestDecodeBase64(t *testing.T) {
	b64String := "SGVsbG8gV29ybGQ="
	result := "Hello World"

	decodedString := fileutils.DecodeBase64(b64String)

	if decodedString == result {
		t.Logf("Test Passsed! Decoded string matches expected!")
	} else {
		t.Error("Test Failed! Decoded string did not match expected!")
		t.Fail()
	}
}

func TestEncodeBase64Image(t *testing.T) {
	jpgExpect := "data:image/jpeg;base64,"

	bytes, err := os.ReadFile("../../../tests/images/test.jpg")
	if err != nil {
		log.Fatal(err)
	}

	b64Result := fileutils.EncodeBase64Image(bytes)

	if b64Result != "" {
		t.Log("Test Passed! Image was encoded with base64!")
	}
	if strings.Contains(b64Result, jpgExpect) {
		t.Log("Test Passed! Image was encoded with base64!")
	} else {
		t.Log("Test Failed! Image was not enconded with base64!")
		t.Fail()
	}

}

func TestParseFileName(t *testing.T) {
	path := "../../../.tmp/test.jpg"

	result, err := fileutils.ParseFileName(path)
	if err != nil {
		t.Logf("Test Failed! Failed to parse file name!")
		t.Fail()
	}

	if result == "test" {
		t.Log("Test Passed! Parsed file name correctly!")
	}
}

func TestMarshalJSON(t *testing.T) {
	type Test struct {
		Value string
	}

	TestStruct := Test{
		Value: "Test",
	}

	json, err := fileutils.MarshalJSON(TestStruct)
	if err != nil {
		t.Errorf("Test Failed! %v", err)
		t.Fail()
	}

	if json != "" {
		t.Logf("Test Passsed! MarshalJSON was able to turn the struct into JSON! %v", json)
	}

}

func TestUnMarshalJSON(t *testing.T) {
	type Test struct {
		Value string
	}

	TestJson := `
		{ "Value": "Test" }
	`

	pointer, err := fileutils.UnMarshalJSON(TestJson)
	if err != nil {
		t.Errorf("Test Failed! %v", err)
		t.Fail()
	}

	if pointer != nil {
		t.Logf("Test Passsed! UnMarshalJSON was able to turn the JSON back into a Pointer! %v", pointer)
	}

}
