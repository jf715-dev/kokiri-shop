Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "Paleta y Logo\1791780104730.png"
$destPathBlack = Join-Path $PSScriptRoot "assets\logo_transparent.png"
$destPathWhite = Join-Path $PSScriptRoot "assets\logo_transparent_white.png"

$img = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $img.Width
$h = $img.Height

$bmpBlack = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bmpWhite = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($x = 0; $x -lt $w; $x++) {
    for ($y = 0; $y -lt $h; $y++) {
        $pixel = $img.GetPixel($x, $y)
        $avg = ($pixel.R + $pixel.G + $pixel.B) / 3.0
        
        if ($avg -ge 235) {
            $bmpBlack.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            $bmpWhite.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            $alpha = [int](255 * (1.0 - ($avg / 245.0)))
            if ($alpha -gt 255) { $alpha = 255 }
            if ($alpha -lt 0) { $alpha = 0 }
            
            # Versión negra transparente
            $bmpBlack.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 0, 0, 0))
            
            # Versión blanca / Mindaro brillante para tema oscuro
            $bmpWhite.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 228, 235, 156))
        }
    }
}

$img.Dispose()
$bmpBlack.Save($destPathBlack, [System.Drawing.Imaging.ImageFormat]::Png)
$bmpWhite.Save($destPathWhite, [System.Drawing.Imaging.ImageFormat]::Png)

# También sobreescribir assets\logo.png con la versión para dark theme
$destMain = Join-Path $PSScriptRoot "assets\logo.png"
$bmpWhite.Save($destMain, [System.Drawing.Imaging.ImageFormat]::Png)

$bmpBlack.Dispose()
$bmpWhite.Dispose()
Write-Host "Logos transparentes creados con éxito!"
