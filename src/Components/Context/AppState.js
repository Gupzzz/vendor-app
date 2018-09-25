import React from 'react';

export const AppTree = {
    Loader : {
        OpenLoader : () => {
            isLoaderOpen = isLoaderOpen + 1;
        },
        CloseLoader : () => {
            isLoaderOpen = isLoaderOpen - 1;
        }
    },
    User : {
        VendorID : null,
        firstName : null,
        lastName : null
    }
}

export const AppState = React.createContext(AppTree);

export const WithAppState = (Component) => (props) => {
    return (
        <AppState.Consumer>
            {AppState => <Component {...props} context={AppState} />}
        </AppState.Consumer>
        );
}

export const ProvideAppState = (Component,value) => (props) => {
    return (
        <AppState.Provider value={value}>
            <Component {...props} />
        </AppState.Provider>
    );
}