$bindings = ""

Get-Content .env.local | ForEach-Object {
    if (-not ($_ -match "^#") -and ($_ -match ".+=.+")) {
        $name, $value = $_ -split '=', 2
        $value = $value -replace '^"(.*)"$', '$1'
        $bindings += "--binding ${name}=${value} "
    }
}

$bindings = $bindings.TrimEnd()
Write-Output $bindings