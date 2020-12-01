# prueba-desarrollo-iavh

![image info](./preview.png)

Este repositorio contiene el código fuente de la solución para la Prueba de Desarrollo del Programa de Evaluación y Monitoreo de la Biodiversidad del Instituto Alexander von Humboldt.

La solución está construida utilizando Vue.js y el tablero de juego se dibuja con D3.js.

Para ver la aplicación en funcionamiento puede entrar al siguiente link: https://marcelo-villa-p.github.io/prueba-desarrollo-iavh/

## Enunciado
Desarrollar un juego de “Triqui” (Tic-tac-toe) con las siguientes características:

* Dos jugadores locales (se turnan el mouse para las jugadas).
* Las fichas **O** y **X** deben ser de colores diferentes.
* El juego debe finalizar cuando alguno de los jugadores gane o cuando empaten. Esto se debe indicar con una notificación.
* Se debe poder reiniciar el juego en cualquier momento.

## Instrucciones para despliegue local
Clone este repositorio y asegurese de tener `npm` instalado en su máquina. Para instalar las dependencias necesarias ejecute el siguiente comando desde la raíz del proyecto:
```
npm install
```

Una vez instaladas las dependencias, es necesario construir el directorio con los archivos de despliegue. Para esto ejecute el siguiente comando:
```
npm run build
```

Una vez creado el directorio `dist` es necesario desplegar la aplicación por medio del protocolo HTTP. Una forma de hacer esto es instalando el servidor de archivos estáticos de Node.js. Para esto ejecute:
```
npm install -g serve
```

Por último ejecute:
```
serve -s dist
```

Esto iniciará una instancia en `http://localhost:<puerto>` la cual podrá abrir localmente desde su navegador.
