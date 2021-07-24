# Image-Processing-API

Image Processing API Project for Udacity.\
Backend api call to return a resized image based on user parameters.

## Setup

### npm install

Installs required dependencies.

## Scripts

In the project directory, you can run:

### npm run start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\

### npm run test

Uses Jasmine to run unit tests.

### npm run build

Builds the app for production to the `build` folder.\

### npm run lint

Runs ESlint to look for any lint errors.

### npm run prettier

Runs Prettier to format code.

## Generating Images

In order to generate a resized image, you will need to go to the [http://localhost:3000/api/images](http://localhost:3000/api/images) url and provide parameters for filename, width, and height.

#### Example: [http://localhost:3000/api/images?filename=fjord&width=200&height=200](http://localhost:3000/api/images?filename=fjord&width=200&height=200)

New resized images are saved within the `assets/thumb` folder.\
If an image of the same width and height already exists in the `assets/thumb` folder, it will be returned instead.

#### The current stock images included are:

-   `encenadaport.jpg`
-   `fjord.jpg`
-   `icelandwaterfall.jpg`
-   `palmtunnel.jpg`
-   `santamonica.jpg`

Feel free to add your own **jpg** images to the `assets/full` folder!
