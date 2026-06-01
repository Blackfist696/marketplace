<?php
$zipFile = 'archive.zip'; // Remplacez par le nom exact de votre zip
$extractTo = './'; // Dossier de destination (./ = le dossier actuel)

$zip = new ZipArchive;

if ($zip->open($zipFile) === TRUE) {
    // Extrait tous les fichiers dans le dossier spécifié
    $zip->extractTo($extractTo);
    $zip->close();
    echo 'Décompression réussie !';
} else {
    echo 'Échec de la décompression.';
}
?>
