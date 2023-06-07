<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Olympus</h3>

  <p align="center">
    Web app for users to keep track of their weightlifintg progress with data visualization
    <br />
    <a href="https://github.com/cs394-s23/Olympus"><strong>Explore the Repo »</strong></a>
     <br/>
     <a href="https://olympus-stats-screen.web.app"><strong>Try the app</strong></a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#test">Test</a></li>
        <li><a href="#scripts">Scripts</a></li>
        <li><a href="#firebase">Firebase</a></li>
          <li><a href="#data">Data & User Authentication</a></li>
        <li><a href="#notes">Notes</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributers">Contributers</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

A web app that allows users to keep track of their progression in weight-lifting with graphs to see the progress visually.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- React
- [Recharts](https://recharts.org/en-US) for graphing

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

## React Vitest

Using React Vite

[Full Vite documentation](https://github.com/criesbeck/react-vitest)

## Installation

```
git clone https://github.com/cs394-s23/Olympus
npm install
```

## Test

Verify that the initial app works. Run

```
npm start
```

and open the URL displayed.

Verify that the unit tests work with

```
npm test
```

All tests should run and pass.

## Scripts

**package.json** defines the following scripts:

| Script        | Description                                         |
| ------------- | --------------------------------------------------- |
| npm start     | Runs the app in the development mode.               |
| npm run dev   | Runs the app in the development mode.               |
| npm run build | Builds the app for production to the `dist` folder. |
| npm run serve | Serves the production build from the `dist` folder. |
| npm test      | Starts a Jest-like test loop                        |

## Firebase

Create your own Firebase account and create a project called Olympus.

When applicable, replace the `firebaseAppConfig` and `firebaseDatabaseConfig` in firebase.jsx with the config from
your created project.

To set up the Firebase, run

```
npm install firebase-tools -g
firebase login
firebase init
```

Select Hosting: Configure and deploy Firebase Hosting sites.

Select _Use an existing project_.

Select your Firebase Project (e.g. Olympus).

Specify _dist_ when firebase init asks what the public directory is.

Say _NO_ when Firebase asks about adding Github Actions.

Say _YES_ when Firebase asks about configuring as a single-page app.

Say _NO_ if Firebase asks you to overwrite build/index.html.

To deploy, run

```
npm run build
firebase deploy
```

## Data & User Authentication

Currently, the app is displaying mock user data, and it does not required user authentication for logging in. All data came from `New_data.csv` file. The file was processed with `csv_to_json.py` to get `new_data_1RM.json` for one rep max dashboard and `new_data_volume.json` for workout volume dashboard.

To use data storage service like Firebase Database to serve real-time user data, add database config to firebase.jsx, create data fetching utility functions in Utils/DataUtils.js, and replace corresponding lines in OneRMDashboard.jsx and WorkoutVolumeDashboard.jsx

## Notes

When including relative links to images in the public folder, you do not need to specifiy 'public/' before the image names.

Additionally, image names are case sensative, so make sure they are _all lowercase_ in your local repo.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->

## Roadmap

- [x] Display progression and estimation graphs on one rep max dashboard and volume dashbard for different workouts
- [x] Allow users to adjust time period
- [x] Compare progress with friends
- [ ] Integrate with existing Olympus codebase
- [ ] Fetch user data from Firebase or other data storage service

<!-- See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues). -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTERS -->

## Contributers

Julio Villanueva - [https://github.com/julio-villa](https://github.com/julio-villa)

Thomas Filipiuk - [https://github.com/ThomasFilipiuk](https://github.com/ThomasFilipiuk)

Cindy Hu - [https://github.com/cindyhu2023](https://github.com/cindyhu2023)

Mariam Muchai - [https://github.com/mariammuchai](https://github.com/mariammuchai)

Aria Puri - [https://github.com/apuri32](https://github.com/apuri32)

Tergel Myanganbayar - [https://github.com/t-mm](https://github.com/t-mm)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot]: images/home_screenshot.png
[question-screenshot]: images/question_screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
