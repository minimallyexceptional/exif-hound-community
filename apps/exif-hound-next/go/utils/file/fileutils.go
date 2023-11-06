package fileutils

import (
	"encoding/base64"
	"encoding/json"
	"fmt"

	"github.com/google/uuid"
)

func DecodeBase64(message string) (retour string) {
	base64Text := make([]byte, base64.StdEncoding.DecodedLen(len(message)))
	base64.StdEncoding.Decode(base64Text, []byte(message))
	return string(base64Text)
}

func UUID() string {
	u := uuid.New()
	return u.String()
}

func MarshalJSON(s any) (string, error) {
	if s == nil {
		return "error",
			fmt.Errorf("%v was passed to MarshalJSON but was not Marshal-able, please pass a struct!", s)
	}

	jsonData, err := json.Marshal(s)
	if err != nil {
		return "error",
			fmt.Errorf("%v was passed to MarshalJSON but was not Marshal-able, please pass a struct!", s)
	}

	return string(jsonData), nil

}

func UnMarshalJSON(j string) (any, error) {

	var pointer any

	data := []byte(
		j,
	)

	err := json.Unmarshal(data, &pointer)
	if err != nil {
		return "error",
			fmt.Errorf("Test Failed! %v was unable to be UhMarshaled! Please pass a proper JSON string!", j)
	}

	return pointer, err
}
