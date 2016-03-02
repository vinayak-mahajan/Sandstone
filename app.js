'use strict';

var PROJECT_SERVICE = 'ProjectService';
// Declare app level module which depends on filters, and services
var app = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.load',
    'ui.jq',
    'ui.validate',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'app.filters',
    'app.services',
    'app.directives',
    'app.controllers',
    'slick',
    'ab-base64'
  ]);

app.run(
  [          '$rootScope' ,'$state', '$stateParams', '$modal',
      function ($rootScope,   $state,   $stateParams,   $modal) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        app.value('isMock', true);

        $rootScope.createGuid = function(){
            return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            })
            )
        }

        $rootScope.showLoadingModal = function(loadingMessage){
            var modalInstance = $modal.open({
                templateUrl: 'loadingModal.html',
                controller: 'LoadingModalInstanceCtrl',
                backdrop: 'static' ,
                resolve: {
                    loadingMessage : function(){
                        return loadingMessage;
                    }
                }     
            });
        }

        $rootScope.closeLoadingModal = function(){
            $('#loadingModalBtn').trigger('click');
        }

        $rootScope.statuses = ['Active','Inactive','In Progress'];

    }
  ]
)
.config(
  [          '$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',  '$httpProvider',
    function ($stateProvider,   $urlRouterProvider,   $controllerProvider,   $compileProvider,   $filterProvider,   $provide,   $httpProvider) {
        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];        
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;

        $urlRouterProvider
           /* .when('/', {
                controller: 'LoginController',
                templateUrl: 'tpl/login.html'
            })*/

            .otherwise('/access/signup');

        $stateProvider
            
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'tpl/app.html'
            })  

            $stateProvider
            .state('app.dashboard-v1', {
                url: '/dashboard-v1',
                templateUrl: 'tpl/app_dashboard_v1.html'
            })

             $stateProvider        
            .state('app.dashboard-v2', {
                url: '/dashboard-v2',
                templateUrl: 'tpl/app_dashboard_v2.html'
            })

             $stateProvider
            .state('app.ui', {
                url: '/ui',
                template: '<div ui-view class="fade-in-up"></div>'
            })

             $stateProvider
            .state('app.ui.buttons', {
                url: '/buttons',
                templateUrl: 'tpl/ui_buttons.html'
            })

             $stateProvider
            .state('app.ui.icons', {
                url: '/icons',
                templateUrl: 'tpl/ui_icons.html'
            })

             $stateProvider
            .state('app.ui.grid', {
                url: '/grid',
                templateUrl: 'tpl/ui_grid.html'
            })

             $stateProvider
            .state('app.ui.widgets', {
                url: '/widgets',
                templateUrl: 'tpl/ui_widgets.html'
            })

             $stateProvider
            .state('app.ui.bootstrap', {
                url: '/bootstrap',
                templateUrl: 'tpl/ui_bootstrap.html'
            })

             $stateProvider
            .state('app.ui.sortable', {
                url: '/sortable',
                templateUrl: 'tpl/ui_sortable.html'
            })

             $stateProvider
            .state('app.ui.portlet', {
                url: '/portlet',
                templateUrl: 'tpl/ui_portlet.html'
            })

             $stateProvider
            .state('app.ui.timeline', {
                url: '/timeline',
                templateUrl: 'tpl/ui_timeline.html'
            })

             $stateProvider
            .state('app.ui.tree', {
                url: '/tree',
                templateUrl: 'tpl/ui_tree.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(
                            {
                                name: 'angularBootstrapNavTree',
                                files: ['js/modules/abn_tree/abn_tree_directive.js',
                                        'js/modules/abn_tree/ctrl.js',
                                        'js/modules/abn_tree/abn_tree.css'] 
                            }
                        );
                    }]
                }
            })

             $stateProvider
            .state('app.ui.toaster', {
                url: '/toaster',
                templateUrl: 'tpl/ui_toaster.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad){
                        return $ocLazyLoad.load('toaster').then(
                            function(){
                               return $ocLazyLoad.load('js/modules/toaster/ctrl.js');
                            }
                        );
                    }]
                }
            })

             $stateProvider
            .state('app.ui.jvectormap', {
                url: '/jvectormap',
                templateUrl: 'tpl/ui_jvectormap.html'
            })

             $stateProvider
            .state('app.ui.googlemap', {
                url: '/googlemap',
                templateUrl: 'tpl/ui_googlemap.html',
                resolve: {
                    deps: ['uiLoad',
                      function( uiLoad ){
                        return uiLoad.load( ['js/app/map/load-google-maps.js',
                                                'js/modules/ui-map.js',
                                                'js/app/map/map.js'] ).then(function(){ return loadGoogleMaps(); });
                    }]
                }
            })

             $stateProvider
            .state('app.chart', {
                url: '/chart',
                templateUrl: 'tpl/ui_chart.html'
            })
            // table

             $stateProvider
            .state('app.table', {
                url: '/table',
                template: '<div ui-view></div>'
            })

             $stateProvider
            .state('app.table.static', {
                url: '/static',
                templateUrl: 'tpl/table_static.html'
            })

             $stateProvider
            .state('app.table.datatable', {
                url: '/datatable',
                templateUrl: 'tpl/table_datatable.html'
            })

             $stateProvider
            .state('app.table.footable', {
                url: '/footable',
                templateUrl: 'tpl/table_footable.html'
            })

             $stateProvider
            .state('app.table.grid', {
                url: '/grid',
                templateUrl: 'tpl/table_grid.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load('ngGrid').then(
                            function(){
                                return $ocLazyLoad.load('js/modules/ng-grid/ctrl.js');
                            }
                        );
                    }]
                }
            })
            // form

             $stateProvider
            .state('app.form', {
                url: '/form',
                template: '<div ui-view class="fade-in"></div>'
            })

             $stateProvider
            .state('app.form.elements', {
                url: '/elements',
                templateUrl: 'tpl/form_elements.html'
            })

             $stateProvider
            .state('app.form.validation', {
                url: '/validation',
                templateUrl: 'tpl/form_validation.html'
            })

             $stateProvider
            .state('app.form.wizard', {
                url: '/wizard',
                templateUrl: 'tpl/form_wizard.html'
            })

             $stateProvider
            .state('app.form.fileupload', {
                url: '/fileupload',
                templateUrl: 'tpl/form_fileupload.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(
                            {
                                name: 'angularFileUpload',
                                files: ['js/modules/angular-file-upload/angular-file-upload.js',
                                        'js/modules/angular-file-upload/ctrl.js' ]
                            }
                        );
                    }]
                }
            })

             $stateProvider
            .state('app.form.imagecrop', {
                url: '/imagecrop',
                templateUrl: 'tpl/form_imagecrop.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(
                            {
                                name: 'ngImgCrop',
                                files: ['js/modules/ngImgCrop/ng-img-crop.css',
                                        'js/modules/ngImgCrop/ng-img-crop.js',
                                        'js/modules/ngImgCrop/ctrl.js' ]
                            }
                        );
                    }]
                }
            })
            // pages

             $stateProvider
            .state('app.page', {
                url: '/page',
                template: '<div ui-view class="fade-in-down"></div>'
            })

             $stateProvider
            .state('app.page.profile', {
                url: '/profile',
                templateUrl: 'tpl/page_profile.html'
            })

             $stateProvider
            .state('app.page.post', {
                url: '/post',
                templateUrl: 'tpl/page_post.html'
            })

             $stateProvider
            .state('app.page.search', {
                url: '/search',
                templateUrl: 'tpl/page_search.html'
            })

             $stateProvider
            .state('app.page.invoice', {
                url: '/invoice',
                templateUrl: 'tpl/page_invoice.html'
            })

             $stateProvider
            .state('app.page.price', {
                url: '/price',
                templateUrl: 'tpl/page_price.html'
            })

             $stateProvider
            .state('app.docs', {
                url: '/docs',
                templateUrl: 'tpl/docs.html'
            })
            // others

             $stateProvider
            .state('lockme', {
                url: '/lockme',
                templateUrl: 'tpl/page_lockme.html'
            })

             $stateProvider
            .state('access', {
                url: '/access',
                template: '<div ui-view class="fade-in-right-big smooth"></div>'
            })

             $stateProvider
            .state('access.signin', {
                url: '/accesssignin',
                templateUrl: 'tpl/project/signin.html'
            })

             $stateProvider
            .state('access.signup', {
                url: '/signup',
                templateUrl: 'tpl/project/signup.html'
            })

             $stateProvider
            .state('access.forgotpwd', {
                url: '/forgotpwd',
                templateUrl: 'tpl/page_forgotpwd.html'
            })
            .state('access.404', {
                url: '/404',
                templateUrl: 'tpl/page_404.html'
            })

            // fullCalendar
            .state('app.calendar', {
                url: '/calendar',
                templateUrl: 'tpl/app_calendar.html',
                // use resolve to load other dependences
                resolve: {
                    deps: ['uiLoad',
                      function( uiLoad ){
                        return uiLoad.load( ['js/jquery/fullcalendar/fullcalendar.css',
                                             'js/jquery/fullcalendar/theme.css',
                                             'js/jquery/jquery-ui-1.10.3.custom.min.js',
                                             'js/libs/moment.min.js',
                                             'js/jquery/fullcalendar/fullcalendar.min.js',
                                             'js/modules/ui-calendar.js',
                                             'js/app/calendar/calendar.js']);
                    }]
                }
            })

            // mail
            .state('app.mail', {
                abstract: true,
                url: '/mail',
                templateUrl: 'tpl/mail.html',
                // use resolve to load other dependences
                resolve: {
                    deps: ['uiLoad',
                      function( uiLoad ){
                        return uiLoad.load( ['js/app/mail/mail.js',
                                             'js/app/mail/mail-service.js',
                                             'js/libs/moment.min.js'] );
                    }]
                }
            })
            .state('app.mail.list', {
                url: '/inbox/{fold}',
                templateUrl: 'tpl/mail.list.html'
            })
            .state('app.mail.detail', {
                url: '/{mailId:[0-9]{1,4}}',
                templateUrl: 'tpl/mail.detail.html'
            })
            .state('app.mail.compose', {
                url: '/compose',
                templateUrl: 'tpl/mail.new.html'
            })

            .state('layout', {
                abstract: true,
                url: '/layout',
                templateUrl: 'tpl/layout.html'
            })
            .state('layout.fullwidth', {
                url: '/fullwidth',
                views: {
                    '': {
                        templateUrl: 'tpl/layout_fullwidth.html'
                    },
                    'footer': {
                        templateUrl: 'tpl/layout_footer_fullwidth.html'
                    }
                }
            })
            .state('layout.mobile', {
                url: '/mobile',
                views: {
                    '': {
                        templateUrl: 'tpl/layout_mobile.html'
                    },
                    'footer': {
                        templateUrl: 'tpl/layout_footer_mobile.html'
                    }
                }
            })
            .state('layout.app', {
                url: '/app',
                views: {
                    '': {
                        templateUrl: 'tpl/layout_app.html'
                    },
                    'footer': {
                        templateUrl: 'tpl/layout_footer_fullwidth.html'
                    }
                }
            })
            .state('apps', {
                abstract: true,
                url: '/apps',
                templateUrl: 'tpl/layout.html'
            })
            .state('apps.note', {
                url: '/note',
                templateUrl: 'tpl/apps_note.html',
                resolve: {
                    deps: ['uiLoad',
                      function( uiLoad ){
                        return uiLoad.load( ['js/app/note/note.js',
                                             'js/libs/moment.min.js'] );
                    }]
                }
            })
            .state('apps.contact', {
                url: '/contact',
                templateUrl: 'tpl/apps_contact.html',
                resolve: {
                    deps: ['uiLoad',
                      function( uiLoad ){
                        return uiLoad.load( ['js/app/contact/contact.js'] );
                    }]
                }
            })
            .state('app.weather', {
                url: '/weather',
                templateUrl: 'tpl/apps_weather.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(
                            {
                                name: 'angular-skycons',
                                files: ['js/app/weather/skycons.js',
                                        'js/libs/moment.min.js', 
                                        'js/app/weather/angular-skycons.js',
                                        'js/app/weather/ctrl.js' ] 
                            }
                        );
                    }]
                }
            })
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'tpl/project/dashboard.html',
                resolve: {
                    deps: ['uiLoad',
                        function(uiLoad){
                            return uiLoad.load(['js/app/project/dashboard.js'])
                    }]
                }
            })  
            //custom
            .state('app.projectinfo',{
                url: '/project/info',
                templateUrl: 'tpl/project/project_info.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load('ngGrid').then(
                            function(){
                                return $ocLazyLoad.load(['js/app/project/info.js',
                                    'js/modules/ng-grid/ctrl.js']);
                            }
                        );
                    }]
                }
            })
            .state('app.projectadd',{
                url: '/project/add',
                templateUrl: 'tpl/project/add.html',
                resolve: {
                    deps: ['uiLoad',
                        function(uiLoad){
                            return uiLoad.load(['js/app/project/add.js']);
                    }]
                }
            })
            .state('app.projectworkflowdetails',{
                url: '/workflow/details',
                templateUrl: 'tpl/project/workflow_details.html',
                resolve: {
                    deps: ['uiLoad',
                        function(uiLoad){
                            return uiLoad.load(['js/app/project/workflow_details.js'])
                    }]
                }
            })
            .state('app.projectworkflowsteps',{
                url: '/workflow/steps',
                templateUrl: 'tpl/project/workflow.html',
                resolve: {
                    deps: ['uiLoad',
                        function(uiLoad){
                            return uiLoad.load(['js/app/project/workflow_steps.js'])
                    }]
                }
            })
            .state('app.runlogs',{
                url: '/runlogs',
                templateUrl: 'tpl/project/runlogs.html',
                resolve: {
                    deps: ['uiLoad',
                        function(uiLoad){
                            return uiLoad.load(['js/app/project/runlogs.js'])
                    }]
                }
            })
            .state('app.analysis',{
                url: '/analysis',
                templateUrl: 'tpl/project/analysis.html',
                resolve: {
                    deps: ['uiLoad',
                        function(uiLoad){
                            return uiLoad.load(['js/app/project/analysis.js'])
                    }]
                }
            })
            .state('app.settings',{
                url: '/settings',
                templateUrl: 'tpl/project/settings.html',
                resolve: {
                    deps: ['uiLoad',
                        function(uiLoad){
                            return uiLoad.load(['js/app/project/settings.js'])
                    }]
                }
            })

             $stateProvider   
            .state('signin', {
                url: '/signin',
                templateUrl: 'tpl/project/signin.html'
            }) 
  
            
    }
  ]
)

