'use strict';

/* Services */


// Demonstrate how to register services

var services = angular.module('app.services', []);

services.service('ProjectService', function($http, isMock,  $timeout, $localStorage,  $rootScope) {

  var ProjectService = {};

  ProjectService.GetProjectOwners = function(successCallback, errorCallback) {
  	if(isMock){  		

      var Person  = Parse.Object.extend("Person");
      var query  = new Parse.Query(Person);
      query.find().then(function(list){
        //console.log("person list found " + list.length);
        var owners = [];
        list.forEach(function(item){
          var owner = item.toJSON();
          owner.id = owner.objectId;
          owners.push(owner);
        });

        successCallback(owners);
      },function(error){
        console.log("ERROR");
        errorCallback(error);
      });

  	}
    
  };

  ProjectService.GetProjects = function(successCallback, errorCallback){
  	if(isMock){

        var Project = Parse.Object.extend("Project");
        var query  = new Parse.Query(Project);
        query.find().then(function(list){
          // console.log("list found " + list.length);

          var projects = [];
          list.forEach(function(item){
            var proj = item.toJSON();
            proj.id = proj.objectId;
            projects.push(proj);
          });

          successCallback(projects);

        },function(error){
          console.log("ERROR");
          errorCallback(error);
        });


  		// $timeout(function(){
  		// 	$http.get('js/mockdata/projects.json').then(function (resp) {
	  	// 		//successCallback(resp.data);          
	  	// 	});
  		// },1000);
  	}
  }

  ProjectService.AddProject = function(newProject, successCallback, errorCallback ){
    if(isMock){
      // var projects = [];
      // if($localStorage.projects){
      //   projects = JSON.parse(angular.toJson($localStorage.projects));
      // }
      // //now add to projects and assign back to local storage
      // projects.push(newProject);
      // $localStorage.projects = projects;
      // $timeout(function(){
      //   successCallback("Success");
      // },1000);

      //save to parse
      var Project = Parse.Object.extend("Project");
      var projectObj = new Project();

      projectObj.save(newProject).then(function(object){
        var newlyAddedProj = object.toJSON();
        newlyAddedProj.id = newlyAddedProj.objectId;
        successCallback(newlyAddedProj);
      },function(error){
        errorCallback(error);
      });

    }
  }

  ProjectService.UpdateProject = function(projectId, updatedProjectObj, successCallback, errorCallback){

    var Project = Parse.Object.extend("Project");
    var query = new Parse.Query(Project);
    query.get(projectId, {
      success: function(projectObj) {
        // The object was retrieved successfully.
        console.log('retrieved project '+ projectId + 'for update');

        Object.keys(projectObj.attributes).forEach(function(key){
          projectObj.set(key, updatedProjectObj[key]);
        })
        

        projectObj.save(null, {
          success: function(updatedObjFromServer){
            console.log('udpated project '+projectId + ' successfully');
            var newObject = updatedObjFromServer.toJSON();
            newObject.id = newObject.objectId;
            successCallback(newObject);
          },
          error: function(updatedObject, error){
            errorCallback(error);
          }
        });
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        errorCallback(error);
      }
    });
  }

  ProjectService.AddWorkflow = function(projectId, workflowObj, successCallback, errorCallback){

    var Project = Parse.Object.extend("Project");
    var query = new Parse.Query(Project);
    query.get(projectId, {
      success: function(projectObj) {
        // The object was retrieved successfully.
        console.log('retrieved project '+ projectId + 'for update');

        var workflowsArray = [];
        if(projectObj.get('workflows')){
          workflowsArray = projectObj.get('workflows');
        }
        workflowsArray.push(workflowObj);

        projectObj.set('workflows', workflowsArray);

        projectObj.save(null, {
          success: function(updatedObject){
            console.log('udpated project '+projectId + ' successfully');
            var newObject = updatedObject.toJSON();
            newObject.id = newObject.objectId;
            successCallback(newObject);
          },
          error: function(updatedObject, error){
            errorCallback(error);
          }
        })
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        errorCallback(error);
      }
    });


  }

  ProjectService.DeleteWorkflow = function(projectId, workflowId, successCallback, errorCallback){

    var Project = Parse.Object.extend("Project");
    var query = new Parse.Query(Project);
    query.get(projectId, {
      success: function(projectObj) {
        // The object was retrieved successfully.
        console.log('retrieved project '+ projectId + 'for update');

        var workflowsArray = projectObj.get('workflows');
        //get and remove workflow
        var index = 0;
        for(var count = 0; count < workflowsArray.length; count ++){
          if(workflowsArray[count].id == workflowId){
            index = count;
            break;
          }
        }
        
        workflowsArray.splice(index,1);
        projectObj.set('workflows', workflowsArray);

        projectObj.save(null, {
          success: function(updatedObject){
            console.log('udpated project '+projectId + ' successfully');
            var newObject = updatedObject.toJSON();
            newObject.id = newObject.objectId;
            successCallback(newObject);
          },
          error: function(updatedObject, error){
            errorCallback(error);
          }
        })
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        errorCallback(error);
      }
    });


  }

  ProjectService.UpdateStepsOfWorkflow = function(projectId, workflowId, stepsArray,controllerIdsArray, successCallback, errorCallback){

    var Project = Parse.Object.extend("Project");
    var query = new Parse.Query(Project);
    query.get(projectId, {
      success: function(projectObj) {
        // The object was retrieved successfully.
        console.log('retrieved project '+ projectId + 'for AddStepsToWorkflow');

        var workflowsArray = projectObj.get('workflows');
        for(var count = 0; count < workflowsArray.length; count ++){
          if(workflowsArray[count].id == workflowId){
            workflowsArray[count].steps = stepsArray;
            break;
          }
        }

        projectObj.set('workflows',workflowsArray);
        if(controllerIdsArray){
          projectObj.set('controllerIds',controllerIdsArray);
        }
        

        
        projectObj.save(null, {
          success: function(updatedObject){
            console.log('udpated project '+projectId + ' successfully');
            var newObject = updatedObject.toJSON();
            newObject.id = newObject.objectId;
            successCallback(newObject);
          },
          error: function(updatedObject, error){
            errorCallback(error);
          }
        })
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        errorCallback(error);
      }
    });
  }

  ProjectService.DeleteProject = function(projectId, successCallback, errorCallback){

    var Project = Parse.Object.extend("Project");
    var query = new Parse.Query(Project);
    query.get(projectId, {
      success: function(projectObj) {
        // The object was retrieved successfully.
        //Now call destroy method on it
        console.log('retrieved project '+ projectId + 'for deletion');

        projectObj.destroy({
          success: function(deletedProjectObj){
            console.log('deleted project '+projectId + ' successfully');
            successCallback();

          },
          error: function(deletedProjectObj, error){
            errorCallback(error);
          }
        })
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        errorCallback(error);
      }
    });

  }

  ProjectService.StartManualExecution = function(workflowId, projectId, runObj, successCallback, errorCallback){

    var service = {};    
    var baseUrl = 'http://192.168.152.13:3000/triggers?';
    var req = {
     method: 'POST',
     url: ''
    };

    ///triggers?projectId=123&workflowId=456&action=execute
    req.url = baseUrl + 'projectId='+projectId + '&workflowId=' + workflowId + '&action=execute';
    req.data = JSON.parse(angular.toJson(runObj));

    $http(req).success(function(data, status){
      console.log('success StartManualExecution');
      successCallback(data);
    }).error(function(error, status){
      console.log('error StartManualExecution')
      errorCallback(error, status);
    });

  }

  ProjectService.GetAllRuns = function(successCallback, errorCallback){
    
    var Run = Parse.Object.extend("Run");
    var query  = new Parse.Query(Run);
    query.descending("createdAt");
    query.find().then(function(list){
        
        var runs = [];
        list.forEach(function(item){
            var run = item.toJSON();
            run.id = run.objectId;
            runs.push(run);
        });
        
        successCallback(runs);
        
    },function(error){
        console.log("ERROR");
        errorCallback(error);
    });
  }

  ProjectService.GetRunsForProject = function(projectId, successCallback, errorCallback){
    
    var Run = Parse.Object.extend("Run");
    var query  = new Parse.Query(Run);
    query.exists("containerId");
    query.equalTo("projectId", projectId);
    query.descending("updatedAt");
    query.find().then(function(list){
        
        var runs = [];
        list.forEach(function(item){
            var run = item.toJSON();
            run.id = run.objectId;
            runs.push(run);
        });
        
        successCallback(runs);
        
    },function(error){
        console.log("ERROR");
        errorCallback(error);
    });
  }

  return ProjectService;
});



