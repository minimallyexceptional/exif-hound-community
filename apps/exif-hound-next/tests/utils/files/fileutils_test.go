package fileutils

import (
	fileutils "changeme/go/utils/file"
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