// translate config
.config(['$translateProvider', function($translateProvider){

  // Register a loader for the static files
  // So, the module will search missing translation tables under the specified urls.
  // Those urls are [prefix][langKey][suffix].
  $translateProvider.useStaticFilesLoader({
    prefix: 'l10n/',
    suffix: '.js'
  });

  // Tell the module what language to use by default
  $translateProvider.preferredLanguage('en');

  // Tell the module to store the language in the local storage
  $translateProvider.useLocalStorage();

}])

/**
 * jQuery plugin config use ui-jq directive , config the js and css files that required
 * key: function name of the jQuery plugin
 * value: array of the css js file located
 */
.constant('JQ_CONFIG', {
    easyPieChart:   ['js/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
    sparkline:      ['js/jquery/charts/sparkline/jquery.sparkline.min.js'],
    plot:           ['js/jquery/charts/flot/jquery.flot.min.js', 
                        'js/jquery/charts/flot/jquery.flot.resize.js',
                        'js/jquery/charts/flot/jquery.flot.tooltip.min.js',
                        'js/jquery/charts/flot/jquery.flot.spline.js',
                        'js/jquery/charts/flot/jquery.flot.orderBars.js',
                        'js/jquery/charts/flot/jquery.flot.pie.min.js'],
    slimScroll:     ['js/jquery/slimscroll/jquery.slimscroll.min.js'],
    sortable:       ['js/jquery/sortable/jquery.sortable.js'],
    nestable:       ['js/jquery/nestable/jquery.nestable.js',
                        'js/jquery/nestable/nestable.css'],
    filestyle:      ['js/jquery/file/bootstrap-filestyle.min.js'],
    slider:         ['js/jquery/slider/bootstrap-slider.js',
                        'js/jquery/slider/slider.css'],
    chosen:         ['js/jquery/chosen/chosen.jquery.min.js',
                        'js/jquery/chosen/chosen.css'],
    TouchSpin:      ['js/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                        'js/jquery/spinner/jquery.bootstrap-touchspin.css'],
    wysiwyg:        ['js/jquery/wysiwyg/bootstrap-wysiwyg.js',
                        'js/jquery/wysiwyg/jquery.hotkeys.js'],
    dataTable:      ['js/jquery/datatables/jquery.dataTables.min.js',
                        'js/jquery/datatables/dataTables.bootstrap.js',
                        'js/jquery/datatables/dataTables.bootstrap.css'],
    vectorMap:      ['js/jquery/jvectormap/jquery-jvectormap.min.js', 
                        'js/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                        'js/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                        'js/jquery/jvectormap/jquery-jvectormap.css'],
    footable:       ['js/jquery/footable/footable.all.min.js',
                        'js/jquery/footable/footable.core.css']
    }
)

// modules config
.constant('MODULE_CONFIG', {
    select2:        ['js/jquery/select2/select2.css',
                        'js/jquery/select2/select2-bootstrap.css',
                        'js/jquery/select2/select2.min.js',
                        'js/modules/ui-select2.js']
    }
)

// oclazyload config
.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    // We configure ocLazyLoad to use the lib script.js as the async loader
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: [
            {
                name: 'ngGrid',
                files: [
                    'js/modules/ng-grid/ng-grid.min.js',
                    'js/modules/ng-grid/ng-grid.css',
                    'js/modules/ng-grid/theme.css'
                ]
            },
            {
                name: 'toaster',
                files: [                    
                    'js/modules/toaster/toaster.js',
                    'js/modules/toaster/toaster.css'
                ]
            }
        ]
    });
}])
;