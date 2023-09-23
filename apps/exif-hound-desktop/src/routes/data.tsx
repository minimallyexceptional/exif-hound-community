import PageTemplate from "~/components/PageTemplate";
import { useAppState } from "~/state/Appstate";

import Data from "~/components/data/Data";

export default function DataPage() {
  return (
    <PageTemplate>
      <Data />    
    </PageTemplate>
  );
}
