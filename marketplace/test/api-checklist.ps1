Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$base = 'http://localhost:8000'
$results = New-Object System.Collections.Generic.List[Object]

function Invoke-Api {
    param(
        [string]$Method,
        [string]$Path,
        [Microsoft.PowerShell.Commands.WebRequestSession]$Session,
        $Body = $null
    )

    $url = "$base$Path"
    try {
        if ($null -ne $Body) {
            $resp = Invoke-WebRequest -Uri $url -Method $Method -WebSession $Session -Body $Body -ContentType 'application/x-www-form-urlencoded'
        } else {
            $resp = Invoke-WebRequest -Uri $url -Method $Method -WebSession $Session
        }

        return [PSCustomObject]@{
            Status = [int]$resp.StatusCode
            Body = $resp.Content
        }
    } catch [System.Net.WebException] {
        $response = $_.Exception.Response
        if ($null -eq $response) {
            return [PSCustomObject]@{ Status = -1; Body = $_.Exception.Message }
        }

        $status = [int]$response.StatusCode
        $stream = $response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $content = $reader.ReadToEnd()
        $reader.Close()

        return [PSCustomObject]@{
            Status = $status
            Body = $content
        }
    }
}

function Add-Result {
    param([string]$Name, [bool]$Ok, [string]$Detail)

    $results.Add([PSCustomObject]@{
        Test = $Name
        Resultat = $(if ($Ok) { 'OK' } else { 'FAIL' })
        Detail = $Detail
    }) | Out-Null
}

function Login-WithCandidates {
    param(
        [Microsoft.PowerShell.Commands.WebRequestSession]$Session,
        [array]$Candidates
    )

    $last = [PSCustomObject]@{ Status = -1; Body = '' }
    foreach ($c in $Candidates) {
        $r = Invoke-Api -Method 'POST' -Path '/login' -Session $Session -Body @{ email = $c.email; mot_de_passe = $c.password }
        $last = $r
        if ($r.Status -eq 200) {
            return [PSCustomObject]@{ Ok = $true; Email = $c.email; Status = $r.Status; Body = $r.Body }
        }
    }

    return [PSCustomObject]@{ Ok = $false; Email = ''; Status = $last.Status; Body = $last.Body }
}

$anon = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$client = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$artisan = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$admin = New-Object Microsoft.PowerShell.Commands.WebRequestSession

# 1) Anonyme
$r = Invoke-Api -Method 'GET' -Path '/products' -Session $anon
Add-Result -Name 'Anonyme -> GET /products autorise' -Ok ($r.Status -eq 200) -Detail "HTTP $($r.Status)"

$r = Invoke-Api -Method 'GET' -Path '/orders' -Session $anon
Add-Result -Name 'Anonyme -> GET /orders refuse' -Ok ($r.Status -in @(401, 403)) -Detail "HTTP $($r.Status)"

# 2) Client
$clientLogin = Login-WithCandidates -Session $client -Candidates @(
    @{ email = 'client1@example.com'; password = 'client123' }
)
Add-Result -Name 'Client -> login' -Ok $clientLogin.Ok -Detail $(if ($clientLogin.Ok) { "OK ($($clientLogin.Email))" } else { "HTTP $($clientLogin.Status)" })

$clientUserId = $null
$clientAddressId = $null

if ($clientLogin.Ok) {
    $r = Invoke-Api -Method 'GET' -Path '/profile' -Session $client
    $okProfile = ($r.Status -eq 200)
    Add-Result -Name 'Client -> GET /profile (propre profil)' -Ok $okProfile -Detail "HTTP $($r.Status)"

    if ($okProfile) {
        try {
            $j = $r.Body | ConvertFrom-Json
            $clientUserId = [int]$j.data.utilisateur.id_utilisateur
            if ($j.data.adresses -and $j.data.adresses.Count -gt 0) {
                $clientAddressId = [int]$j.data.adresses[0].id_adresse
            }
        } catch {
        }
    }

    $r = Invoke-Api -Method 'GET' -Path '/orders' -Session $client
    Add-Result -Name 'Client -> GET /orders autorise' -Ok ($r.Status -eq 200) -Detail "HTTP $($r.Status)"

    $r = Invoke-Api -Method 'GET' -Path '/admin/users' -Session $client
    Add-Result -Name 'Client -> GET /admin/users refuse' -Ok ($r.Status -eq 403) -Detail "HTTP $($r.Status)"

    $r = Invoke-Api -Method 'GET' -Path '/artisan/products' -Session $client
    Add-Result -Name 'Client -> GET /artisan/products refuse' -Ok ($r.Status -eq 403) -Detail "HTTP $($r.Status)"

    if ($null -ne $clientUserId) {
        $r = Invoke-Api -Method 'GET' -Path "/api/utilisateurs/$clientUserId/adresses" -Session $client
        Add-Result -Name 'Client -> GET ses adresses (id proprietaire)' -Ok ($r.Status -eq 200) -Detail "HTTP $($r.Status)"

        $otherUserId = $clientUserId + 1
        $r = Invoke-Api -Method 'GET' -Path "/api/utilisateurs/$otherUserId/adresses" -Session $client
        Add-Result -Name 'Client -> GET adresses autre utilisateur refuse' -Ok ($r.Status -eq 403) -Detail "HTTP $($r.Status)"
    } else {
        Add-Result -Name 'Client -> GET ses adresses (id proprietaire)' -Ok $false -Detail 'id_utilisateur non resolu'
        Add-Result -Name 'Client -> GET adresses autre utilisateur refuse' -Ok $false -Detail 'id_utilisateur non resolu'
    }

    if ($null -ne $clientAddressId) {
        $r = Invoke-Api -Method 'GET' -Path "/api/adresses/$clientAddressId/utilisateurs" -Session $client
        Add-Result -Name 'Client -> GET utilisateurs d une adresse refuse' -Ok ($r.Status -eq 403) -Detail "HTTP $($r.Status)"
    } else {
        Add-Result -Name 'Client -> GET utilisateurs d une adresse refuse' -Ok $false -Detail 'id_adresse non resolu'
    }
}

