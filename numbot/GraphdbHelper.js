const fetch = require('node-fetch');
const util = require('util');
const moment = require('moment-timezone');
const { SparqlQueries } = require('./sparqlQueries');
class GraphdbHelper {
    constructor(Word,Number){
        this.QuestionNumber = Number;
        this.KeyWord = Word;
      //  this.date = moment().tz('Asia/Ulaanbaatar');
       // this.weekday = "Даваа";
      //  if(this.date.isoWeekday()==1) this.weekday = "Даваа";
     //   if(this.date.isoWeekday()==2) this.weekday = "Мягмар";
       // if(this.date.isoWeekday()==3) this.weekday = "Лхагва";
       // if(this.date.isoWeekday()==4) this.weekday = "Пүрэв";
      //  if(this.date.isoWeekday()==5) this.weekday = "Баасан";
      //  if(this.date.isoWeekday()==6) this.weekday = "Бямба";
       // if(this.date.isoWeekday()==7) this.weekday = "Ням";
    }
    async responseBack(){
            
            // console.log("\n\n Query begin : "+SparqlQueries.courseInf);
            var query = this.getQuery();
            const host = 'http://localhost:7200';
            const path = '/repositories/electronub';
            const params = '?query=';
            const url = host + path + params + query;

            var res = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/sparql-results+json'
                }
            })
            if (!res.ok) {
                throw res;
            }
            var responseBody = await res.json();
            // console.log(this.KeyWord+"========================================================="+this.QuestionNumber);
            console.log(responseBody);
            return responseBody;
    }
   getQuery () {
       //console.log(this.QuestionNumber);
       console.log(this.KeyWord+"-------------------------------------------------------"+this.QuestionNumber);
       if(this.QuestionNumber==1){
        return util.format(SparqlQueries.EmptyRoom, 
            encodeURI(this.KeyWord),
            encodeURI(this.date.format('HH')+":"+this.date.format('mm')),
            encodeURI(this.date.format('HH')+":"+this.date.format('mm')),
            encodeURI(this.weekday),
            encodeURI(this.KeyWord));
        }
        if(this.QuestionNumber==101){
            const arr = this.KeyWord.split("+");
            return util.format(SparqlQueries.EmptyRoom, 
                encodeURI(arr[0]),
                encodeURI(arr[1]),
                encodeURI(arr[1]),
                encodeURI(this.weekday),
                encodeURI(arr[0]));
        }
        if(this.QuestionNumber==102){ //query dutuu
            return util.format(SparqlQueries.EmptyRoomWithTime, 
                encodeURI(this.KeyWord),
                encodeURI(this.KeyWord),
                encodeURI(this.weekday));
        }
        if(this.QuestionNumber == 2){
            return util.format(SparqlQueries.LessonRoom,
                encodeURI(this.date.format('HH')+":"+this.date.format('mm')),
                encodeURI(this.date.format('HH')+":"+this.date.format('mm')),
                encodeURI(this.weekday),
                encodeURI(this.KeyWord));
        }
        if (this.QuestionNumber==3){
            return util.format(SparqlQueries.membersByName, encodeURI(this.KeyWord));
        }
        if (this.QuestionNumber==4){
            return util.format(SparqlQueries.membersByEmail, encodeURI(this.KeyWord));
       }
        if(this.QuestionNumber==5){
  
            return util.format(SparqlQueries.courseInf, encodeURI(this.KeyWord));
        }
         if(this.QuestionNumber==6){
  
            return util.format(SparqlQueries.CourseSche, encodeURI(this.KeyWord));
        }
        if(this.QuestionNumber==7){
            var arr = this.KeyWord.split("-");
            console.log(arr);
            return util.format(SparqlQueries.RoomInfo, encodeURI(arr[1]),encodeURI(arr[0]));
        }
        if (this.QuestionNumber==8){
            return util.format(SparqlQueries.courseInf, encodeURI(this.KeyWord));
        }
        if (this.QuestionNumber==9){          
            return util.format(SparqlQueries.courseTeacher, encodeURI(this.KeyWord));
        }
        if (this.QuestionNumber==10){
            return util.format(SparqlQueries.lessonsByMember, encodeURI(this.KeyWord));
        }
        if (this.QuestionNumber==11){
            return util.format(SparqlQueries.membersByEmail, encodeURI(this.KeyWord));
        }
        if (this.QuestionNumber==12){
            return util.format(SparqlQueries.membersByEmail, encodeURI(this.KeyWord));
        }
        if (this.QuestionNumber==911){
            return util.format(SparqlQueries.membersByEmail, encodeURI(this.KeyWord));
        }
        else return util.format(SparqlQueries.membersByEmail, encodeURI(this.KeyWord));;
    }
}
module.exports.GraphdbHelper = GraphdbHelper;