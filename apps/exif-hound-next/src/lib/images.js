import { writable } from 'svelte/store';

function createImages() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		addImage: (image) => update((images) => {
            return [...images, image];
        }),
		updateImage: (image) => update((images) => {
			const index = images.filter((file) => file.file.exifData.id === image.file.exifData.id);
			index.pop();
			index.push(image);
			return Object.assign(images, image);
		}),
		selectImage: (image) => update((images) => {
			// Reset all selections
			images.map(img => { img.selected = false });

			// Select and update 
			image.selected = true;
			const index = images.filter((file) => file.file.exifData.id === image.file.exifData.id);
			index.pop();
			index.push(image);
			return Object.assign(images, image);
		}),
		clearSelection: () => update((images) => {
			// Reset all selections
			images.map(img => { img.selected = false });
			return images;
		}),
        get: () => { return subscribe },
		reset: () => set([])
	};
}

export const images = createImages();
