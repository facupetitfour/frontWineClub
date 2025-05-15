import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Verificamos si la app ya está instalada
    const isInStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    setIsStandalone(isInStandalone);

    // Capturamos el evento de instalación diferida
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    const promptEvent = deferredPrompt as any;
    promptEvent.prompt();

    const { outcome } = await promptEvent.userChoice;
    console.log("Resultado de instalación:", outcome);

    setDeferredPrompt(null);
  };

  if (isStandalone || !deferredPrompt) return null;

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<DownloadIcon />}
      onClick={handleInstallClick}
      sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}
    >
      Instalar App
    </Button>
  );
};

export default InstallPWAButton;
