const path = require('path');

module.exports = {
  entry: './src/index.js', // Archivo principal de entrada de tu aplicación
  output: {
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida donde se guardarán los bundles
    filename: 'bundle.js', // Nombre del archivo de bundle
    publicPath: '/', // Ruta pública del servidor de desarrollo
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Usa babel-loader para transpilar archivos JS/JSX
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Inyecta estilos CSS en la página
          'css-loader', // Carga archivos CSS y resuelve las importaciones dentro de ellos
          'sass-loader', // Compila archivos SCSS en CSS
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Extensiones que se resolverán automáticamente
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Carpeta de contenido servido por el servidor de desarrollo
    compress: true, // Habilita la compresión gzip
    port: 3000, // Puerto en el que se ejecutará el servidor de desarrollo
    historyApiFallback: true, // Habilita la navegación de SPA (Single Page Application)
  },
};