# 3) Artisan
$artisanLogin = Login-WithCandidates -Session $artisan -Candidates @(
    @{ email = 'miels.artisan@example.com'; password = 'artisan123' },
    @{ email = 'savons.artisan@example.com'; password = 'artisan123' },
    @{ email = 'confiseries.artisan@example.com'; password = 'artisan123' },
    @{ email = 'cosmetiques.artisan@example.com'; password = 'artisan123' },
    @{ email = 'bougies.artisan@example.com'; password = 'artisan123' },
    @{ email = 'pollen.artisan@example.com'; password = 'artisan123' },
    @{ email = 'propolis.artisan@example.com'; password = 'artisan123' },
    @{ email = 'coffrets.artisan@example.com'; password = 'artisan123' }
)
Add-Result -Name 'Artisan -> login' -Ok $artisanLogin.Ok -Detail $(if ($artisanLogin.Ok) { "OK ($($artisanLogin.Email))" } else { "HTTP $($artisanLogin.Status)" })

$ownArtisanId = $null
if ($artisanLogin.Ok) {
    $r = Invoke-Api -Method 'GET' -Path '/artisan/products' -Session $artisan
    Add-Result -Name 'Artisan -> GET /artisan/products autorise' -Ok ($r.Status -eq 200) -Detail "HTTP $($r.Status)"

    $r = Invoke-Api -Method 'GET' -Path '/admin/users' -Session $artisan
    Add-Result -Name 'Artisan -> GET /admin/users refuse' -Ok ($r.Status -eq 403) -Detail "HTTP $($r.Status)"

    $r = Invoke-Api -Method 'GET' -Path '/artisan/stats' -Session $artisan
    Add-Result -Name 'Artisan -> GET /artisan/stats autorise' -Ok ($r.Status -eq 200) -Detail "HTTP $($r.Status)"

    if ($r.Status -eq 200) {
        try {
            $j = $r.Body | ConvertFrom-Json
            $ownArtisanId = [int]$j.data.artisan_id
        } catch {
        }
    }

    if ($null -ne $ownArtisanId) {
        $r = Invoke-Api -Method 'GET' -Path "/api/artisans/$ownArtisanId/statistiques" -Session $artisan
        Add-Result -Name 'Artisan -> GET ses statistiques detail autorise' -Ok ($r.Status -eq 200) -Detail "HTTP $($r.Status)"

        $otherArtisan = $ownArtisanId + 1
        $r = Invoke-Api -Method 'GET' -Path "/api/artisans/$otherArtisan/statistiques" -Session $artisan
        Add-Result -Name 'Artisan -> GET statistiques autre artisan refuse' -Ok ($r.Status -eq 403) -Detail "HTTP $($r.Status)"
    } else {
        Add-Result -Name 'Artisan -> GET ses statistiques detail autorise' -Ok $false -Detail 'id_artisan non resolu'
        Add-Result -Name 'Artisan -> GET statistiques autre artisan refuse' -Ok $false -Detail 'id_artisan non resolu'
    }
}

# 4) Admin
$adminLogin = Login-WithCandidates -Session $admin -Candidates @(
    @{ email = 'admin@example.com'; password = 'admin123' }
)
Add-Result -Name 'Admin -> login' -Ok $adminLogin.Ok -Detail $(if ($adminLogin.Ok) { "OK ($($adminLogin.Email))" } else { "HTTP $($adminLogin.Status)" })

if ($adminLogin.Ok) {
    $r = Invoke-Api -Method 'GET' -Path '/admin/users' -Session $admin
    Add-Result -Name 'Admin -> GET /admin/users autorise' -Ok ($r.Status -eq 200) -Detail "HTTP $($r.Status)"

    $r = Invoke-Api -Method 'GET' -Path '/api/statistiques-artisans' -Session $admin
    Add-Result -Name 'Admin -> GET /api/statistiques-artisans autorise' -Ok ($r.Status -eq 200) -Detail "HTTP $($r.Status)"

    if ($null -ne $clientAddressId) {
        $r = Invoke-Api -Method 'GET' -Path "/api/adresses/$clientAddressId/utilisateurs" -Session $admin
        Add-Result -Name 'Admin -> GET /api/adresses/{id}/utilisateurs autorise' -Ok ($r.Status -eq 200) -Detail "HTTP $($r.Status)"
    } else {
        Add-Result -Name 'Admin -> GET /api/adresses/{id}/utilisateurs autorise' -Ok $false -Detail 'id_adresse client non resolu'
    }
}

$results | Format-Table -AutoSize
$failCount = @($results | Where-Object { $_.Resultat -eq 'FAIL' }).Count
Write-Output "FAIL_COUNT=$failCount"
if ($failCount -gt 0) { exit 1 }
