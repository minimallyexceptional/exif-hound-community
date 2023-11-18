package structs

type ExifFile struct {
	Id        string `json:"id"`
	Name      string `json:"name"`
	ImageData string `json:"image_data"`
	Extension string `json:"extension"`
}

type Meta struct {
	Id           string `json:"id"`
	Name         string `json:"name"`
	GPSLatitude  string `json:"latitude"`
	GPSLongitude string `json:"longitude"`
}

type ExifMetadata struct {
	Id string `json:"id"`

	// Image Data
	ImageElement string `json:"image_element"`
	ImageData    string `json:"image_data"`

	// Thumbnail Data
	Thumbnail     string `json:"thumbnail"`
	ThumbnailData string `json:"thumbnail_data"`

	// Datetime Data
	DateTime string `json:"date_time"`

	// GPS Data
	GPSLatitude  string `json:"latitude"`
	GPSLongitude string `json:"longitude"`

	// Camera Data
	Make     string `json:"make"`
	Model    string `json:"model"`
	Software string `json:"software"`
}
