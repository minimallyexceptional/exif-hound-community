export default class DetailsViewController {
    formatDetailsArray (exifImage) {
        return [
            ['EXIF', [
                ['ExifVersion', exifImage.ExifVersion],
                ['ExifIFDPointer', exifImage.ExifIFDPointer]
            ]],
            ['Image Details', [
                ['Software', exifImage.Software]
                ['Image Description', exifImage.ImageDescription],
                ['Pixel X Dimension', exifImage.PixelXDimension],
                ['Pixel Y Dimension', exifImage.PixelYDimension],
                ['X Resolution', exifImage.XResolution],
                ['Y Resolution', exifImage.YResolution],
                ['Resolution Unit', exifImage.ResolutionUnit],
                ['Orientation', exifImage.Orientation],
            ]],
            ["Camera Settings", [
                ['Make', exifImage.Make],
                ['Model', exifImage.Model],
                ['FNumber', exifImage.FNumber],
                ['MaxApertureValue', exifImage.MaxApertureValue],
                ['Focal Length', exifImage.FocalLength],
                ['Focal Length In 35mm Film', exifImage.FocalLengthIn35mmFilm],
                ['WhiteBalance', exifImage.WhiteBalance],
                ['Contrast', exifImage.Contrast],
                ['Light Source', exifImage.LightSource],
                ['Flash', exifImage.Flash],
                ['Flashpix Version', exifImage.FlashpixVersion],
                ['Gain Control', exifImage.FlashpixVersion],
                ['ISO Speed Ratings', exifImage.GainControl],
            ]],
            ["Exposure", [
                ['ExposureBias', exifImage.ExposureBias],
                ['ExposureMode', exifImage.ExposureMode],
                ['ExposureProgram', exifImage.ExposureProgram],
                ['ExposureTime', exifImage.ExposureTime],
                ['ExposureBias', exifImage.ExposureBias],
                ['ExposureMode', exifImage.ExposureMode],
                ['ExposureProgram', exifImage.ExposureProgram],
            ]],
            ['Time and Date', [
                ['Date Time Original', exifImage.DateTimeOriginal],
                ['Date Time', exifImage.DateTime],
                ['Date Time Digitized', exifImage.DateTimeDigitized],
            ]],
            ['GPS', [
                ['GPSLongitude', exifImage.GPSLatitude],
                ['GPSLatitude', exifImage.GPSLongitude],
                ['GPSDateStamp', exifImage.GPSDateStamp],
                ['GPSMapDatum', exifImage.GPSMapDatum],
                ['GPSSatellites', exifImage.GPSSatellites]
            ]],
            ['Misc', [
                ['Custom Rendered', exifImage.CustomRendered],
                ['Metering Mode', exifImage.MeteringMode],
                ['Scene Capture Type', exifImage.SceneCaptureType],
                ['Scene Type', exifImage.SceneType],
                ['File Source', exifImage.FileSource],
                ['ComponentsConfiguration', exifImage.ComponentsConfiguration],
                ['YCbCrPositioning', exifImage.YCbCrPositioning],
            ]]
        ];
    }
}
