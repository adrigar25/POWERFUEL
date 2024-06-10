import { useState, useEffect } from 'react';
import type { AppProps } from "next/app";
import { NextUIProvider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button, Divider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { fontSans, fontMono } from "@config/fonts";
import {useRouter} from 'next/router';
import { AppProvider } from "@context/AppContext";
import "@styles/globals.css";
import '@styles/customModal.css';
require('dotenv').config();
import DefaultLayout from '@layouts/default';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import CookieConsent from 'react-cookie-consent';

toastr.options = {
	positionClass: "toast-bottom-right",
	timeOut: 2000,
	extendedTimeOut: 1000,
  }

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const {isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		const cookies = localStorage.getItem('cookies');
		if (!cookies) {
			onOpen();
		}
	}, []);

	const handleAccept = () => {
		localStorage.setItem('cookies', 'true');
		onClose();
	};

	const handleCancel = () => {
		window.location.href = 'https://www.google.com';
	};
  
	return (
	  <NextUIProvider navigate={router.push}>
		  <NextThemesProvider>
			<AppProvider>
				<DefaultLayout>
			  		<Component {...pageProps} />
						<Modal isOpen={isOpen} hideCloseButton backdrop='blur'>
							<ModalContent>
								<ModalHeader>Consentimiento de cookies</ModalHeader>
								<Divider />
								<ModalBody>
									<p>Este sitio web utiliza cookies para mejorar la experiencia del usuario.</p>
								</ModalBody>
								<ModalFooter>
									<Button color="primary" onClick={handleAccept}>Aceptar</Button>
									<Button color="danger" onClick={handleCancel}>Cancelar</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>
			  	</DefaultLayout>
			</AppProvider>
		  </NextThemesProvider>
	  </NextUIProvider>
	);
  }

export const fonts = {
	sans: fontSans.style.fontFamily,
	mono: fontMono.style.fontFamily,
};
