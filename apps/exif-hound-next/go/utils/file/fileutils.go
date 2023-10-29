package fileutils

import (
	"encoding/base64"

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
