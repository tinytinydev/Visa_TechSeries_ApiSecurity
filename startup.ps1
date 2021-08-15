$project = Read-Host "Enter project to start (Basic_Auth, Mutual_Auth, XPayToken)"

Set-Location $project

invoke-expression 'cmd /c start powershell -NoExit -Command {cd server; node app.js}'
Start-Sleep -s 1
invoke-expression 'cmd /c start powershell -NoExit -Command {cd client; node app.js}'