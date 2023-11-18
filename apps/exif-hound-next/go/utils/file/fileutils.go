package fileutils

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"strings"

	"github.com/google/uuid"
)

func DecodeBase64(message string) (retour string) {
	base64Text := make([]byte, base64.StdEncoding.DecodedLen(len(message)))
	base64.StdEncoding.Decode(base64Text, []byte(message))
	str := regexp.MustCompile("\x00").ReplaceAllString(string(base64Text), "")
	return str
}

func EncodeBase64Image(bytes []byte) string {
	var base64Encoding string

	mimeType := http.DetectContentType(bytes)

	switch mimeType {
	case "image/jpeg":
		base64Encoding += "data:image/jpeg;base64,"
	case "image/png":
		base64Encoding += "data:image/png;base64,"
	}

	base64Encoding += base64.StdEncoding.EncodeToString(bytes)

	return base64Encoding
}

func UUID() string {
	u := uuid.New()
	return u.String()
}

func ParseFileName(fpath string) (string, error) {
	stringParts := strings.Split(fpath, "/")
	var fileName string

	for i := 0; i < len(stringParts); i++ {
		if strings.Contains(stringParts[i], ".jpg") {
			name := strings.Split(stringParts[i], "")[0]
			fileName = name
		} else if strings.Contains(stringParts[i], ".png") {
			name := strings.Split(stringParts[i], "")[0]
			fileName = name
		}
	}

	if fileName != "" {
		return fileName, nil
	} else {
		return "", fmt.Errorf("Error: Pleas pass ParseFileName a proper file path to parse!")
	}
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
