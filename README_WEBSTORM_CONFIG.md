# WebStorm Configuration Fix

This repository includes a script to fix WebStorm's configuration to allow opening different projects in separate windows, even if you initially declined this option.

## The Issue

When you first try to open a new project in WebStorm, it asks whether you want to open it in a new window or replace the current project. If you selected "No" or "This Window" and checked "Remember, don't ask again", WebStorm will remember this choice and won't ask again.

This script modifies WebStorm's global configuration to reset this choice and set the default behavior to always open projects in new windows.

## How to Use the Script

1. Open PowerShell as Administrator (right-click on PowerShell and select "Run as Administrator")
2. Navigate to the directory containing the script:
   ```
   cd "path\to\this\repository"
   ```
3. Run the script:
   ```
   .\webstorm_config_fix.ps1
   ```
4. Follow the on-screen instructions
5. Restart WebStorm for the changes to take effect

## What the Script Does

The script performs the following actions:

1. Locates WebStorm configuration directories in your AppData folder
2. Identifies the correct configuration file (`ide.general.xml`)
3. Modifies or creates the file with the setting `confirmOpenNewProject2` set to `0`
4. Provides feedback throughout the process

## Technical Details

The script modifies the `ide.general.xml` file in your WebStorm configuration directory, which is typically located at:

```
%APPDATA%\JetBrains\WebStorm<version>\options\ide.general.xml
```

It sets the `confirmOpenNewProject2` option to `0`, which tells WebStorm to always open projects in new windows.

## Manual Fix

If you prefer to make the change manually:

1. Close WebStorm
2. Navigate to `%APPDATA%\JetBrains\WebStorm<version>\options\`
3. Open `ide.general.xml` in a text editor
4. Find or add the following section:
   ```xml
   <component name="GeneralSettings">
     <option name="confirmOpenNewProject2" value="0" />
   </component>
   ```
5. Save the file and restart WebStorm

## Troubleshooting

If the script doesn't work:

- Make sure you're running PowerShell as Administrator
- Check if WebStorm is currently running (close it before running the script)
- Verify that you have write permissions to the WebStorm configuration directory
- Try the manual fix described above

If you encounter any issues, please report them in the repository's issue tracker.
