<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>КрафтСнаб - Поставки металлопроката по всей России.</title>
    <meta name="description"
        content="Мы предлагаем широкий ассортимент металлопроката, соответствующего все требованиям ГОСТ, применяемого в строительных, промышленных и производственных целях." />
    <meta property="og:description"
        content="Мы предлагаем широкий ассортимент металлопроката, соответствующего все требованиям ГОСТ, применяемого в строительных, промышленных и производственных целях." />
    <!-- <link rel="stylesheet" href="/assets/fonts/stylesheet.css"> -->
    <link rel="icon" href="/favicon.png" />
    @routes
    @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>