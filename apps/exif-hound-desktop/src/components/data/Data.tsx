import Subnav from './Subnav';
import ExifImage from '~/interfaces/ExifImage';
import DataTable from './DataTable';

interface Props {}

export default function Data(props: Props) {
    return (
        <div id="data-container" class="flex h-full w-full">
            <Subnav />
            <DataTable />
        </div>
    );
}