# Portfolio Website

Full build and deployment system for the Portfolio "CraftCMS" website.

## Requirements

- [DDEV](https://ddev.com/get-started/)
- [Node](https://nodejs.org/en/download)
- NPM

## Local Development Setup

- Clone the repository into your chosen local development folder
- Install the required npm modules using `npm install`
- Spin up the local development server using `ddev start`
- Install the required composer modules using `ddev exec composer install`
- Restore the initial db using `ddev exec php craft db/restore ./db/initialdb.sql`
- Create a new Admin `ddev exec php craft users/create --admin 1 --email [EMAILADDRESS] --username [USERNAME] --password [PASSWORD]`

## Development & Build System

### Run the Development System

- Use `npx tailwindcss -i ./src/css/main.css -o ./web/assets/css/portfolio.css --watch` - This compiles existing TailwindCSS files.
- Use `npm run dev` - This starts browsersync and ddev start.
- To end the development session use `Ctrl-C` to cancel the npx task, and `DDEV stop` to shutdown the container

## Access & Interacting with the site (No Development)

- Make sure the DDEV server is up and running ddev
- Frontend [https://portfolio-craft.ddev.site](https://portfolio-craft.ddev.site)
- Control Panel [https://portfolio-craft.ddev.site/admin](https://portfolio-craft.ddev.site/admin)
