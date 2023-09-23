import ExifHound from "exif-hound-core";

import Map from "~/components/map/Map";
import PageTemplate from "~/components/PageTemplate";
import { useAppState } from "~/state/Appstate";

const { imageList } = useAppState();

const exifHound = new ExifHound();

console.log(exifHound.init());

export default function Home() {
  return (
    <PageTemplate>
      <Map mapEntitys={imageList}/>
    </PageTemplate>
  );
}
