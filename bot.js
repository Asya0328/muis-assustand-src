// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory} = require('botbuilder');
const { QuestionUnderstanding } = require('./numbot/QuestionUnderstanding');
const { GraphdbHelper} = require('./numbot/GraphdbHelper');
const { ViewHelper } = require('./numbot/ViewHelper');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            
            var replyText = `You said: ${ context.activity.text }`;
            const qu = new QuestionUnderstanding(context.activity.text);
            const Graphdb = new GraphdbHelper(qu.findKeyWord(),qu.getQueryNumber());
           // console.log("\n Query dugaar : "+ qu.getQueryNumber() + qu.findKeyWord() );
            
            replyText = `Түр хүлээнэ үү ${Graphdb.KeyWord}-н мэдээллийг хайж байна.`;
            var responseBody = await Graphdb.responseBack();
            
            if(!(responseBody===undefined)){
                const view = new ViewHelper(responseBody);
                 if(qu.getQueryNumber() == 1||qu.getQueryNumber() == 101||qu.getQueryNumber() == 102){
                    await context.sendActivity({ 
                        attachments: [view.createListCardForEmptyRoom()] 
                    });
                }
                else if(qu.getQueryNumber() == 2){
                    await context.sendActivity({ 
                        attachments: [view.createListCardForLessonRoom()] 
                    });
                }
                else if(qu.getQueryNumber() == 3){
                    await context.sendActivity({ 
                        attachments: [view.createListCardForFacultyMembers()] 
                    });
                    // await context.sendActivity({ 
                    //     attachments: [view.createCard()] 
                    // });
                } 
                else if(qu.getQueryNumber() == 4) {
                    await context.sendActivity({ 
                        attachments: [view.createProfileHeroCardForFacultyMember()] 
                    });
                }
                else if(qu.getQueryNumber() == 5){
                    await context.sendActivity({ 
                        attachments: [view.createListForCourseInfo()] 
                     });
                 }
                 else if(qu.getQueryNumber() == 6){
                    await context.sendActivity({ 
                        attachments: [view.createCourseSchedule()] 
                     });
                 }
                 else if(qu.getQueryNumber() == 7){
                    await context.sendActivity({ 
                        attachments: [view.createRoomInfo()] 
                     });
                 }
                 else if(qu.getQueryNumber() == 8){
                    await context.sendActivity({ 
                        attachments: [view.createCardCourseInfo()] 
                     });
                 }
                 else if(qu.getQueryNumber() == 9){   
                    await context.sendActivity({ 
                        attachments: [view.createListCardForFacultyMembers()] 
                     });
                 }
                 else if(qu.getQueryNumber() == 10) {
                    await context.sendActivity({ 
                        attachments: [view.createListCardForlessonsByMember()] 
                    });
                }
                else if(qu.getQueryNumber() == 11) {
                    await context.sendActivity({ 
                        attachments: [view.createProfileHeroCardForFacultyMember()] 
                    });
                }
                else if(qu.getQueryNumber() == 12) {
                    await context.sendActivity({ 
                        attachments: [view.createProfileHeroCardForFacultyMember()] 
                    });
                }
                else if(qu.getQueryNumber() == 911) {
                     await context.sendActivity({ 
                        attachments: [view.QuestionList()] 
                    });
                }
                else if(qu.getQueryNumber() == 404) {
                     await context.sendActivity({ 
                        attachments: [view.ErrorList()] 
                    });
                }
            }
            else {
               
                
                await context.sendActivity(MessageFactory.text(replyText, replyText));
            }
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Сайн байна уу? Манай чатботод тавтай морил. \n\n'+
            'Гэр ахуйн цахилгаан барааны нэгдсэн чатбот! \n\n'+
            'Хариулж чадах нийт асуултуудын жагсаалтууд:'+
            '\n1. Одоо 3-р байранд сул өрөө байна уу? \n 2. Одоо Веб Програмчлал хичээл хаана орж байна вэ?\n'+
            '3. LG телевизорийн мэдээлэл харуулна уу?\n 4.Гэж хэн бэ?(мэйлээр)\n 5. 730000 төгрөгөөс бага телевизор? \n6. Веб програмчлал хичээлийн цагийн хуваарь?\n'+
            '\n7. Веб програмчлал-н чиглэлээр хэн судалгаа хийдэ вэ?' + '\n8. Веб програмчлал хичээлийн дэлгэрэнгүй мэдээлэл?' + 
            '\n9. Веб програмчлал-н чиглэлээр хэн судалгаа хийдэ вэ?' +
            '\n10. Амарсанаа-н энэ улиралд орж буй хичээлүүд?' +
            '\n11. Амарсанаа-н ажиллаж буй төслүүд?' +
            '\n12. Амарсанаа-н судалгааны чиглэлүүд?';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            await next();
        });
    }
}
module.exports.EchoBot = EchoBot;
