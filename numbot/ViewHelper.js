const {CardFactory} = require('botbuilder');
class ViewHelper {
    constructor(resultObject){
        this.body = resultObject;
        
    }
    // uruunii medeelel
    createRoomInfo(){
            var cardData={
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.2",
            "body": []
            };
        for (var i=0; i < this.body.results.bindings.length; i++){
            var instance = this.body.results.bindings[i];
            cardData["body"].push({
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "items": [
                            {
                                "type": "Image",
                                "url": "https://image.flaticon.com/icons/png/512/2232/2232649.png",
                                "size": "Small",
                                "style": "Person"
                            }
                        ],
                        "width": "auto"
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": instance.type.value+" "+instance.number.value,
                                "weight": "Bolder",
                                "size": "Medium",
                                "fontType": "Default",
                                "height": "stretch"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "FactSet",
                "facts": [
                    {
                        "title": "Харьяалагдах тэнхим:",
                        "value": instance.dep.value
                    },
                    {
                        "title": "Суудлын тоо:",
                        "value": instance.seat.value
                    },
                    {
                        "title": "Проектор:",
                        "value": instance.val.value
                    },
                    {
                        "title": "Байр:",
                        "value": instance.build.value
                    }
                ], 
                "separator": true
            });
        }
        return CardFactory.adaptiveCard(cardData);  
    }
    // hicheeliin huwaari
    createCourseSchedule(){
        var listSchedule= {
            "contentType": "application/vnd.microsoft.teams.card.list",
            "content": {
                "title": this.body.results.bindings[0].courseName.value +" хичээлийн хуваарь",
                "items": []
            }
          }
        for (var i=0; i<this.body.results.bindings.length; i++){
            var instance = this.body.results.bindings[i];    
            listSchedule.content["items"].push({
                    "type": "person",
                    "id": instance.type.value,
                    "title": instance.dt1.value+":"+instance.dt2.value +" "+instance.type.value,
                    "subtitle": instance.Name.value+" "+instance.department.value+"-"+instance.label1.value,
                    "tap": {
                        "type": "imBack",
                        "value": instance.department.value+"-"+instance.label1.value+" өрөөний дэлгэрэнгүй"
                    }
                });
            }
            return listSchedule;
    }
    //Hooson oroonii Jagsaalt
    createListCardForEmptyRoom(){
        var ListCard={
            "contentType": "application/vnd.microsoft.teams.card.list",
            "content": {
                "title": "",
                "items": []
            }
        };
        var it = 0;
        for (var i=0; i<this.body.results.bindings.length; i++){
            var instance = this.body.results.bindings[i];    
            it++;   
                ListCard.content["items"].push({
                    "type": "person",
                    "id": instance.label1.value+it,
                    "title": instance.label1.value+" "+instance.termType.value,
                    "subtitle": instance.department.value,
                    "tap": {
                        "type": "imBack",
                        "value": instance.department.value+"-"+instance.label1.value+" өрөөний дэлгэрэнгүй"
                    }
                });
            }
        ListCard.content.title = this.body.results.bindings[0].department.value+ "-д "+ it +" өрөө оллоо.";
        return ListCard; 
        }
        // ... Hicheel haan orj baina we?
    createListCardForLessonRoom(){
        var ListCard={
            "contentType": "application/vnd.microsoft.teams.card.list",
            "content": {
                "title": "",
                "items": []
            }
        };
        var it = 0;
        for (var i=0; i<this.body.results.bindings.length; i++){
            var instance = this.body.results.bindings[i];       
            it++;
            ListCard.content["items"].push({
                "type": "person",
                "id": instance.label1.value+it,
                "title": instance.label1.value+" "+instance.termType.value,
                "subtitle": instance.department.value,
                "tap": {
                        "type": "imBack",
                        "value": instance.department.value+"-"+instance.label1.value+" өрөөний дэлгэрэнгүй"
                    }
            });
        }
        if(this.body.results.bindings[0]===undefined) ListCard.content.title = "Одоогоор энэ хичээл ороогүй байна.";
        else ListCard.content.title = "Нийт "+this.body.results.bindings[0].label.value+" хичээл орж буй өрөө "+ it +" байна.";
        return ListCard;  
    }
    // .... gej hen be?var 
   createListCardForFacultyMembers(){
        var ret = {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
              "type": "AdaptiveCard",
              "version": "1.0",
              "body": [
                {
                  "type": "TextBlock",
                  "text": "Hello World!",
                  "size": "large"
                },
                {
                  "type": "TextBlock",
                  "text": "*Sincerely yours,*"
                },
                {
                  "type": "TextBlock",
                  "text": "Adaptive Cards",
                  "separation": "none"
                }
              ],
              "actions": [
                {
                  "type": "Action.OpenUrl",
                  "url": "http://adaptivecards.io",
                  "title": "Learn More"
                }
              ]
            }
          }
   return ret;
        //var ListCard={
            //"contentType": "application/vnd.microsoft.card.adaptive",
          //  "content": {
          //      "title": "",
            //    "body": []
         //   }
      //  };
        //var it = 0;
       // for (var i=0; i<this.body.results.bindings.length; i++){
         //   var instance = this.body.results.bindings[i];       
          //  if (instance.email === undefined)      
          //      continue; 
           // it++;
            
