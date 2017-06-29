<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <title>TriStar</title>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angular-ui-router/1.0.0-rc.1/angular-ui-router.min.js"></script>

    <!-- Modules -->
    <script type="text/javascript" src="/assets/tristar/tristar.module.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristarapi/tristarapi.module.js?compile=true"></script>

    <!-- Routes -->
    <script type="text/javascript" src="/assets/tristar/tristar.routes.js?compile=true"></script>

    <!-- Services -->
    <script type="text/javascript" src="/assets/tristarapi/tristarapi.service.js?compile=true"></script>

    <!-- Controllers -->
    <script type="text/javascript" src="/assets/tristar/login/login.controller.js?compile=true"></script>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

</head>

<body ng-app="tristar">

    <ui-view></ui-view>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
</body>
</html>
