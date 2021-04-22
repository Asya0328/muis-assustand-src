class QuestionUnderstanding {

    constructor(contextText){
        this.contextText = contextText;
        this.queryNumber = 0 ;
    }
    
    getTypeOfQuestion(text) {
       // if(this.contextText.search("сул өрөө")!=-1||this.contextText.search("хоосон өрөө")!=-1) return 1;
        if(this.contextText.search("телевизорын мэдээлэл харуулна уу?")!=-1) return 3;
        //if(this.contextText.search("гэж ямар хичээл бэ?") != -1) return 5;
       // if(this.contextText.search("хичээлийн цагийн хуваарь")!=-1) return 6;
        //if(this.contextText.search("хичээлийн дэлгэрэнгүй мэдээлэл?") != -1) return 8;
       // if(this.contextText.search("гэж хэн бэ?") != -1 && this.contextText.search("@") == -1 ) return 3;
        //if(this.contextText.search("гэж хэн бэ?") != -1 && this.contextText.search("@") != -1) return 4;
       // if(this.contextText.search("өрөөний дэлгэрэнгүй")!=-1) return 7;
       // if(this.contextText.search(" хичээлийг хэн заадаг бэ?") != -1) return 9;
       // if(this.contextText.search("-н энэ улиралд орж буй хичээлүүд?")!= -1) return 10;
       // if(this.contextText.search("-н ажиллаж буй төслүүд?")!= -1) return 11;
       // if(this.contextText.search("-н судалгааны чиглэлүүд?")!= -1) return 12;
       // if(this.contextText.search("Тусламж")!= -1) return 911;
        
        else return 404;
    }

    findKeyWord(){
        //if(this.getTypeOfQuestion()==1){
           // this.queryNumber = 1;
           // return this.findForEmptyRoom(); 
       // }
        // if(this.getTypeOfQuestion()==2){
          //  this.queryNumber = 2;
           // var les = this.contextText.substring(0, this.contextText.search("хичээл хаана орж байна вэ?")).trim();  
            //console.log(les);  
          //  return les;
       // }
        if(this.getTypeOfQuestion()==3){
            this.queryNumber = 3;
            return this.contextText.substring(0, this.contextText.search("телевизорын мэдээлэл харуулна уу?")).trim();   
        } 
       // } else if(this.getTypeOfQuestion()==4){
           // this.queryNumber = 4;
           // return this.contextText.substring(0, this.contextText.search("гэж хэн бэ?")).trim();    
       // }
      //  else if(this.getTypeOfQuestion()==5){
           // this.queryNumber = 5;
          //  return this.contextText.substring(0, this.contextText.search("гэж ямар хичээл бэ?")).trim();
     //   }
       // else if(this.getTypeOfQuestion()==6){
         //   this.queryNumber = 6;
         //   return this.contextText.substring(0, this.contextText.search("хичээлийн цагийн хуваарь")).trim();
      //  }
       //  else if(this.getTypeOfQuestion()==7){
         //   this.queryNumber = 7;
          //  return this.contextText.substring(0, this.contextText.search("өрөөний дэлгэрэнгүй")).trim();
       // }
      //  else if(this.getTypeOfQuestion()==8){
       //     this.queryNumber = 8;
            //console.log("\n\n"+ contextText + "\n");
        //    return this.contextText.substring(0, this.contextText.search("хичээлийн дэлгэрэнгүй мэдээлэл?")).trim();
      //  }
      //  else if(this.getTypeOfQuestion()==9){
       //     this.queryNumber = 9;
            //console.log("\n\n"+ contextText + "\n");
      //      return this.contextText.substring(0, this.contextText.search("хичээлийг хэн заадаг бэ?")).trim();
      //  }
       // else if(this.getTypeOfQuestion()==10){
        //    this.queryNumber = 10;
            //console.log("\n\n"+ contextText + "\n");
          //  return this.contextText.substring(0, this.contextText.search("-н энэ улиралд орж буй хичээлүүд?")).trim();
      //  }
      //  else if(this.getTypeOfQuestion()==11){
       //     this.queryNumber = 11;
            //console.log("\n\n"+ contextText + "\n");
        //    return this.contextText.substring(0, this.contextText.search("-н ажиллаж буй төслүүд?")).trim();
       // }
     //   else if(this.getTypeOfQuestion()==12){
        //    this.queryNumber = 12;
            //console.log("\n\n"+ contextText + "\n");
        //    return this.contextText.substring(0, this.contextText.search("-н судалгааны чиглэлүүд?")).trim();
      //  }
       // else if(this.getTypeOfQuestion()==911){
       //     this.queryNumber = 911;
            //console.log("\n\n"+ contextText + "\n");
        //    return this.contextText.substring(0, this.contextText.search("Тусламж")).trim();
    //    }
        
        else{
            this.queryNumber = 404;
            return this.contextText.substring(0, this.contextText.search(" ")).trim();
        } ;
    }
    getQueryNumber(){
        return this.queryNumber;
    }
    findForEmptyRoom(){
        if(this.TimeForEmptyRoom()!=-1){
            if(this.findRoomKey()!=-1){
                this.queryNumber = 101;
                return this.findRoomKey() + "+" + this.TimeForEmptyRoom();  // hicheeliin bair + tsag
            }
            else{
                this.queryNumber = 102;
                return this.TimeForEmptyRoom(); // tsag
            }
        }
        else 
            return this.findRoomKey(); // hicheeliin bair
    }
    TimeForEmptyRoom(){
        const reg = '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$';
        const arr = this.contextText.split(" ");
        console.log(arr);
        for (var i in arr) {
            console.log("time------------"+i);
            if (arr[i].search(reg)==0) {
                return arr[i];
            }
        }
        return -1;
    }
    findRoomKey(){
        if(this.contextText.search("номын сан")!=-1){
            return "Номын сан";
        }
        if(this.contextText.search("1-р байр")!=-1||this.contextText.search("төв байр")!=-1){
            return "Хичээлийн төв байр";
        }
        if(this.contextText.search("2-р байр")!=-1){
            return "Хичээлийн байр 2";
        }
        if(this.contextText.search("3-р байр")!=-1){
            return "Хичээлийн байр 3";
        }
        if(this.contextText.search("4-р байр")!=-1){
            return "Хичээлийн байр 4";
        }
        if(this.contextText.search("5-р байр")!=-1){
            return "Хичээлийн байр 5";
        }
        if(this.contextText.search("завхан")!=-1){
            return "Завхан сургуулийн хичээлийн байр";
        }
        if(this.contextText.search("орхон")!=-1){
            return "Орхон сургуулийн хичээлийн байр";
        }
        if(this.contextText.search("Цөмийн судалгааны төв")!=-1){
            return "Цөмийн судалгааны төв";
        }
        else return -1;
    }  
}
module.exports.QuestionUnderstand = QuestionUnderstand;

