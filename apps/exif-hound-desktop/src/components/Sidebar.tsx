import { For } from 'solid-js';
import { useAppState } from '~/state/Appstate';

interface Props {}

interface SidebarItemProps {
    item: { href: string; icon: string; label: string };
}

const { isSidebarOpen, listItems } = useAppState();

function SidebarItem(props: SidebarItemProps) {
    return (
        <li>
            <a href={props.item.href} class="hover:bg-gray-800 text-white group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold">
                {props.item.icon}
                <span class="sr-only">{props.item.label}</span>
            </a>
      </li>
    );
}

export default function Sidebar(props: Props) {

  return (
    <div class={`h-full inset-y-0 left-0 z-50 w-20 overflow-y-auto bg-gray-900 pb-4 lg:block lg:w-20 lg:static lg:pb-0 lg:overflow-y-visible ${isSidebarOpen ? '' : 'hidden'}`}>
      <nav class="mt-2">
        <ul role="list" class="flex flex-col items-center space-y-1">
            <For each={listItems}>
                {(item) => <SidebarItem item={item} />}
            </For>
        </ul>
      </nav>
    </div>
  );
} 