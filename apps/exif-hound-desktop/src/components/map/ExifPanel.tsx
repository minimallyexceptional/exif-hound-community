import { BiSolidCopy } from "solid-icons/bi";
import { For } from "solid-js";
import ExifImage from "~/interfaces/ExifImage";
import { useAppState } from "~/state/Appstate";

const { imageList } = useAppState();

interface ExifDataListProps {
    item: ExifImage,
};

interface ExifDataListItemProps {
    key: string,
    value: any
};

function ExifDataListItem(props: ExifDataListItemProps) {
    console.log(props.key, props.value)
    return (
        <li class="w-full bg-slate-100 my-4 p-4">
            <div class="flex items-center">
                <div class="font-medium text-gray-900 mr-2">{props.key}</div>
                <div class=" text-gray-900 mr-4">{props.value}</div>
                <BiSolidCopy size={20} class="text-gray-500 hover:text-indigo-600" />
            </div>
        </li>
    );
}

function ExifDataList(props: ExifDataListProps) {

    const exifData = props.item.exifData;
    const exifDataKeys = Object.keys(exifData);
    const exifDataValues = Object.values(exifData);


    return (
        <ul class="w-full h-full bg-slate-200 p-4">
            <For each={exifDataKeys}>
                {(key, index) => <ExifDataListItem key={key} value={exifDataValues[index()]} />}
            </For>
        </ul>
    );
}

export default function ExifPanel() {
    return (
        <div class="flex inset-y-0 z-50 w-[650px] flex-col h-full border-l-2 border-l-slate-200">
            <div class="flex">
                <div class="flex items-center justify-center bg-gray-800 w-full h-100">
                    <img class="m-10" src={`${imageList[0].path}`} alt="" />
                </div>
            </div>
            <ExifDataList item={imageList[0]} />
        </div>
    );
}