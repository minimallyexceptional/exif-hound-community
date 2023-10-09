import { writable } from 'svelte/store';

function createImages() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		addImage: (image) => update((images) => {
            return [...images, image];
        }),
        get: () => { return subscribe },
		reset: () => set([])
	};
}

export const images = createImages();
