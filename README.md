# Wallashop v2.0

Practica Fundamentos React consistente en un clone de Wallapop hecho con React - Desarrollo Web XVI

Proyecto configurado en **`Vite`** con React con JS + SWG 
## Project set up in Vite with React with JS + SWG

The backend has used the API from the repository: [Nodepop API](https://github.com/davidjj76/nodepop-api)

Curiosidades:
- para obtener la ubicacion del usuario, utilicé la API  de geolocalizacion del navegador 
- para indicar la antigüedad del anuncio, he utilizado la biblioteca date (no implementada aun)


## Technologies Used

- **React**: Used to build the application's user interface.
- **Vite**: Tool used for development and building the application with React with JS + SWG.
- **React Router**: Used to handle navigation in the application.
- **ESLint**: Used for static code analysis.
- **Nodepop API**: Backend of the application.

## Features

- **Viewing Ads**: Users can see a list of all ads available on the platform.
- **Ad Details**: Users can view the details of a specific ad, including the name, description, price, and photos of the item.
- **Creating Ads**: Authenticated users can create a new ad by providing the necessary details.
- **Deleting Ads**: Users can delete an ad if they are the creators of it.
- **Geolocation**: The application uses the browser's geolocation API to obtain the user's location.
- **Ad Age**: The age of the ad will be displayed to provide additional information about its relevance. (Not yet implemented).

## Features Wallashop v2.0 (16/06/2024)

## Images of the application


![alt text](./Images/image2.png)
![alt text](./Images/image1.png)
![alt text](./Images/image3.png)
![alt text](./Images/image4.png)



## How to Run the Application

1. Clone the repository.
2. Navigate to the project directory in your terminal.
3. Install the project dependencies with the command `npm install`.
4. Run the application with the command `npm run dev`.

The application runs on `http://localhost:5173`.

## System Requirements

- Node.js (recommended version: 14.x or higher)

## Project Structure

``` 
Wallashop-React/
├── node_modules/          # Project dependencies
├── public/                # Static public assets
│   └── index.html         # HTML template
├── src/                   # Source code
│   ├── api/               # API configuration and client setup
│   │   └── client.js
│   ├── assets/            # Image and other asset files
│   ├── components/        # Reusable components
│   │   ├── Button.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── DateTime.jsx
│   │   ├── FilterForm.jsx
│   │   ├── layout/        # Layout components
│   │   │   └── layout.jsx
│   │   └── ...            # Other components
│   ├── pages/             # Page components
│   │   ├── ads/           # Ads-related pages
│   │   │   ├── adsPage.jsx
│   │   │   ├── adDetailPage.jsx
│   │   │   ├── deleteAds.jsx
│   │   │   └── service.js
│   │   ├── auth/          # Authentication-related pages
│   │   │   ├── context.jsx
│   │   │   ├── loginPage.jsx
│   │   │   ├── RequireAuth.jsx
│   │   │   └── service.js
│   │   └── ...            # Other pages
│   ├── services/          # Services for API calls and other functionalities
│   │   └── tagService.js
│   ├── styles/            # Global styles and CSS files
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Entry point for React application
│   └── storage.js         # Utility for local storage handling
├── .eslintrc.js           # ESLint configuration
├── vite.config.js         # Vite configuration
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```


## Application Status

The application is in development.

Currently, users can view published ads, view details of each ad, and delete ads they have created. The functionality that detects if an ad has been created by the current user is still in development.

Additionally, the application adjusts its interface depending on whether the user is authenticated or not, showing different navigation options.

The application detects the screens where the user is located, showing different information based on their location. For example, if the user is logged in, they will see the Logout button, but if they are not logged in, they will see the Login button.

The application distinguishes whether the user is logged in or not. If the user is not logged in and tries to perform an action reserved for registered users, they are redirected to the login screen. After logging in, they are redirected back to the screen they originally requested.

## Recent Implementations (10.06.2024)

- Protected all `adverts` routes using the `RequireAuth` component.
- Removed unnecessary effect in `AuthContextProvider` to read from `localStorage`.
- The list of tags is obtained from the API in the `Form` component.
- Implemented at least two of the specified filters (name, buy/sell, price, tags).
- Filtering by name, with the option 'contains' and 'starts with', and filtering by price is done from the frontend.
- After creating an ad, the website redirects the user to the ad detail page.
- Modified `ads/service.js` to use Axios to handle `multipart/form-data` when creating an ad.
- Added a `ConfirmDialog` component for ad deletion confirmation and logout.
- Configured user session persistence when reloading the page.
- Implemented "Remember Me" functionality in the login.
- Added checkbox for "Remember Me" functionality in the login form.
- Email and "Remember Me" preferences are stored in `localStorage` if the checkbox is checked.
- Updated `AuthContext` to retain saved email even after logout.
- Ensured that the email field is pre-filled on the login page if "Remember Me" was previously selected.
- Added loading and error state handling in `AdDetailPage`.
- Improved user experience with loading state on the page.
- Ensured that the user's session remains active until the user logs out.
- Optimized redirection to the 404 not found page.

## Contributions
We welcome contributions from the community! If you'd like to contribute to the project, please follow these steps:

* Open an issue to report bugs or suggest improvements.
* Fork the repository.
* Create a branch for your new feature: git checkout -b my-new-feature.
* Commit your changes: git commit -am 'Add a new feature'.
* Push your changes to the branch: git push origin my-new-feature.
* Submit a pull request.

## Contact

For any questions, suggestions, or feedback about the project, feel free to reach out. You can email us at syradominguez.dev@gmail.com

## Acknowledgements

Thanks to our teacher David (https://github.com/davidjj76) for his detailed explanations and his always willingness to help and answer our questions.

