@echo off
pushd "%~dp0"
set "HOST=127.0.0.1"
set "PORT=8080"
echo Démarrage du serveur PHP intégré sur http://%HOST%:%PORT% (index.php racine)
start "PHP Server" cmd /c php -S %HOST%:%PORT% index.php
timeout /t 1 >nul
start "" "http://%HOST%:%PORT%/"
popd
exit /b 0