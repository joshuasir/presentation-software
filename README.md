# Easy Worship Clone Presentation Software using boilerplate for Electron + React + Redux with SQLite database

![image](https://github.com/joshuasir/presentation-software/assets/71873035/d3ee8dd8-7504-4027-8cbd-26cf4dd70fa6)

This presentation software is an EasyWorship Clone which is a powerful presentation software designed for managing songs and presenting lyrics. Whether you're in a worship service, conference, or any event that requires dynamic presentations, this software got you covered. With its intuitive interface and feature-rich functionality, you can easily create, manage, and present your song lyrics in a seamless and engaging manner.

Key Features:

### Song Management:
This app provides robust song management capabilities, allowing you to organize and maintain your song library effortlessly. You can add, edit, and delete songs, categorize them into different genres or themes, and include relevant metadata such as lyrics, and title. With a user-friendly interface, you can easily search and retrieve songs for quick access during presentations. The music will be stored locally and can be distributed in an exported file.

### Song Preview:
Previewing songs is an essential part of the preparation process. Theis app enables you to preview songs before presenting them. You can view the lyrics, adjust number of slide, to ensure a smooth and error-free presentation. This feature allows you to perfect your performance and ensure a seamless flow of lyrics during live presentations.

### Presenting:
After previewing, you can adjust the song you want to use, adjust their order and select if you want to present them right away in a new tab or export it as power point

## Tech stack:

- Electron
- React
- Redux
- Webpack
- ForrestJS hooks
- Sequelize
- SQLite

## Module

- Spectacle
- pptgenjs
- Atlassian beautiful dnd
- tailwind elements
- electron packager

## Dev:

- React-styleguidist for developing React components in isolation.
- React & Redux devtools.
- Electron Builder for deployment.

## How to run project in development:

- Run `npm install`
- Open a second terminal, run `npm run watch` to boot Webpack compiler.
- Run `npm run start` to boot Electron app in development.

## How to run react-styleguide:

- Open a second terminal, run `npm run watch-style` to boot Webpack compiler.
- Run `npm run styleguide` to boot react-styleguide.

## How to pack & deploy the app:

- Run `npm run build` to prepare the app for production.
- Then run the command corresponding to your OS:
- Windows: `npm run make:win`
- Linux: `npm run make:linux`
- macOS: `npm run make:macos`

## Commands:

### `npm run start`

Runs the app in the development mode.
Make sure to run the app along with a second terminal running `npm run watch` command (Webpack)

### `npm run watch`

Webpack command for dev environment, targets `electron-renderer`

### `npm run styleguide`

Runs the React styleguide server.
Make sure to run the styleguide along with a second terminal running `npm run watch-style` command (Webpack)
Note: Currently styleguide does not support hot-reloading in this non-CRA setup.
It needs a better config on Webpack. For now, it still works without hot-reload.

### `npm run watch-style`

Webpack command for react-styleguide environment, targets `web`

### `npm run make:win`

Packs the app for Windows environment.
You will find the package installer file inside `dist` folder: `yourAppName Setup 1.0.0.exe`

### `npm run make:linux`

Packs the app for Linux environment.

### `npm run make:macos`

Packs the app for macOS environment.

## Project structure

```bash
├── assets # contains app icon files
├── server # contains back-end related code: IPC handler, Sequelize, SQLite
│   ├── features             # contains back-end business logic per functionality (routes)
│   ├── lib                  # contains utility functions used in back-end
│   ├── services             # contains back-end operation logic (handling IPC, SQLite, etc.)
│   ├── boot.js              # main file for back-end orchestration using ForrestJS hooks
├── src/js                   # contains front-end related code: React & Redux
│   ├── components           # contains common React components used overall the front-end
│   ├── features             # contains feature based Redux only logic
│   ├── lib                  # contains utility functions used in front-end
│   ├── pages                # contains container and components for each page
│   ├── resources            # contains resource files (images, json files, etc.)
│   ├── App.js               # React App.js
│   ├── app.reducer.js       # main reducer file that puts all reducers together (no need to modify)
│   ├── app.state.js         # main redux state file - import your features here to initialize them.
│   ├── index.js             # top level orchestration file for React & Redux
│   ├── styleguide.config.js # import your styleguide components here to work on isolation
├── index.html               # Electron renderer thread entry point
├── main.js                  # main file for Electron main thread orchestration
├── preload.js               # preload script exposes the parts needed for renderer from main thread
├── webpack.common.js        # webpack config for development environment
├── webpack.prod.js          # webpack config for production environment
└── webpack.styleguide.js    # webpack config for running react-styleguide
```
=======
# presentation-software
>>>>>>> c5145dda76e90cc7b9c758bd79567f9076898d9b
