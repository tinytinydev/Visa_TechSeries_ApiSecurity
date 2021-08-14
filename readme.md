# Visa Hands-On Exercises @ SMU Tech Series

## Setup
You will need NodeJs for this exercises. You can install NodeJs from here: https://nodejs.org/en/

In addition, do register this custom addresses to your hosts file so that the sample URLS can be used for this exercises:

### For Mac
1. Open Terminal

2. Navigate to etc folder by entering this command into terminal
```
cd /etc
```

3. Type in the folllowing command to edit the host address
```
sudo noan /etc/hosts
```
You will be prompted to enter password. Enter your Mac's password

4. Paste in this 2 address to the button of the file
```
127.0.0.1 server.visa.io
127.0.0.1 client.bankA.io
```
Press Control X to exit from file indicate Yes to save changes.

### For Windows
Follow this [website](https://support.managed.com/kb/a683/how-to-modify-your-hosts-file-so-you-can-work-on-a-site-that-is-not-yet-live.aspx) and add the same address in the file below
```
127.0.0.1 server.visa.io
127.0.0.1 client.bankA.io
```
Close and save the file.

### Install Node Modules
Open the project in Visual Studio and run npm install in your command prompt/powershell/terminal from the project directory.