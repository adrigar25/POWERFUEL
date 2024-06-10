// pages/404.js

import Link from 'next/link';

export default function Custom404() {
    return (
        <div>
            <h1>404 - Página no encontrada</h1>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
            
            <Link href="/">Volver a la página de inicio</Link>
        </div>
    );
}