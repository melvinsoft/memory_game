# Memory Game XBlock


## Installation


### Ansible playbooks

You need to modify your server vars in order to install the new xblock

EDXAPP_FEATURES:
    ALLOW_ALL_ADVANCED_COMPONENTS: true

EDXAPP_EXTRA_REQUIREMENTS:
    ...
    - name: 'git+https://github.com/melvinsoft/memory_game#memory_game-xblock'

Re-run you edxapp playbooks and the XBlock will be installed

### Manual

# Move to the folder where you want to download the XBlock
cd /edx/app/edxapp
# Download the XBlock
sudo -u edxapp git clone https://github.com/melvinsoft/memory_game.git
# If not installed: Install the XBlock
sudo -u edxapp /edx/bin/pip.edxapp install yourXBlock/
# Remove the installation files
sudo rm -r yourXBlock
# In some cases, rebooting is necessary to use the XBlock.
sudo /edx/bin/supervisorctl restart edxapp:

## Activate the XBlock in your course
------------
Go to Settings -> Advanced Settings and set advanced_modules to ["memory_game"].

## Use the XBlock in a unit
------------
Select Advanced -> Memory Game in your unit.
