const routeStrings = {
    home: "This is the string that will be used in the home route!!!",
    about: "This is the string that will be used in the about route!!!",
    contact: "This is the string that will be used in the contact route!!!",
    compose: "This is the string that will be used in the compose route!!!"
};

exports.getStringForRoute = (route) => {
    return routeStrings[route] || "Route string not found";
};


