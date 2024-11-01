import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-storage';
import { ImagePicker } from '@nativescript/core';

export const getSliderImages = async (): Promise<string[]> => {
    try {
        const storage = firebase.storage();
        const sliderRef = storage.ref('slider');
        const list = await sliderRef.listAll();
        
        const urls = await Promise.all(
            list.items.map(item => item.getDownloadURL())
        );
        
        return urls;
    } catch (error) {
        console.error('Error getting slider images:', error);
        return [];
    }
};

export const uploadImage = async (): Promise<boolean> => {
    try {
        const context = ImagePicker.create({
            mode: "single"
        });

        const selection = await context.present();
        if (selection.length > 0) {
            const selected = selection[0];
            const imageSource = selected.android || selected.ios;

            const storage = firebase.storage();
            const filename = `slider/${Date.now()}.jpg`;
            const reference = storage.ref(filename);

            await reference.putFile(imageSource);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};