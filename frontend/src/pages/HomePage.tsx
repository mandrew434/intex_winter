import CookieConsent from "react-cookie-consent";

function HomePage() {

    return (
        <>

            <h1>Welcome to the Home Page</h1>
            <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
            
            <p>Here you can find various resources and information.</p>
        </>
    )
}

export default HomePage;