          //  ListCard.content["body"].push({
             //   "type": "person",
             //   "id": instance.email.value,
              //  "title": instance.familyName.value+" "+instance.givenName.value,
              //  "subtitle": instance.department.value+", "+instance.job.value,
              //  "tap": {
               //     "type": "imBack",
               //     "value": instance.email.value+" гэж хэн бэ?"
              //  }
           // });
     //   }
      //  ListCard.content.title = "Нийт "+ it +" ажилтанг оллоо.";
       // return ListCard;  
    }

    createListForCourseInfo(){
        var ListCard = {
            "contentType": "application/vnd.microsoft.teams.card.list",
            "content": {
                "title": "",
                "items": []
            }
        };

        var countResult = 0;
        for(var i = 0; i < this.body.results.bindings.length; i++){
            var instance = this.body.results.bindings[i];
            countResult++;

            ListCard.content["items"].push({
                "type" : "person",
                "id" : instance.courseName.value,
                "title" : instance.courseName.value,
                "subtitle" : instance.depLabel.value +"  "+ instance.courseCredit.value + " Багц цаг",
                "tap": {
                    "type" : "imBack",
                    "value" : instance.courseName.value +" хичээлийн дэлгэрэнгүй мэдээлэл ?"
                }
            });
        }
        ListCard.content.title = "Нийт " + countResult + " хичээл олдлоо.";
        return ListCard;
    }
    
    //Ajiltnii medeelel
    createProfileHeroCardForFacultyMember(){
        if (this.body.results.bindings.length<1) 
            return;
        var member = this.body.results.bindings[0];
        var roomInfo;
        if (member.room1 === undefined) {
           roomInfo= " ";    
        }
        else {
            var tokens = member.room1.value.split("/");
            roomInfo= decodeURIComponent(tokens[4]);  
        }
        var profileCard={
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.2",
            "body": []
        };
        profileCard["body"].push({
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                                
                            "type": "Image",
                            "url": "https://cdn4.iconfinder.com/data/icons/materia-flat-human-vol-1/24/013_006_people_person_avatar_profile-512.png",
                            "size": "Medium",
                            "style": "Person"
                        }
                    ],
                    "width": "auto"
                },
                {
                    "type": "Column",
                    "width": "stretch",
                    "items": [
                        {
                            "id": member.email.value,
                            "type": "TextBlock", 
                            "text": member.familyName.value+" "+member.givenName.value,
                            "weight": "Bolder",
                            "size": "Medium",
                            "fontType": "Default",
                            "height": "stretch"
                        } 
                    ]
                }
            ]
        },                  
        {
            "type": "FactSet",
            "facts": [
                {
                    "title": "Албан тушаал:",
                    "size": "small",
                    "value": member.job.value
                },
                {
                    "title": "Харьяалагдах нэгж:",
                    "value": member.department.value
                },
                {
                    "title": "Ажлын өрөө",
                    "value": roomInfo
                },
                {
                    "title": "Имэйл:",
                    "value": member.email.value+"\n"
                }
                //"<hr style='height:2px;border-width:0;color:gray;background-color:gray'>"
            ]
        },
        {
            "type": "TextBlock",
            "text": "\n\n"
        },   
        {
            "type": "ActionSet",
            "actions": [
                {
                    "type": "Action.Submit",
                    "title": "Хичээл",
                    "data": {
                        "msteams": {
                            "type": "imBack",
                            "value": member.email.value+"-н энэ улиралд орж буй хичээлүүд?"
                        }
                      }
                },
                {
                    "type": "Action.Submit",
                    "title": "Төсөл",
                    "data": {
                        "msteams": {
                            "type": "imBack",
                            "value": member.email.value+"-н ажиллаж буй төслүүд?"
                        }
                      }
                },
                {
                    "type": "Action.Submit",
                    "title": "Судалгаа",
                    "data": {
                        "msteams": {
                            "type": "imBack",
                            "value": member.email.value+"-н судалгааны чиглэлүүд?"
                        }
                    }
                }
                
            ]
        }
        )   
        return CardFactory.adaptiveCard(profileCard);
    }
