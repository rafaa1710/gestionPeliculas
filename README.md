# Gestion Peliculas

Aplicacion web desarrollada con Angular 16 para consultar peliculas, gestionar favoritos y administrar usuarios mediante un backend propio. La app consume The Movie Database (TMDB) para obtener informacion de peliculas y utiliza una API PHP local para autenticacion, permisos, favoritos y gestion de usuarios.

## Caracteristicas

- Inicio de sesion con token almacenado en `localStorage`.
- Proteccion de rutas mediante `AuthGuard`.
- Listado de peliculas populares desde TMDB.
- Busqueda de peliculas por titulo.
- Ficha de detalle para cada pelicula.
- Gestion de peliculas favoritas por usuario.
- Panel de administracion de usuarios con alta, edicion, listado y borrado.
- Control de acceso administrativo para las rutas de usuarios.
- Interfaz construida con Angular Material.

## Tecnologias

- Angular 16.2
- TypeScript 5.1
- Angular Material y Angular CDK
- RxJS
- Karma + Jasmine para tests unitarios
- API externa de TMDB
- Backend PHP local para autenticacion y datos privados

## Requisitos Previos

Antes de ejecutar el proyecto necesitas tener instalado:

- Node.js
- npm
- Angular CLI

Puedes comprobarlo con:

```bash
node -v
npm -v
ng version
```

Si Angular CLI no esta instalado:

```bash
npm install -g @angular/cli
```

## Instalacion

Clona el repositorio o abre la carpeta del proyecto y ejecuta:

```bash
npm install
```

## Configuracion

El backend de este proyecto es `app.radfpd.es` y tambien esta disponible en GitHub: [rafaa1710/app.radfpd.es](https://github.com/rafaa1710/app.radfpd.es).

La configuracion principal del backend se encuentra en:

```text
src/environtments/environment.ts
```

Valores actuales:

```ts
export const URL_BASE = 'http://localhost:8000';
export const URL_API = `${URL_BASE}/app.radfpd.es/api/private`;
```

El frontend espera que el backend exponga estos endpoints:

- `POST /login.php`
- `POST /logout.php`
- `GET /permission.php`
- `POST /favoritas.php`
- `GET /usuario.php`
- `POST /usuario.php`
- `PUT /usuario.php`
- `DELETE /usuario.php?id={id}`

La API de TMDB se usa desde el servicio de peliculas para consultar peliculas populares, buscar por titulo y obtener detalles por ID.

## Ejecucion en Desarrollo

Para levantar el servidor de desarrollo:

```bash
npm start
```

Tambien puedes usar:

```bash
ng serve
```

La aplicacion quedara disponible en:

```text
http://localhost:4200/
```

## Scripts Disponibles

| Comando | Descripcion |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo de Angular. |
| `npm run build` | Compila la aplicacion para produccion en `dist/`. |
| `npm run watch` | Compila en modo observacion para desarrollo. |
| `npm test` | Ejecuta los tests unitarios con Karma y Jasmine. |

## Estructura del Proyecto

```text
src/
  app/
    auth/          Autenticacion, login, permisos y guardas de ruta.
    material/      Modulo centralizado de Angular Material.
    movies/        Listado, busqueda, detalle y favoritos de peliculas.
    shared/        Componentes compartidos, como la pagina 404.
    usuarios/      Gestion de usuarios para administradores.
  assets/          Recursos estaticos.
  environtments/   Configuracion de entorno.
```

## Rutas Principales

| Ruta | Descripcion | Acceso |
| --- | --- | --- |
| `/login` | Pantalla de inicio de sesion. | Publico |
| `/movies/list` | Listado de peliculas populares. | Usuario autenticado |
| `/movies/movie/:id` | Detalle de una pelicula. | Usuario autenticado |
| `/movies/search` | Busqueda de peliculas. | Usuario autenticado |
| `/movies/favorites` | Peliculas favoritas del usuario. | Usuario autenticado |
| `/users/list` | Listado de usuarios. | Administrador |
| `/users/add` | Creacion de usuario. | Administrador |
| `/users/edit/:id` | Edicion de usuario. | Administrador |
| `/users/delete/:id` | Eliminacion de usuario. | Administrador |

## Autenticacion y Permisos

Tras iniciar sesion, la aplicacion guarda datos de sesion en `localStorage`, incluyendo el token usado para enviar peticiones autenticadas al backend.

El `AuthGuard` valida:

- Que exista un token para acceder a rutas protegidas.
- Que el usuario tenga permisos de administrador cuando una ruta define `data: { requireAdmin: true }`.

Si el usuario no tiene acceso, se redirige a la pantalla correspondiente y se muestra una notificacion con Angular Material.

## Compilacion

Para generar una version lista para desplegar:

```bash
npm run build
```

Los archivos compilados se generaran en:

```text
dist/
```

## Tests

Para ejecutar los tests unitarios:

```bash
npm test
```

Angular abrira el entorno de Karma para ejecutar las pruebas configuradas.

## Notas de Desarrollo

- El proyecto usa lazy loading para los modulos de `auth`, `movies` y `usuarios`.
- La API privada se configura desde `environment.ts`.
- Las rutas de usuarios requieren permisos de administrador.
- Los favoritos se gestionan contra el endpoint `favoritas.php`.
- La carpeta de entorno esta nombrada como `environtments`; si se renombra, tambien deben actualizarse los imports existentes.

## Autor

Proyecto desarrollado por Rafael Garcia.


