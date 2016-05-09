# Memory Game XBlock

## Description
This is an early prototype of and XBlock. Is a memory game, where the student
needs to find the matches. Games are a good tool for courses, because they bring
 fun and are good reinforce concepts. For now the game is a bit dummy,
because it's only a grid of cards with cute animal icons, but the main goal in
future is that all images can be custom and the match will not be between equal
cards, instead, my goal is that the instructor could make pairs of two different
concept cards. For example, one cards "2+2" and the pair cards "4". That could
make the game good for reinforce course concepts.

## Technical Description
The XBlock is based on the code of @poormansevo, He has developed and amazing
memory cards game with jQuery, Backbone, underscore. I only integrated the code
and made it work with the XBlock, connecting the events to ajax calls, and
removing the includes of jQuery and underscore to avoid conflicts with the edX
ones.

## Features
* The game release grades. For now you can configure the weight of the XBlock in
Studio and only will submit 0/weight or weight/weight. In the future the goal is
implement partial grades.
* You can configure the max flips in studio to add more complexity to the game.
* The XBlock show how many users already won the game.
* The LMS view show, the user username and the course.
* If the users win the game, their full name in user profile is update for
"Winner".



## Installation


### Ansible playbooks

You need to modify your server vars in order to install the new xblock

```
EDXAPP_FEATURES:
    ALLOW_ALL_ADVANCED_COMPONENTS: true`

EDXAPP_EXTRA_REQUIREMENTS:
    ...
    - name: 'git+https://github.com/melvinsoft/memory_game#memory_game-xblock
```

Re-run you edxapp playbooks and the XBlock will be installed

### Manual

```
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
```

## Activate the XBlock in your course

Go to Settings -> Advanced Settings and set advanced_modules to ["memory_game"].

## Use the XBlock in a unit

Select Advanced -> Memory Game in your unit.
------------
