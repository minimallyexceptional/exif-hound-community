package exif

import (
	fileutils "changeme/go/utils/file"
	"changeme/go/utils/structs"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/rwcarlsen/goexif/exif"
)

func GetExif(fname string) (structs.Meta, error) {
	id := fileutils.UUID()
	exifStruct := &structs.Meta{
		Id: id,
	}

	f, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	x, err := exif.Decode(f)
	if err != nil {
		log.Fatal(err)
	}

	lat, long, _ := x.LatLong()
	fmt.Println("lat, long: ", lat, ", ", long)

	name, err := fileutils.ParseFileName(fname)
	if err != nil {
		log.Fatal(err)
	}

	exifStruct.Name = name
	exifStruct.GPSLatitude = strconv.FormatFloat(lat, 'E', -1, 64)
	exifStruct.GPSLongitude = strconv.FormatFloat(long, 'E', -1, 64)

	return *exifStruct, nil
}
