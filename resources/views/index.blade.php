<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-screen">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Jisui6</title>
        <link rel="icon" href="/favicon.ico">
        @viteReactRefresh
        @vite(['resources/css/app.css','resources/ts/index.tsx'])
    </head>
    <body class="h-screen">
        <div id="app" class="h-screen"></div>
    </body>
</html>