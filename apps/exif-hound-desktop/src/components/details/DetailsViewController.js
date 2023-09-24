export default class DetailsViewController {
    formatDetailsArray (exifImage) {
        return [
            ['Camera', [
                ['Make', exifImage.Make],
                ['Model', exifImage.Model],
                ['Software', exifImage.Software]
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
            ['META', [
                ['ExifVersion', exifImage.ExifVersion],
                ['ExifIFDPointer', exifImage.ExifIFDPointer]
            ]],
            ['Image Settings', [
                ["Image Description", exifImage.ImageDescription],
                ['PixelXDimension', exifImage.PixelXDimension],
                ['PixelYDimension', exifImage.PixelYDimension],
                ['XResolution', exifImage.XResolution],
                ['YResolution', exifImage.YResolution],
                ['ResolutionUnit', exifImage.ResolutionUnit],

                ['FNumber', exifImage.FNumber],
                ['MaxApertureValue', exifImage.MaxApertureValue],
                ['Focal Length', exifImage.FocalLength],
                ['Focal Length In 35mm Film', exifImage.FocalLengthIn35mmFilm],
                ['ExposureBias', exifImage.ExposureBias],
                ['ExposureMode', exifImage.ExposureMode],
                ['ExposureProgram', exifImage.ExposureProgram],
                ['ExposureTime', exifImage.ExposureTime],
                ['WhiteBalance', exifImage.WhiteBalance],
                ['Contrast', exifImage.Contrast],
                ['Light Source', exifImage.LightSource],
                ['Flash', exifImage.Flash],
                ['Flashpix Version', exifImage.FlashpixVersion],
                ['Gain Control', exifImage.FlashpixVersion],
                ['ISO Speed Ratings', exifImage.GainControl],
                ['Orientation', exifImage.Orientation],
                ['CustomRendered', exifImage.CustomRendered],
                ['ExposureBias', exifImage.ExposureBias],
                ['ExposureMode', exifImage.ExposureMode],
                ['ExposureProgram', exifImage.ExposureProgram],
                ['ExposureTime', exifImage.ExposureTime],
                ["MeteringMode", exifImage.MeteringMode],
                ['SceneCaptureType', exifImage.SceneCaptureType],
                ['SceneType', exifImage.SceneType],
                ['File Source', exifImage.FileSource],
                ["ComponentsConfiguration", exifImage.ComponentsConfiguration],
                ["YCbCrPositioning", exifImage.YCbCrPositioning],
            ]],
        ]
    }
}