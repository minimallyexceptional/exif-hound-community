package main

import (
	"changeme/go/core/exifhound"
	fileutils "changeme/go/utils/file"
	"changeme/go/utils/storage"
	"changeme/go/utils/structs"
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

var db = storage.InitDatabase(".data/data.db")

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) SaveFile(name string, data string, ext string) string {
	image := structs.ExifFile{
		Id:        fileutils.UUID(),
		Name:      name,
		ImageData: data,
		Extension: ext,
	}

	return exifhound.SaveFile(db, image)
}

func (a *App) CleanFiles() {
	exifhound.ClearCache()
}

func (a *App) GetImage(id string) string {
	return storage.GetImage(db, id)
}

func (a *App) DeleteImage(id string) {
	var result = storage.DeleteImage(db, id)
	fmt.Println(result)
}
