import { Dialogs, Screen, Frame } from '@nativescript/core';
import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-nativescript";
import { signInWithEmailAndPassword, signInWithGoogle, forgotPassword } from '../services/firebase';
import { HomeScreen } from './HomeScreen';

export function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigateToHome = () => {
        const frame = Frame.topmost();
        frame.navigate({
            create: () => new HomeScreen()
        });
    };

    const handleLogin = async () => {
        if (!email || !password) {
            await Dialogs.alert("Por favor, preencha todos os campos");
            return;
        }

        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(email, password);
            navigateToHome();
        } catch (error) {
            await Dialogs.alert("Erro ao fazer login. Verifique suas credenciais.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            await signInWithGoogle();
            navigateToHome();
        } catch (error) {
            await Dialogs.alert("Erro ao fazer login com Google.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            await Dialogs.alert("Por favor, digite seu email primeiro");
            return;
        }

        try {
            await forgotPassword(email);
            await Dialogs.alert("Email de recuperação enviado!");
        } catch (error) {
            await Dialogs.alert("Erro ao enviar email de recuperação.");
        }
    };

    return (
        <scrollView className="bg-white">
            <flexboxLayout className="p-8" style={styles.container}>
                <image
                    src="~/assets/logo.png"
                    className="h-20 w-20 self-center mb-6"
                    stretch="aspectFit"
                />
                <label className="text-2xl font-bold mb-6 text-center">
                    Entrar
                </label>
                
                <stackLayout className="w-full">
                    <textField
                        className="border rounded-lg p-4 mb-4 w-full"
                        hint="Digite seu email"
                        keyboardType="email"
                        text={email}
                        onTextChange={(e) => setEmail(e.value)}
                        style={styles.input}
                    />
                    
                    <textField
                        className="border rounded-lg p-4 mb-2 w-full"
                        hint="Digite sua senha"
                        secure={true}
                        text={password}
                        onTextChange={(e) => setPassword(e.value)}
                        style={styles.input}
                    />
                    
                    <button
                        className="text-right text-blue-600 mb-4"
                        onTap={handleForgotPassword}
                        textWrap={true}
                        style={styles.forgotPassword}
                    >
                        Esqueceu a senha?
                    </button>
                    
                    <button
                        className="bg-[#1a237e] text-white rounded-lg p-4 mb-4 w-full"
                        onTap={handleLogin}
                        isEnabled={!isLoading}
                        style={styles.primaryButton}
                    >
                        Acessar
                    </button>
                    
                    <label className="text-center mb-4">ou</label>
                    
                    <button
                        className="bg-gray-200 rounded-lg p-4 w-full"
                        onTap={handleGoogleLogin}
                        isEnabled={!isLoading}
                        style={styles.googleButton}
                    >
                        <gridLayout columns="auto, *" className="w-full">
                            <image
                                col="0"
                                src="~/assets/google-icon.png"
                                className="h-5 w-5"
                                stretch="aspectFit"
                            />
                            <label col="1" className="text-center">
                                Entrar com google
                            </label>
                        </gridLayout>
                    </button>
                </stackLayout>
            </flexboxLayout>
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: Screen.mainScreen.heightDIPs,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "100%",
        height: 50,
        fontSize: 16,
    },
    forgotPassword: {
        fontSize: 14,
        marginBottom: 20,
    },
    primaryButton: {
        width: "100%",
        height: 50,
        fontSize: 16,
        fontWeight: "bold",
    },
    googleButton: {
        width: "100%",
        height: 50,
        fontSize: 16,
    },
});