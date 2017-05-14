<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">

</head>
<body>
    <div id="app" v-cloak>

        <nav class="uk-navbar-container" uk-navbar="mode: click">

            <div class="uk-navbar-left" v-if="authenticated">

                <ul class="uk-navbar-nav">
                    <li>
                        <router-link to="/"><span uk-icon="icon: home; ratio: 2"></span></router-link>
                    </li>
                </ul>

            </div>

            <div class="uk-navbar-center" v-if="authenticated">
                <search-diagram/>
            </div>

            <div class="uk-navbar-right">

                <navigation-auth/>

            </div>
        </nav>

        <router-view></router-view>
    </div>

    <!-- Scripts -->
    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
