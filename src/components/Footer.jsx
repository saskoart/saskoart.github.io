import React from 'react';

function Footer() {
    return <footer className="footer">
        <p>© SASKO ART</p>
        <a href="javascript:window.document.cookieBanner.show()">Cookie-Banner anzeigen</a>
        <a href="/impressum.html" target="_blank">Impressum</a>
        <a href="/privacypolicy.html" target="_blank">Datenschutzerklärung</a>
    </footer>
}

export default Footer;