//  -n ene ulirald orj bui hicheeluud
    createListCardForlessonsByMember(){
        var ListCard={
            "contentType": "application/vnd.microsoft.teams.card.list",
            "content": {
                "title": "",
                "items": []
            }
        };
        var it = 0;
        for (var i=0; i<this.body.results.bindings.length; i++){
            var instance = this.body.results.bindings[i];       
            it++;
            ListCard.content["items"].push({
                "type": "resultItem",
                "icon": "https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Trello-128.png",
                "title" : instance.CourseName.value,
                "subtitle" : instance.depLabel.value +"  "+ instance.courseCredit.value + " Багц цаг",
                "tap": {
                    "type": "imBack",
                    "value" : instance.CourseName.value +" гэж ямар хичээл бэ? ?"
                }
            });
        }
        ListCard.content.title = "Нийт "+ it +" хичээл оллоо.";
        return ListCard;  
    }
    
    //Asuult 5
    createCardCourseInfo(responseBody){
        var cardData={
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.2",
            "body": []
            };

        for (var i=0; i < this.body.results.bindings.length; i++){
            var instance = this.body.results.bindings[i];
            cardData["body"].push({
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "items": [
                            {
                                "type": "Image",
                                "url": "https://image.flaticon.com/icons/png/512/2232/2232649.png",
                                "size": "Small",
                                "style": "Person"
                            }
                        ],
                        "width": "auto"
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": instance.courseName.value,
                                "weight": "Bolder",
                                "size": "Medium",
                                "fontType": "Default",
                                "height": "stretch"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "FactSet",
                "facts": [
                    {
                        "title": "Сургалтын түвшин",
                        "value": instance.courseDegree.value
                    },
                    {
                        "title": "Багц цаг",
                        "value": instance.courseCredit.value
                    },
                    {
                        "title": "Харьяалагдах тэнхим",
                        "value": instance.depLabel.value
                    }
                ],
                "separator": true
            },
            {
                "type": "TextBlock",
                "text": "Товч агуулга",
                "weight": "Bolder"
            },
            {
                "type": "FactSet",
                "facts": [
                    {
                        "title": " ",
                        "value": instance.courseDescrip.value
                        
                    }
                ]
            },
            {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    //"width": "stretch",
                    "items": [{
                        "type": "ActionSet",
                        "actions": [
                            {
                                "type": "Action.Submit",
                                "title": "Багш нар",
                                "data": {
                                    "msteams": {
                                        "type": "imBack",
                                        "value": instance.courseName.value +" хичээлийг хэн заадаг бэ?"
                                    }
                                  }
                            }
                        ]
                        
                     }]
                },
                {
                    "type": "Column",
                    //"width": "stretch",
                    "items": [{
                        "type": "ActionSet",
                        "actions": [
                            {
                                "type": "Action.Submit",
                                "title": "Хуваарь",
                                "data": {
                                    "msteams": {
                                        "type": "imBack",
                                        "value": instance.courseName.value +" хичээлийн цагийн хуваарь?"
                                    }
                                  }
                            }
                        ]
                    }]
                }
            ]
        },
            {
                "type": "TextBlock",
                "text": "\n\n",
                
            });
            
        }
        return CardFactory.adaptiveCard(cardData);  
    }
        //Asuult 5
    QuestionList(){      
        var QuestionCard = {
           "contentType": "application/vnd.microsoft.card.hero",
           "content": {
             "title": "<font size = '2'>МУИС-н оюутны онлайн туслах! </font><hr style='height:2px;border-width:0;color:black;background-color:black'>",
             "text": "<font ><p>Би таньд хэд хэдэн төрлийн ажлууд туслаж чадах бөгөөд үргэлжлүүлэн суралцаж байна! </p>"
             + "Та надаас монгол хэл ашиглан асууж болох боловч одоохондоо би өөрийн сургагдсан байдлаар асуугдахад маш сайн ажилдаг юм. Энд миний хариулж чадах нийт асуултуудын жагсаалт байна."
             + '<ol><li> Одоо 3-р байранд сул өрөө байна уу?</li> <li> Одоо Веб Програмчлал хичээл хаана орж байна бэ?</li>'+
            '<li> Амарсанаа гэж хэн бэ?</li><li> Гэж хэн бэ?(мэйлээр)</li><li> Веб програмчлал гэж ямар хичээл бэ? </li><li> Веб програмчлал хичээлийн цагийн хуваарь?</li>'+
            '<li> Веб програмчлал-н чиглэлээр хэн судалгаа хийдэг вэ?</li>' + '<li> Веб програмчлал хичээлийн дэлгэрэнгүй мэдээлэл?</li>' + 
            '<li> Веб програмчлал-н чиглэлээр хэн судалгаа хийдэг вэ?</li>' +
            '<li> Амарсанаа-н энэ улиралд орж буй хичээлүүд?</li>' +
            '<li> Амарсанаа-н ажиллаж буй төслүүд?</li>' +
            '<li> Амарсанаа-н судалгааны чиглэлүүд?</li>'
             +"</ol></font><hr style='height:2px;border-width:0;color:gray;background-color:gray'>"
             
           }
        };
        return QuestionCard;
    }
    
        ErrorList(){      
        var ErrorCard = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": "https://image.flaticon.com/icons/png/512/2232/2232649.png",
            "buttons": [
              {
                "type": "postback",
                "title": "Yes!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "No!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
        
        return ErrorCard;
    }
}
module.exports.ViewHelper = ViewHelper;