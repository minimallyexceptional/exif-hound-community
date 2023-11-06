package fileutils

import (
	fileutils "changeme/go/utils/file"
	"testing"
)

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
