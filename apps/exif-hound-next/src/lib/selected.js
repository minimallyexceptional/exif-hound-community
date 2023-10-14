import { writable } from 'svelte/store';

function createSelected() {
	const { subscribe, set, update } = writable(null);

	return {
		subscribe,
        set,
        update,
		select: (image) => update((selected) => {
            set(image);
        }),
        clearSelection: () => update((selected) => {
            set(null);
        })
	};
}

export const selected = createSelected();
