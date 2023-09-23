import Sidebar from './Sidebar';

interface Props {
  children: any;
}

export default function PageTemplate(props: Props) {
  return (
    <div class="flex h-full">
        <Sidebar />
        <div class="flex w-full h-full">
            <div class="flex flex-col h-full w-full">
                <div class="flex h-full">
                    <div class="h-full w-full">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}