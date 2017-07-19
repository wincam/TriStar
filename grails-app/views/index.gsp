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
    <script type="text/javascript" src="/assets/tristar/userlink/userlink.controller.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/user/user.controller.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/task/task.controller.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/tasklink/tasklink.controller.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/tasklist/tasklist.controller.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/team/team.controller.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/teamlink/teamlink.controller.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/createteam/createteam.controller.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/createtask/createtask.controller.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/userselectorbutton/userselectorbutton.controller.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/userselector/userselector.controller.js?compile=true"></script>

    <!-- Components -->
    <script type="text/javascript" src="/assets/tristar/taskview/taskview.component.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/userlink/userlink.component.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/tasklink/tasklink.component.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/tasklist/tasklist.component.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/teamlink/teamlink.component.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/userselectorbutton/userselectorbutton.component.js?compile=true"></script>
    <script type="text/javascript" src="/assets/tristar/userselector/userselector.component.js?compile=true"></script>

    <!-- Stylesheets -->
    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Font Awesome -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <link rel="stylesheet" href="/assets/styles.css">

</head>

<body ng-app="tristar" ng-strict-di="true">

    <ui-view></ui-view>

    <footer>
        <div class="container">
            <div class="row">
                <div class="col-xs-12 text-muted">
                    <a href="http://www.leagueoflogic.ca/" target="_blank">League of Logic - 5870</a> <a href="https://www.facebook.com/Team-5870-League-of-Logic-526261424196392" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a> <a href="https://twitter.com/frc5870" target="_blank"><i class="fa fa-twitter"></i></a> <a href="https://www.instagram.com/team5870" target="_blank"><i class="fa fa-instagram"></i></a>
                </div>
                <div class="col-xs-12 text-muted">
                    <a href="https://github.com/wincam/TriStar" target="_blank">Tristar <i class="fa fa-github" aria-hidden="true"></i></a>
                </div>
                <div class="col-xs-12 text-muted" id="copyright">&copy; Copyright 2017|Cameron Nicolle</div>
            </div>
        </div>
    </footer>

</body>
</html>
