import { expect } from "chai";
import ExifHound from "./ExifHound";

let exifHound : any;


describe('ExifHound', function () {

    this.beforeEach(() => {
        exifHound = new ExifHound();
    })

    describe('changeName', function () {
      it('should change the saved name, to the name provided', function () {
        expect(exifHound.init()).to.equal('Exif Hound');
      });
    });

  });