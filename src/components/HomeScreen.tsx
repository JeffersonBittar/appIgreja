import { Screen, ImageSource, Dialogs } from '@nativescript/core';
import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-nativescript";
import { getSliderImages, uploadImage } from '../services/storage';
import { getCurrentUser } from '../services/firebase';
import { getDailyVerse } from '../services/bible';

export function HomeScreen() {
    const [sliderImages, setSliderImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const dailyVerse = getDailyVerse();

    useEffect(() => {
        loadImages();
        checkAdminStatus();
    }, []);

    const loadImages = async () => {
        try {
            const images = await getSliderImages();
            setSliderImages(images);
        } catch (error) {
            console.error('Error loading images:', error);
        }
    };

    const checkAdminStatus = async () => {
        const user = await getCurrentUser();
        const adminEmails = ['admin@example.com'];
        setIsAdmin(user && adminEmails.includes(user.email));
    };

    const handleImageUpload = async () => {
        try {
            const result = await uploadImage();
            if (result) {
                await loadImages();
                await Dialogs.alert('Imagem enviada com sucesso!');
            }
        } catch (error) {
            await Dialogs.alert('Erro ao enviar imagem.');
        }
    };

    return (
        <gridLayout rows="*, auto">
            <scrollView row="0">
                <stackLayout>
                    {/* Image Slider */}
                    <gridLayout className="h-64 w-full">
                        {sliderImages.length > 0 && (
                            <image
                                src={sliderImages[currentImageIndex]}
                                stretch="aspectFill"
                                className="rounded-lg"
                            />
                        )}
                    </gridLayout>

                    {/* Daily Bible Verse */}
                    <gridLayout className="m-4 p-6 bg-gray-100 rounded-lg">
                        <stackLayout>
                            <image
                                src="~/assets/bible-icon.png"
                                className="h-16 w-16 self-center mb-4"
                                stretch="aspectFit"
                            />
                            <label className="text-lg text-center mb-2" textWrap={true}>
                                {dailyVerse.text}
                            </label>
                            <label className="text-sm text-center text-gray-600">
                                {dailyVerse.reference}
                            </label>
                        </stackLayout>
                    </gridLayout>

                    {/* Admin Upload Button */}
                    {isAdmin && (
                        <button
                            className="bg-blue-600 text-white rounded-lg p-4 m-4"
                            onTap={handleImageUpload}
                        >
                            Adicionar Nova Imagem
                        </button>
                    )}
                </stackLayout>
            </scrollView>

            {/* Bottom Navigation */}
            <gridLayout row="1" columns="*, *, *" className="bg-white p-4 border-t">
                <stackLayout col="0" className="text-center">
                    <image src="~/assets/youtube.png" className="h-6 w-6 self-center" />
                    <label text="Cultos" className="text-xs" />
                </stackLayout>
                <stackLayout col="1" className="text-center">
                    <image src="~/assets/spotify.png" className="h-6 w-6 self-center" />
                    <label text="Adoração" className="text-xs" />
                </stackLayout>
                <stackLayout col="2" className="text-center">
                    <image src="~/assets/instagram.png" className="h-6 w-6 self-center" />
                    <label text="@ibmorumbi" className="text-xs" />
                </stackLayout>
            </gridLayout>
        </gridLayout>
    );
}