services.service('AuthenticationService', function($http, isMock,  $timeout, $localStorage,  $rootScope) {

  var AuthenticationService = {};

  AuthenticationService.SignUp = function(uname, password, successCallback, errorCallback){

   //username and email are same
    var user = new Parse.User();
    user.set("username", uname);
    user.set("password", password);
    user.set("email", uname);

    user.signUp(null).then(function(user){
      
      var object = user.toJSON();
      object.id = object.objectId;
      successCallback(object);

    },function(user, error){
      console.log("Error: " + error.code + " " + error.message);
      errorCallback(error);
    });  
  }     

  AuthenticationService.LogIn = function(uname, password, successCallback,  errorCallback){

      $timeout(function(){
                var response = { success: uname === 'abcd@test.com' && password === 'test' };
                if(!response.success) {
                    response.message = 'Username or password is incorrect';
                }
                successCallback(response);
            }, 1000);
    }

    AuthenticationService.SetCredentials = function (uname, password) {

            $rootScope.globals = {
                currentUser: {
                    username: uname,
                    password:password
                }
            };
        };

    AuthenticationService.ClearCredentials = function () {
            $rootScope.globals = {};
        };    

/*
    Parse.User.logIn(uname,password).then(function(user){
      
      var object = user.toJSON();
      object.id = object.objectId;
      successCallback(object);

    },function(error){
      errorCallback(error);
    });  */


  return AuthenticationService;
});


services.service('VSOService', function($http, isMock,  $timeout, $localStorage,  $rootScope, base64) {

  var VSOService = {};
  var proxyUrl = 'http://localhost:3000/';
  var serviceHookUrl = 'http://54.67.72.30:3000/vso/subscriptions';
  var reqOptions = {
   method: 'GET',
   url: '',
   headers: {
     'Authorization': ''
   }
  };

  VSOService.GetBuildDefinitions = function(vsoUrl, username, password, projectName, successCallback, errorCallback){
    var req = {};
    angular.copy(reqOptions, req);
    req.url = proxyUrl + vsoUrl + '/DefaultCollection/'+ projectName +'/_apis/build/definitions?api-version=1.0';
    var str = username +':'+password;
    req.headers.Authorization = 'Basic ' + base64.encode(str);

    $http(req).success(function(data, status){
      console.log('success GetBuildDefinitions');
      successCallback(data);
    }).error(function(error, status){
      console.log('error GetBuildDefinitions')
      errorCallback(error);
    });

  }

  VSOService.CreateSubscription = function(vsoUrl, username, password, definitionName, projectId, successCallback, errorCallback){
    var data = {
      "publisherId": "tfs",
      "eventType": "build.complete",
      "resourceVersion": "1.0-preview.1",
      "consumerId": "webHooks",
      "consumerActionId": "httpRequest",
      "publisherInputs": {
        "buildStatus": "Succeeded",
        "definitionName": definitionName,
        "projectId": projectId
      },
      "consumerInputs": {
        "url": serviceHookUrl
      }
    };

    var req = {};
    angular.copy(reqOptions, req);
    req.method = 'POST';
    req.data = data;
    req.url = proxyUrl + vsoUrl + '/DefaultCollection'+ '/_apis/hooks/subscriptions?api-version=1.0';
    var str = username +':'+password;
    req.headers.Authorization = 'Basic ' + base64.encode(str);

    $http(req).success(function(data, status){
      console.log('success CreateSubscription');
      successCallback(data);
    }).error(function(error, status){
      console.log('error CreateSubscription')
      errorCallback(error);
    });

  }

  VSOService.RemoveSubscription = function(vsoUrl, username, password,  subscriptionId, successCallback,  errorCallback){
    var req = {};
    angular.copy(reqOptions, req);
    req.method = 'DELETE';    
    req.url = proxyUrl + vsoUrl + '/DefaultCollection'+ '/_apis/hooks/subscriptions/' + subscriptionId + '?api-version=1.0';
    var str = username +':'+ password;
    req.headers.Authorization = 'Basic ' + base64.encode(str);

    $http(req).success(function(data, status){
      console.log('success RemoveSubscription');
      successCallback(data);
    }).error(function(error, status){
      console.log('error RemoveSubscription')
      errorCallback(error);
    });
  }

  return VSOService;
});

