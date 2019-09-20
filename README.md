# Banner development with NPM
Guides to using NPM as a build tool: [css-tricks](https://css-tricks.com/why-npm-scripts/), [Keith Cirkel](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/), [Medium](https://medium.com/javascript-training/introduction-to-using-npm-as-a-build-tool-b41076f488b0).

### Version
1.2.0
NPM Scripts call CLI commands or local JS task files (./lib/tasks). This project uses a single *dist* and *src* folder. With the exception of certain binary files like videos or fonts, nothing in the *dist* should need to be modified (old/unused files may need to be manually deleted from folders in *dist*).

##### Minimum requirements:
 - macOS Sierra or later & command-line tools for XCode
 - Windows 10 latest update possible (see Windows env notes below)
 - [NodeJS & NPM](https://nodejs.org/)
 - [Git](https://git-scm.com/downloads)

If you are not sure about if you have NodeJS on your machine just open the terminal and type

    $ node -v
    $ npm -v
    $ git --version

If a version number appears on screen then you have Node and NPM installed. If you want to update them run these commands in Terminal (if you're using *sudo*, go [here](https://docs.npmjs.com/getting-started/fixing-npm-permissions)):

    $ npm cache clean -f
    $ npm install -g n
    $ n stable

### Installing Node.js on MacOS & GNU/Linux
The best way to install and manage Node.js is by using [NVM (Node Version Manager)](https://github.com/creationix/nvm) instead of using the official Node.js installer. This allows us having multiple Node.js versions an doing easy version upgrades or downgrades as necessary.

You can simply install it by using the install script from [this instructions](https://github.com/creationix/nvm#install-script). Once installed restart your terminal and do

    $ nvm install stable

This will install the stable version of Node.js

### Downloading
If you plan on using this template as a starter project, you should download a ZIP file from GitLab and initialize a new Git repo for a fresh start.

If you plan on adding features, fixing bugs or contributing to this template then you should clone this repo. Make changes on a new branch and then send a merge request to the project owner.

### Usage
Open your terminal and navigate to the folder containing package.json. If the node_modules folder doesn't exists you will need to install all the dependencies listed. If using Windows, remember to type 'bash' in order to access the bash commands from Linux

    $ npm install

After the node_modules are installed, run the default NPM Script to start a local server and watch for any file changes:

    $ npm start

When ready for deploy, zip all files to make the deliverables your producer needs by running:

    $ npm run zip

Make the showcase page by running (this task will automatically run after the zip task completes):

    $ npm run index

Now you can share the showcase page (and credentials for review site) with your producer. Review page will be viewable at http://share.dag.rgadev.com/your-subgroup/your-project/index.html

[See more info on this here] (https://gitlab.ny.rga.com/digitaladvertising/client-review-site)

### Structure
Files to edit:

    src/.../index.html
    src/.../main.scss
    src/.../main.js (es6 module entry point)

Folders to drop images into for sprite output

    src/.../styles/sprite-mov (png or jpg files for image sequence animations)
    src/.../styles/sprite-svg (only svg files)
    src/.../styles/sprite-png (only png files @1x and/or @2x)
    src/.../styles/sprite-jpg (jpg, png or gif files @1x and/or @2x (jpg output))


All the sprites, html, css and js files will output to the corresponding **dist/...** folder.

### HTML
HTML files in *src* are vanilla HMTL except for the added ability to include text files (css, html, js, svg) with a special comment (see example below).

    <!-- include project-path-to-asset/file.svg -->
    <!-- include project-path-to-asset/file.min.js -->

JS and CSS includes are automatically wrapped in opening and closing &lt;script&gt; and &lt;style&gt; tags respectively.

### ES6 Modules
Every main.js file in any src/... folder functions as an entry point to import ES6 modules using Rollup as a bundler, ESLint for linting and Babel to transpile down to an ES5 bundle.js file inside each corresponding dist/... folder. Errors found by ESLint will stop the bundle process.
More info: [Understanding ES6 Modules](https://www.sitepoint.com/understanding-es6-modules/),
[Rollup module bundler](https://rollupjs.org/),
[Babel transpiler](http://babeljs.io/),
[ESLint](http://eslint.org/)

### SCSS
Every main.scss file will be compiled to main.css in the *styles* directory. From there, all CSS files in the *styles* directory (such as spritesheet CSS files) are combined and autoprefixed before being output to the file bundle.css in the corresponding *dist* folder.

### Setting up a Windows based development environment
In order to set up a safe working environment we use Windows Subsystem for Linux. This allows us to have bash, SSH, and other Unix commands available globally to the OS.

First start by installing a Linux distro from WSL following the official documentation from [here](https://docs.microsoft.com/en-us/windows/wsl/install-win10). This guides uses Debian as a base system since it's extremely lightweight to load. Please note that you can use other distros but the instructions will vary case by case and it may not work. Debian and Ubuntu are tested to use.

Once you have your Linux up and running, do

    $ sudo apt-get update
    $ sudo apt-get upgrade

Let the system complete all of the updates. After that we'll install two prerequisites needed for installing Node and compiling npm packages. You can skip both of these steps if you chose to install Ubuntu since they come out of the box.

The first one we'll install is cURL in order to be able to download and run the install script from NVM. Do it by typing

    $ sudo apt-get install curl

Now we'll install bzip2 needed for the NPM packages. Do this by typing

    $ sudo apt-get install bzip2

You can choose to install Git as well instead of doing it from the Windows version. Do this by executing

    $ sudo apt-get install git

With that, you have a fully working Linux set up for all your banner needs. If something goes wrong you can always uninstall the Linux distro from Windows and start from scratch.

You can proceed to install Node.js

### WSL: Navigating to your project folder easily in Windows
Since we have WSL running on Windows, we have full access to the hard drive. You should always manage your files from Windows and not the other way around.

Simply open Windows Powershell and type

    $ bash

This will allow us to execute bash commands natively and compile the template. Just navigate using 'cd' to you project folder and have fun.

An alternative way is to launch the Linux distro and access your files from the mount folder. For example we can go to the user Home folder by doing

    $ cd mnt/c/Users/<your username>

After that just 'cd' to your project folder and that's it.

■ R/GA
