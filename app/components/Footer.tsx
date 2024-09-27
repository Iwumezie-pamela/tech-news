import React from 'react'

function Footer() {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className="py-3">
            This website is designed by Pam © {year}
        </footer>
    )
}

export default Footer