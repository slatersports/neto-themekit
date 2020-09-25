<p align="center">
    <h1 align="center">Neto Theme Kit</h3>
</p>

Neto Theme Kit is a cross-platform tool for building and deploying Neto Themes. Heavily inspired by Shopify's [Theme Kit](https://github.com/Shopify/themekit).

## Features
- Upload to multiple environments
- Download remote themes to local
- Watch for local changes and upload automatically to Shopify

## Installation
```
npm install -g neto-themekit
```
OR 
```
yarn install -g neto-themekit
```

## Usage
Make sure your working directory is the theme folder itself.
### Configure
Configure a set of SFTP credentials for your Neto store(s).
```
ntheme configure -u SFTP_USERNAME -p SFTP_PASSWORD -t THEME_NAME
```
This will create a ntheme.yaml file in your current directory which will be used to connect to your store.

You can configure multiple environments to work with different themes or stores by adding the `e` or `environment` flag and the name of your environment. The default is `development`.

### Watch
Watch your current directory for changes and upload them to your theme folder.
```
ntheme watch
```

### Download
Download an existing theme to your current directory.
```
ntheme download THEME_NAME
```

### Deploy
Upload everything in your current directory to your theme folder. If an existing theme exists with the same name as the one in your environment then a temporary folder will be created to upload your new version and the folders will be renamed after the upload is complete.
```
ntheme deploy
```
