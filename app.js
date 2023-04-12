let {Telegraf} = require('telegraf')
let axios = require('axios');
const { updateMany } = require('./channel');
let bot = new Telegraf('6266735046:AAF-dVVaSMm7HvB2Ppm9TVNWJl_AePA5v6o')

process.on('uncaughtException', function (error) {
	console.log("\x1b[31m", "Exception: ", error, "\x1b[0m");
});

process.on('unhandledRejection', function (error, p) {
	console.log("\x1b[31m","Error: ", error.message, "\x1b[0m");
})


bot.help((ctxh)=>{

ctxh.telegram.sendMessage(ctxh.chat.id,"hello")
})

function register(ctxregister){
    ctxregister.telegram.sendMessage(ctxregister.chat.id, 'First Please share your contact information,for registration purpose.', {
        reply_markup: {
          keyboard: [[{
            text: 'Share Contact',
            request_contact: true,
          }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
    }
    
    // Listen for when the user shares their contact information
    bot.on('contact', (msg) => {
        console.log(msg)
      // Get the user's contact information
      const phone = msg.message.contact.phone_number || '';
      const firstName = msg.message.contact.first_name;
      const lastName = msg.message.contact.last_name || '';
    
      // Send a message to the user with their contact information
let register=new Promise(function (resolve, reject) {
var options = {
  method: 'POST',
  url: 'http://localhost:3000/items',
  data: {name: firstName, tele_id: msg.message.from.id, contact: phone}
};

axios.request(options).then(function (response) {
    if(response.data.data==0){

        err(msg)
    }
    else if(response.data.data==1){

        resolve(msg.telegram.sendMessage(msg.chat.id, `Registration Successfull,Thank you, ${firstName} ${lastName}. Your phone number is ${phone}.`))
    }
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
})
})



function err(msg){
    (msg.telegram.sendMessage(msg.chat.id, `Some error occured`))

}


var source=true;
bot.start((ctx)=>{
    source=true

    

var options = {method: 'GET', url: `http://localhost:3000/items/${ctx.message.from.id}`};

axios.request(options).then(function (response) {
    console.log(response.data)
    if(response.data.data==0){
        console.log(response.data)
        register(ctx);

    }
    else if(response.data.data==99){
        err(ctx)

    }
    else{


    


// let register=new Promise(function (resolve, reject) {
// var options = {
//   method: 'POST',
//   url: 'http://localhost:3000/items',
//   data: {name: 'mansoor', tele_id: 1223455, contact: 9980820674}
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });
// }
// )


 
        
    // globalctx=ctx
    let buttonarry=[
        [{text:"how bot works",callback_data:`start_btn_wizard_Description`}],
        [{text:"Book A ride",callback_data:`start_btn_wizard_Book A ride`}],
        [{text:"Quick Bookings",callback_data:`start_btn_wizard_Quick Bookings`}],
        [{text:"Saved Locations",callback_data:`start_btn_wizard_Saved Locations`}],
        [{text:"History",callback_data:`start_btn_wizard_History`}],
        [{text:"Customer Support",callback_data:`start_btn_wizard_Customer Support`}],
      
    
    ]
    ctx.telegram.sendMessage(ctx.chat.id,`select option`, 
               {
                    reply_markup:{
                        inline_keyboard:
                            buttonarry,
                    InlineKeyboardButton:[[{text:"Notes",switch_inline_query_current_chat:''}]]
                        
                        // input_field_placeholder:"what is your name",
                        // force_reply:true,
                    }
                }
               )


            }
    

            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
          });

})




bot.action(/start_btn_wizard_+/,(ctx)=>{
    let product_id = ctx.match.input.substring(17);
    switch(product_id){
        case 'Description':let desp=descrip(ctx);
        break;
        case 'Book A ride':let m=bookride(ctx);
        break;
        case 'Quick Bookings':let at=quick(ctx);
        break;
        case 'Saved Locations':let c=saved(ctx);
        break;
        case 'History':let s=history(ctx);
        break;
        case 'Customer Support':let l=support(ctx);
        break;
        default:ctx.reply("Invalid")
    }
    
})






function bookride(bookctx){
    source=true

    let buttonarry=[
        [{text:"Send My current Location",callback_data:`display_btn_share`}],
        [{text:"Type Source",switch_inline_query_current_chat:''}],
      
    
    ]

    bookctx.telegram.sendMessage(bookctx.chat.id,`select option`, 
               {
                    reply_markup:{
                        inline_keyboard:
                            buttonarry,
                    InlineKeyboardButton:[[{text:"share",request_location: true}]]
                        
                        // input_field_placeholder:"what is your name",
                        // force_reply:true,
                    }
                }
               )


               bot.action(/display_btn_+/,(typectx)=>{
                typectx.deleteMessage();
                let product_id = typectx.match.input.substring(12);
                switch(product_id){
                    case 'share':let desp=sharelocation(typectx);
                    break;
                    
                    default:typectx.reply("Invalid")
                }
            
            })

    return;}

    bot.on('inline_query',(ctxI)=>{
       

        let query=ctxI.inlineQuery.query




        

        var options = {
          method: 'GET',
          url: 'https://geocode.maps.co/search',
          params: {q: `{${query},bangalore}`}
        };
        
        axios.request(options).then(function (response) {

            if(response.data.length==0){
                ctxI.reply("No data available")
             }

             else{
                // for(let item of res.data.response){
                    let result=response.data.map((item,index)=>{
                        return{
                            type:'location',
                            id:String(index),
                            title:item.display_name,
                        
                            latitude:Number(item.lat),
                            longitude:Number(item.lon),
                          
                        }
                    })
                 
                   
              
                  
                    ctxI.answerInlineQuery(result)
                } 
        //   console.log(response.data);
        }).catch(function (error) {
          console.error(error);
        });







                
    })
 function sharelocation(loc){
   
        var option = {
               "parse_mode": "Markdown",
               "reply_markup": {
                   "one_time_keyboard": true,
                   "keyboard": [[{
                       text: "Source location",
                       request_location: true
                   }],]
               }
           };
          
           loc.telegram.sendMessage(loc.chat.id, "You can Send your Current Source location by clicking on location Keybutton \n or \n share Different location by clicking on pin Icon ",option).then(() => {
         
               
       
       })

      
       }



















   
    let src=[]
    let dest=[]
        
       var button=[
        [{text:"Share Destination Location",callback_data:`display_btn_share`}],
        [{text:"Type Destination",switch_inline_query_current_chat:''}],
          
        
        ]
           bot.on('location',async(ctrg)=>{
               var lo= ctrg.message.location.longitude
               var la=ctrg.message.location.latitude
               
               if(source){
                src[0]=lo
               src[1]=la
               let r= await revcode(src)
                ctrg.telegram.sendMessage(ctrg.chat.id,` Your source is  set i.e \n${r} \n\nnow send destination `, 
               {
                    reply_markup:{
                        inline_keyboard:
                            button,
                    InlineKeyboardButton:[[{text:"share",request_location: true}]]
                        
                      
                    }
                }
               )
                source=false;
               }
               else{
                dest[0]=lo
                dest[1]=la
                let d= await revcode(dest)
                ctrg.telegram.sendMessage(ctrg.chat.id,`Your destination is   set i.e \n${d} \n  `)
                
                
                source=true;
                estimate(ctrg,src,dest);
                
               }
               
               return;
         
         
                })
   


                // a promise
let revcode=(src) => new Promise(function (resolve, reject) {

    const options = {
        method: 'GET',
        url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
        params: {location: `${src[1]},${src[0]}`, language: 'en'},
        headers: {
          'X-RapidAPI-Key': 'b38251f12dmsh1e354647d127793p1fe19ejsnd617ffc74cff',
          'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
         let srcaddress=response.data.results[0].address
         console.log(response.data.results[0].address)
         resolve (srcaddress)
      }).catch(function (error) {
          console.error(error);
          return 0
      });
    
   
});




async function estimate(ctre,src,dest){



    let arry=[
        [{text:"Confirm",callback_data:`find_btn_wizard_Confirm`}],
        [{text:"Cancel",callback_data:`find_btn_wizard_Cancel`}],
    ]
   
let srcaddress= await revcode(src);
let destaddress= await revcode(dest);
let cost='148';
console.log(srcaddress)
console.log(destaddress)


if(srcaddress ==0 || destaddress==0){
    ctre.telegram.sendMessage(ctre.chat.id,` Error\n PLease try later `)
    return
}
else{
let content =`Confirm Details\n\nSource :${srcaddress}\n\nDestination:${destaddress}\n\nEstimated Fare :${cost} Rupees\n`


    ctre.telegram.sendMessage(ctre.chat.id,` ${content}`,{
        reply_markup:{
            inline_keyboard:
             arry,
        InlineKeyboardButton:[[{text:"Notes",switch_inline_query_current_chat:''}]]
            
           
        }
    })
}



bot.action(/find_btn_wizard_+/,(ctxs)=>{
    ctxs.deleteMessage();
    let product_id = ctxs.match.input.substring(16);
    switch(product_id){
        case 'Confirm':let desp=searchride(ctxs,src,dest);
        break;
        case 'Cancel':{ctxs.deleteMessage();
            source=true
            src=[]
            dest=[]
           ctxs.telegram.sendMessage(ctxs.chat.id,` Thank you see you soon`,{parse_mode:"HTML"})}
        break;
    }



})





}


 async function rando(){
    //check is there already a ride with that id
    console.log(88)
    let flag=true
   
         var w= Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
     var options = {method: 'GET', url: `http://localhost:3000/getrideiid/${w}`};
        axios.request(options).then(function (response) {
            console.log(response.data.data)
            if(response.data.data==0){
                console.log(w);
                
                return w;
                
            }
            else{
                return Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
            }
            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
          });
  
  



 }


 function resolveAfter1Seconds(ridectx) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(ridectx.telegram.sendMessage(ridectx.chat.id,` When Passenger reaches his destiantion and driver ends ride then user gets a message like this👇`,{parse_mode:"HTML"}))
      }, 1000);
    });
  }



  function resolveAfter2Seconds(ridectx) {
    return new Promise(resolve => {
      setTimeout(() => {
        var options = {
            method: 'PUT',
            url: `http://localhost:3000/updateride/${ridectx.update.callback_query.from.id}`,
            data: {status: 'completed'}
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
            if(response.data.data==0){
              err(ridectx)
          
          }
          else if(response.data.data==1){
          
          
              resolve(ridectx.telegram.sendMessage(ridectx.chat.id,`<strong>Ride Completed</strong>\n\nPlease Pay 158 rupees to Driver\n\n\n`,{parse_mode:"HTML"}))
          }
          }).catch(function (error) {
            console.error(error);
          });
      }, 1000);
    });
  }


  function resolveAfter3Seconds(ridectx) {
    let option=[
        [{text:"Add to quick Booking",callback_data:`add_btn_wizard_addbook`}],
        [{text:"Not Required",callback_data:`add_btn_wizard_Cancel`}],
    ]
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(ridectx.telegram.sendMessage(ridectx.chat.id,`Would you like to add this trip for quick booking,where next time you dont have to give any address just click on quick booking and select the ride`,{
            reply_markup:{
                inline_keyboard:
                 option,
            InlineKeyboardButton:[[{text:"Notes",switch_inline_query_current_chat:''}]]
                
               
            }
        }))
      }, 1000);
    });
  }

