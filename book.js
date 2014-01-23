Users = new Meteor.Collection("users");

/* server */
if(Meteor.isServer){

    Meteor.startup(function(){
        console.log('서버 Started~!!');
    });

    Meteor.publish("users",function(){
        return Users.find({},{sort:{registDate:-1}});
    });

}

Meteor.methods({
    "create_user":function(usr){

        var row = {
            "userName" : usr.userName,
            "userEmail" : usr.userEmail,
            "userPhone" : usr.userPhone,
            "registDate" : Date.now()
        };
        console.log("create mode");
        if(row.userEmail.trim() === "") return {err:true,msg:"이메일 누락"};
        var result =  Users.insert(row);
        return {err:false,_id:result};
    }
    ,"update_user":function(usr){

        console.log( this.isSimulation );

        var row = {
            "userName" : usr.userName,
            "userEmail" : usr.userEmail,
            "userPhone" : usr.userPhone
            /* "registDate" : Date.now() */
        };
        console.log("update mode");
        console.log(row);
        return Users.update({_id:usr._id},{$set:row});
    }
    ,"remove_user":function(userId){
        console.log("remove_user : " + userId );
        return Users.remove({_id:userId});
    }
    ,"find_userinfo" : function(userId){
        console.log("find_userinfo : " + userId );
        return Users.findOne({_id:userId});
    }

});


/* client */
if(Meteor.isClient){

    Handlebars.registerHelper('timeago',function(time) {
        return moment(time).from();
        //return moment(time).format('MMMM Do YYYY, h:mm:ss a');
    });

    Meteor.autosubscribe(function(){
        Meteor.subscribe("users");
    });

    Template.userList.lists = function (){
        return Users.find({},{sort:{registDate:-1}}); //여기랑 서버쪽이랑 맞춰져야한다.
    };

    Template.userList.events = {
        "click button[name=remove]" : function(){
            userId = $(this).attr("_id");
            Meteor.call("remove_user",userId,function(err,result){
               console.log("삭제되었습니다.");
            });
        },

        "click button[name=adjust]" : function(){
            update_user($(this).attr("_id"));
        },

        "click #userListTable tr[name=regUser] button[name=cancel]" : function(){
            $("#userListTable tr[name=regUser]").hide();
            $("#userListTable tr[name=regUser] input[id^=user]").val("");
        },

        "click #userListTable tr[name=regUser] button[name=apply]" : function(){

            var usr = {};

            $("#userListTable tr[name=regUser] input[type=text]").each(function(idx,obj){
                console.log();
                usr[$(obj).attr("name")] = $(obj).val();
            });

            console.log(usr);

            Meteor.call("create_user",usr,function(err,result){
                if(result){
                    $("#userListTable tr[name=regUser] input[id^=user]").val("");
                    $("tr[name=regUser] input[type=text]").val("");
                    //$("tr[name=regUser]").hide();
                }else{
                    //alert(result);
                }
            });
        },
        "click #userListTable caption button" : function(){
            $("#userListTable tr[name=regUser] input[id^=user]").val("");
            $("#userListTable tr[name=regUser]").toggle();
            $("#userListTable tr[name=regUser] input[name=userName]").focus();
        }

    };

    update_user = function(_id){

        var usr = {};

        usr["_id"]=_id;

        $("tr[name="+_id+"] input[type=text]").each(function(idx,obj){

            if($(obj).attr("name"))
                usr[$(obj).attr("name")] = $(obj).val();

        });

        Meteor.call("update_user",usr,function(err,result){
            if(err){
                alert( err.message );
            }
        });

    }

}
/*test*/