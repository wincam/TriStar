<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="author" content="Cameron Nicolle">

    <title>TriStar</title>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angular-ui-router/1.0.0-rc.1/angular-ui-router.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min.js"></script>

    <!-- Modules -->
    <script type="text/javascript" src="/assets/tristar/tristar.module.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristarapi/tristarapi.module.js?compile=true"></script>

    <!-- Routes -->
    <script type="text/javascript" src="/assets/tristar/tristar.routes.js?compile=true"></script>

    <!-- Services -->
    <script type="text/javascript" src="/assets/tristarapi/tristarapi.service.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristarapi/tristarcontentdownloader.service.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristarapi/tristarcontentuploader.service.js?compile=true"></script>

    <!-- Controllers -->
    <script type="text/javascript" src="/assets/tristar/login/login.controller.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/signup/signup.controller.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/loggedinwindow/loggedinwindow.controller.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/home/home.controller.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/taskview/taskview.controller.js?compile=true"></script>

    <!-- Components -->
    <script type="text/javascript" src="/assets/tristar/taskview/taskview.component.js?compile=true"></script>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <link rel="stylesheet" href="/assets/styles.css">

</head>

<body ng-app="tristar" ng-strict-di="true">

    <ui-view></ui-view>
</body>
</html>
