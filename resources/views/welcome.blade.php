<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Family Finance</title>

    @production
        @php
            $manifest = json_decode(file_get_contents(public_path('js/manifest.json')), true);
        @endphp
        @foreach ($manifest['resources/js/main.js']['imports'] as $importName)
            <link rel="modulepreload" href="/js/{{ $manifest[$importName]['file'] }}" as="script">
        @endforeach
        @foreach ($manifest as $export)
            @if (isset($export['css']))
                @foreach ($export['css'] as $url)
                    <link rel="stylesheet" href="/js/{{ $url }}" />
                @endforeach
            @endif
        @endforeach
    @endproduction
</head>

<body>

    <div id="app"></div>

    @production
        @php
            $manifest = json_decode(file_get_contents(public_path('js/manifest.json')), true);
        @endphp
        <script type="module" src="/js/{{ $manifest['resources/js/main.js']['file'] }}"></script>
    @else
        <script type="module" src="http://localhost:3000/@vite/client"></script>
        <script type="module" src="http://localhost:3000/resources/js/main.js"></script>
    @endproduction
</body>

</html>
