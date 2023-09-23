import { For, Accessor } from "solid-js";
import { useAppState } from "~/state/Appstate";

import ExifImage from "~/interfaces/ExifImage";

const { imageList } = useAppState();

interface ImageListItemProps {
    item: ExifImage,
    index: Accessor<number>;
}

interface ImageListItemProps {
    item: ExifImage;
    index: Accessor<number>;
}

function ImageListItem(props: ImageListItemProps, index: number) {
    return (
        <div class="px-4 py-6">
            <dt class="text-sm font-medium text-gray-900">{props.item.name}</dt>
        </div>
    );
}

export default function Subnav() {
    return (
        <div class="flex inset-y-0 z-50 w-72 flex-col w-[300px] h-full">
            <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                <h3 class="mt-3 text-neutral-800 font-bold">Images</h3>
                <nav class="flex flex-1 flex-col">
                    <ul role="list" class="-mx-2 space-y-1">
                        <For each={imageList}>
                            {(image, index) => <ImageListItem item={image} index={index} />}
                        </For>
                    </ul>
                </nav>
            </div>
        </div>
    );
}