async function searchride(ridectx,src,dest){
    console.log(ridectx. update.callback_query.from.id)
     //search algo
     let sr=await revcode(src);
     let de= await revcode(dest);
    var cont=`<strong>Ride Found</strong>
    \n <strong>Ride Id:</strong> 456328
    \n <strong>Auto Number:</strong> <ins>KA-05 MH 4326</ins>
    \n <strong>Driver Name:</strong> <ins>Nagesh</ins>
    \n <strong>Driver Contact:</strong> <ins>987880099</ins>
    \n <strong>Estimated Fare:</strong> <ins>158💲</ins>
    \n <strong>Estimated Arrival Time:</strong> <ins>14:06</ins>\n
    Wishing you a safe and happy journey!

    
    `
   
let ride=  new Promise(function (resolve, reject) {

let rand=  rando()
        
console.log("jtt")
var options = {
  method: 'POST',
  url: 'http://localhost:3000/rides',
  data: {
    tele_id: ridectx.update.callback_query.from.id,
    ride_id:String(rand),
    ridefrom:sr,
    rideto:de ,
    src: src,
    dest: dest,
    fare: Number(158),
    status: 'ongoing',
    issaved: false
  }
};

axios.request(options).then(function (response) {
    if(response.data.data==0){
        err(ridectx)

    }
    else if(response.data.data==1){

   
    resolve(ridectx.telegram.sendMessage(ridectx.chat.id,` ${cont} `,{parse_mode:"HTML"}))
}
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

       
    })

    // const invoice = {
    //     title: 'Test Invoice',
    //     description: 'This is a test invoice',
    //     payload: 'test_payload',
    //     provider_token: 'pk_test_1234567890',
    //     start_parameter: 'start_parameter',
    //     currency: 'USD',
    //     prices: [{ label: 'Test Product', amount: 10000 }],
        
    //   };
  
    //   ridectx.sendInvoice(ridectx, invoice)

    
    let q= await resolveAfter1Seconds(ridectx);
    let re= await resolveAfter2Seconds(ridectx);
    let r= await resolveAfter3Seconds(ridectx);
   

    


    bot.action(/add_btn_wizard_+/,(ctxadd)=>{
        console.log("hi")
        ctxadd.deleteMessage();
        let product_id = ctxadd.match.input.substring(15);
        switch(product_id){
            case 'addbook':let desp=addride(ctxadd);
            break;
            case 'Cancel':{ctxadd.deleteMessage();
                source=true
                src=[]
                dest=[]
               ctxadd.telegram.sendMessage(ctxadd.chat.id,` Thank you see you soon`,{parse_mode:"HTML"})}
            break;
        }
    
    
    
    })

}


function addride(ctxu){
    
    
    var options = {
        method: 'PUT',
        url: `http://localhost:3000/updateride/${ctxu.update.callback_query.from.id}`,
        data: {issaved: true}
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
        if(response.data.data==0){
          err(ctxu)
      
      }
      else if(response.data.data==1){
      
      
        ctxu.telegram.sendMessage(ctxu.chat.id,"Added Succesfully");
      }
      }).catch(function (error) {
        console.error(error);
      });


   

}




function quick(quickctx){
    source=true


    let finalarr=[];



var options = {method: 'GET', url: `http://localhost:3000/getride/${quickctx.update.callback_query.from.id}`};

axios.request(options).then(function (resp) {
    console.log(resp.data)


    localarr=(resp.data.map((item) => {
        return {
          text: `${String(item.ridefrom.slice(0,25))}(---->)${String(item.rideto.slice(0,25))}`,
          callback_data:`get_wizard_${item.src} ${item.dest}`

        }
      
      })
      
)
for(let i=0;i<localarr.length;i++){  finalarr[i]=[localarr[i]]}


quickctx.telegram.sendMessage(quickctx.chat.id,`Choose Ride`, 
{
reply_markup:{
inline_keyboard:
 
  finalarr


}
}
)


  console.log(resp.data);
}).catch(function (error) {
  console.error(error);
});



    return;}


bot.action(/get_wizard_+/,(ctx2gg)=>{
    let product_id = ctx2gg.match.input.substring(11);
    let ar=product_id.split(" ");
    console.log(ar)
    let src=ar[0].split(",");
    let dest=ar[1].split(",");
    // console.log(src)
    // console.log(dest)
    let src1=[];
    let dest1=[];
    src1[0]=Number(src[0])
    src1[1]=Number(src[1])
    dest1[0]=Number(dest[0])
    dest1[1]=Number(dest[1])
    estimate(ctx2gg,src1,dest1)

    
    })
function saved(savectx){
    source=true


    return;
}
function history(historyctx){
    source=true
    var options = {method: 'GET', url: `http://localhost:3000/getrideall/${historyctx.update.callback_query.from.id}`};

axios.request(options).then(function (resp) {
    console.log(resp.data)

    let c=''
    localarr=(resp.data.map((item) => {
        c += '<strong>Date</strong>: ' + item.date  + '\n' +
        '<strong>Source</strong>: ' + item.ridefrom + '\n' +
        '<strong>Destination</strong>: ' + item.rideto + '\n' +
        '<strong>Fare</strong>: ' + item.fare + '\n-----------------------------------\n\n'
       

      
      })
      
)
historyctx.telegram.sendMessage(historyctx.chat.id,`${c}`, {parse_mode:"HTML"})






console.log(resp.data);
}).catch(function (error) {
  console.error(error);
});

    return;}
function support(supportctx){
    let c=`
    <b>Hello!</b> Thank you for contacting the <b>Namma Yatri</b> Customer Care Support Team.

Please provide us with the following information to better assist you:


Your name:
Your email address:
Your order number (if applicable):
Brief description of your issue:


Our team will review your request and respond as soon as possible. If you have any urgent concerns, please contact us directly at <b>https://www.linkedin.com/company/nammayatri/</b>.

Thank you for your patience and cooperation.

Best regards,
<b>Namma Yatri</b> Customer Care Support Team`;

supportctx.telegram.sendMessage(supportctx.chat.id, c, {parse_mode:'HTML'})


    return;}
bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
  })
bot.launch()


// var axios = require("axios").default;




// // updateMany
// var axios = require("axios").default;

// var options = {
//   method: 'PUT',
//   url: 'http://localhost:3000/update/{filter}',
//   data: {type: 'malik'}
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });