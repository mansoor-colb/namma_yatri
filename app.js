let { Telegraf } = require('telegraf')
// import { setTimeout } from "timers/promises";
let axios = require('axios');
var express = require('express');
var app = express();
let bot = new Telegraf('6266735046:AAF-dVVaSMm7HvB2Ppm9TVNWJl_AePA5v6o')
let src = []
let dest = []
process.on('uncaughtException', function(error) {
  console.log("\x1b[31m", "Exception: ", error, "\x1b[0m");
});

process.on('unhandledRejection', function(error, p) {
  console.log("\x1b[31m", "Error: ", error.message, "\x1b[0m");
})


bot.help((ctxh) => {

  ctxh.telegram.sendMessage(ctxh.chat.id, "hello")
})

function register(ctxregister) {
  ctxregister.telegram.sendMessage(ctxregister.chat.id, 'First time registration :-\n\nPlease share your contact information for registration purposes.', {
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



 var options = { method: 'GET', url:`https://nammadbb.webmanage.repl.co/items/${msg.message.from.id}` };

  axios.request(options).then(function(response1) {
    console.log(response1.data)
    if (response1.data.data == 0) {
      console.log(response1.data)
        console.log(msg)
  // Get the user's contact information
  const phone = msg.message.contact.phone_number || '';
  const firstName = msg.message.contact.first_name;
  const lastName = msg.message.contact.last_name || '';

  // Send a message to the user with their contact information
  let register = new Promise(function(resolve, reject) {
    var options = {
      method: 'POST',
      url: 'https://nammadbb.webmanage.repl.co/items',
      data: { name: firstName, tele_id: msg.message.from.id, contact: phone }
    };

    axios.request(options).then(function(response) {
      console.log(response.data)
      if (response.data.data == 0) {

        err(msg)
      }
      else if (response.data.data == 1) {

        resolve(msg.telegram.sendMessage(msg.chat.id, `${firstName} ${lastName}, your registration was successfull,Thank you !\nYour phone number is ${phone}.\n\n Let's get started!!\nclick 👉: /start`))
      }
      console.log(response.data);
    }).catch(function(error) {
      console.error(error);
    });
  })

    }
    else if (response1.data.data == 1) {
      msg.telegram.sendMessage(msg.chat.id, `You have already register successfully!`)
        
         
        

    }
    else {
      err(msg)



      
      
      


    }


    console.log(response1.data);
  }).catch(function(error) {
    console.error(error);
  });















  


  
})



function err(msg) {
  (msg.telegram.sendMessage(msg.chat.id, `Some error occured`))

}


var source = true;
bot.start((ctx) => {
  source = true



  var options = { method: 'GET', url: `https://nammadbb.webmanage.repl.co/items/${ctx.message.from.id}` };

  axios.request(options).then(function(response) {
    console.log(response.data)
    if (response.data.data == 0) {
      console.log(response.data)
      register(ctx);

    }
    else if (response.data.data == 99) {
      err(ctx)

    }
    else {



      let buttonarry = [
        [{ text: "About the bot", callback_data: `start_btn_wizard_Description` }],
        [{ text: "Book a ride", callback_data: `start_btn_wizard_Book A ride` }],
        [{ text: "Quick Booking", callback_data: `start_btn_wizard_Quick Bookings` }],
        [{ text: "View current journey", callback_data: `start_btn_wizard_Saved Locations` }],
        [{ text: "History", callback_data: `start_btn_wizard_History` }],
        [{ text: "Customer Support", callback_data: `start_btn_wizard_Customer Support` }],
        [{ text: "Cancel", callback_data: `start_btn_wizard_Cancel` }],


      ]
      ctx.telegram.sendMessage(ctx.chat.id, `Please select an option`,
        {
          reply_markup: {
            inline_keyboard:
              buttonarry,
            InlineKeyboardButton: [[{ text: "Notes", switch_inline_query_current_chat: '' }]]

            // input_field_placeholder:"what is your name",
            // force_reply:true,
          }
        }
      )


    }


    console.log(response.data);
  }).catch(function(error) {
    console.error(error);
  });

})




bot.action(/start_btn_wizard_+/, (ctx) => {
  let product_id = ctx.match.input.substring(17);
  switch (product_id) {
    case 'Description': let desp = descrip(ctx);
      break;
    case 'Book A ride': let m = bookride(ctx);
      break;
    case 'Quick Bookings': let at = quick(ctx);
      break;
    case 'Saved Locations': let c = saved(ctx);
      break;
    case 'History': let s = history(ctx);
      break;
    case 'Customer Support': let l = support(ctx);
      break;
    case 'Cancel': let can = cancel(ctx);
      break;
    default: ctx.reply("Invalid")
  }

})






function bookride(bookctx) {
   bookctx.deleteMessage();
  source = true

  let buttonarry = [
    [{ text: "Send my current location", callback_data: `display_btn_share` }],
    [{ text: "Type Source location", switch_inline_query_current_chat: '' }],
     [{ text: "Cancel", callback_data: `display_btn_Cancel` }],


  ]

  bookctx.telegram.sendMessage(bookctx.chat.id, `Please select an option`,
    {
      reply_markup: {
        inline_keyboard:
          buttonarry,
        InlineKeyboardButton: [[{ text: "share", request_location: true }]]

        // input_field_placeholder:"what is your name",
        // force_reply:true,
      }
    }
  )


  bot.action(/display_btn_+/, (typectx) => {
    // typectx.deleteMessage();
    let product_id = typectx.match.input.substring(12);
    switch (product_id) {
      case 'share': let desp = sharelocation(typectx);
        break;
         case 'Cancel': {
       typectx.deleteMessage();
        source = true
        src = []
        dest = []
        typectx.telegram.sendMessage(typectx.chat.id, ` Thank you !\nSee you soon !`, { parse_mode: "HTML" })
      }
        break;

      default: typectx.reply("Invalid")
    }

  })

  return;
}

bot.on('inline_query', (ctxI) => {


  let query = ctxI.inlineQuery.query






  var options = {
    method: 'GET',
    url: 'https://geocode.maps.co/search',
    params: { q: `{${query},bangalore}` }
  };

  axios.request(options).then(function(response) {

    if (response.data.length == 0) {
      ctxI.reply("No data available")
    }

    else {
      // for(let item of res.data.response){
      let result = response.data.map((item, index) => {
        return {
          type: 'location',
          id: String(index),
          title: item.display_name,

          latitude: Number(item.lat),
          longitude: Number(item.lon),

        }
      })




      ctxI.answerInlineQuery(result)
    }
    //   console.log(response.data);
  }).catch(function(error) {
    console.error(error);
  });








})
function sharelocation(loc) {

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

  loc.telegram.sendMessage(loc.chat.id, "You can send your current source location by clicking on the Location keybutton \n\nor \n\nYou can share different location by clicking on the pin icon📎", option).then(() => {



  })


}






















var button = [
  [{ text: "Share Destination location", callback_data: `display_btn_share` }],
  [{ text: "Type Destination location", switch_inline_query_current_chat: '' }],
   [{ text: "Cancel", callback_data: `start_btn_wizard_Cancel` }]


]
bot.on('location', async (ctrg) => {
  ctrg.deleteMessage();
  var lo = ctrg.message.location.longitude
  var la = ctrg.message.location.latitude

  if (source) {
    src[0] = lo
    src[1] = la
    let r = await revcode(src)
    ctrg.telegram.sendMessage(ctrg.chat.id, ` Your source is set to :-\n\n${r} \n\nPlease Enter your destination :-`,
      {
        reply_markup: {
          inline_keyboard:
            button,
          InlineKeyboardButton: [[{ text: "share", request_location: true }]]


        }
      }
    )
    source = false;
  }
  else {
    dest[0] = lo
    dest[1] = la
    let d = await revcode(dest)
    ctrg.telegram.sendMessage(ctrg.chat.id, `Your destination is set to :- \n\n${d} \n  `)


    source = true;
    await estimate(ctrg, src, dest);

  }

  return;


})






// a promise
let revcode = (src) => new Promise(function(resolve, reject) {

  const options = {
    method: 'GET',
    url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
    params: { location: `${src[1]},${src[0]}`, language: 'en' },
    headers: {
      'X-RapidAPI-Key': 'b38251f12dmsh1e354647d127793p1fe19ejsnd617ffc74cff',
      'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
    }
  };

  axios.request(options).then(function(response) {
    let srcaddress = response.data.results[0].address
    console.log(response.data.results[0].address)
    resolve(srcaddress)
  }).catch(function(error) {
    console.error(error);
    return 0
  });


});



async function estimate(ctre, src, dest) {



  let arry = [
    [{ text: "Confirm", callback_data: `find_btn_wizard_Confirm` }],
    [{ text: "Cancel", callback_data: `find_btn_wizard_Cancel` }],
  ]
  let srcaddress = await revcode(src);


  await new Promise(resolve => setTimeout(resolve, 1000))
  let destaddress = await revcode(dest)

  let cost = '148';
  console.log(srcaddress)
  console.log(destaddress)


  if (srcaddress == 0 || destaddress == 0) {
    ctre.telegram.sendMessage(ctre.chat.id, ` Error\n PLease try later `)
    return;
  }
  else {
    let content = `Confirm Details :-\n\nSource : ${srcaddress}\n\nDestination : ${destaddress}\n\nEstimated Fare : Rs ${cost} \n`

    return new Promise(resolve => {
      setTimeout(() => {

        resolve(ctre.telegram.sendMessage(ctre.chat.id, ` ${content}`, {
          reply_markup: {
            inline_keyboard:
              arry,
            InlineKeyboardButton: [[{ text: "Notes", switch_inline_query_current_chat: '' }]]

          }
        }))
      }, 1000)
    })

  }


}

bot.action(/find_btn_wizard_+/, (ctxs) => {
  ctxs.deleteMessage();
  let product_id = ctxs.match.input.substring(16);
  switch (product_id) {
    case 'Confirm': let desp = searchride(ctxs, src, dest);
      break;
    case 'Cancel': {
      ctxs.deleteMessage();
      source = true
      src = []
      dest = []
      ctxs.telegram.sendMessage(ctxs.chat.id, ` Thank you !\n See you soon !`, { parse_mode: "HTML" })
    }
      break;
  }



})









async function rando() {
  //check is there already a ride with that id
  console.log(88)
  let flag = true

  var w = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
  var options = { method: 'GET', url: `https://nammadbb.webmanage.repl.co/getrideiid/${w}` };
  axios.request(options).then(function(response) {
    console.log(response.data.data)
    if (response.data.data == 0) {
      console.log(w);

      return w;

    }
    else {
      return Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    }
    console.log(response.data);
  }).catch(function(error) {
    console.error(error);
  });





}


function resolveAfter1Seconds(ridectx) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(ridectx.telegram.sendMessage(ridectx.chat.id, ` **When the passenger reaches their destination and the driver ends the ride, then the passenger gets a message like this👇**`, { parse_mode: "HTML" }))
    }, 1000);
  });
}



function resolveAfter2Seconds(ridectx) {
  return new Promise(resolve => {
    setTimeout(() => {
      var options = {
        method: 'PUT',
        url: `https://nammadbb.webmanage.repl.co/updateride/${ridectx.update.callback_query.from.id}`,
        data: { status: 'completed' }
      };

      axios.request(options).then(function(response) {
        console.log(response.data);
        if (response.data.data == 0) {
          err(ridectx)

        }
        else if (response.data.data == 1) {


          resolve(ridectx.telegram.sendMessage(ridectx.chat.id, `<strong>Ride Completed !</strong>\n\nPlease Pay Rs 148 to the driver\n\n\n`, { parse_mode: "HTML" }))
        }
      }).catch(function(error) {
        console.error(error);
      });
    }, 1000);
  });
}


function resolveAfter3Seconds(ridectx) {
  let option = [
    [{ text: "Add to quick Booking", callback_data: `add_btn_wizard_addbook` }],
    [{ text: "Not Required", callback_data: `add_btn_wizard_Cancel` }],
  ]
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(ridectx.telegram.sendMessage(ridectx.chat.id, `Would you like to add this trip for quick booking? Next time you wouldn't have to give any addresses, just simply click on quick booking and select the location!`, {
        reply_markup: {
          inline_keyboard:
            option,
          InlineKeyboardButton: [[{ text: "Notes", switch_inline_query_current_chat: '' }]]


        }
      }))
    }, 1000);
  });
}

async function searchride(ridectx, src, dest) {
  console.log(src[0],src[1],dest[0],dest[1])
  console.log(`jdddddddd`)
  console.log(ridectx.update.callback_query.from.id)
  //search algo
  let sr = await revcode(src);
  let de = await revcode(dest);
  var cont = `Ride Found !!
    \n <strong>Ride Id : </strong> 456328
    \n <strong>Auto Number : </strong> <ins>KA-05 MH 4326</ins>
    \n <strong>Driver Name : </strong> <ins>Nagesh</ins>
    \n <strong>Driver Contact : </strong> <ins>987880099</ins>
    \n <strong>Estimated Fare : </strong> <ins>Rs 148</ins>
    \n <strong>Estimated Arrival Time : </strong> <ins>14:06</ins>\n\n\nWishing you a safe and happy journey!

    
    `

  let ride = new Promise(function(resolve, reject) {

    // let rand=  rando()
    let rand = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')

    console.log("jtt")
    var options = {
      method: 'POST',
      url: 'https://nammadbb.webmanage.repl.co/rides',
      data: {
        tele_id: ridectx.update.callback_query.from.id,
        ride_id: String(rand),
        ridefrom: sr,
        rideto: de,
        src: src,
        dest: dest,
        fare: Number(148),
        status: 'ongoing',
        issaved: false
      }
    };

    axios.request(options).then(function(response) {
      if (response.data.data == 0) {
        err(ridectx)

      }
      else if (response.data.data == 1) {


        resolve(ridectx.telegram.sendMessage(ridectx.chat.id, ` ${cont} `, { parse_mode: "HTML" }))
      }
      console.log(response.data);
    }).catch(function(error) {
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


  let q = await resolveAfter1Seconds(ridectx);
  let re = await resolveAfter2Seconds(ridectx);
  let r = await resolveAfter3Seconds(ridectx);





  bot.action(/add_btn_wizard_+/, (ctxadd) => {
    console.log("hi")
    ctxadd.deleteMessage();
    let product_id = ctxadd.match.input.substring(15);
    switch (product_id) {
      case 'addbook': let desp = addride(ctxadd);
        break;
      case 'Cancel': {
        ctxadd.deleteMessage();
        source = true
        src = []
        dest = []
        ctxadd.telegram.sendMessage(ctxadd.chat.id, ` Thank you !\nSee you soon !`, { parse_mode: "HTML" })
      }
        break;
    }



  })

}


function addride(ctxu) {


  var options = {
    method: 'PUT',
    url: `https://nammadbb.webmanage.repl.co/updateride/${ctxu.update.callback_query.from.id}`,
    data: { issaved: true }
  };

  axios.request(options).then(function(response) {
    console.log(response.data);
    if (response.data.data == 0) {
      err(ctxu)

    }
    else if (response.data.data == 1) {


      ctxu.telegram.sendMessage(ctxu.chat.id, "Added Succesfully !\n\nSee you soon!!");
    }
  }).catch(function(error) {
    console.error(error);
  });




}




function quick(quickctx) {
  quickctx.deleteMessage();
  source = true


  let finalarr = [];



  var options = { method: 'GET', url: `https://nammadbb.webmanage.repl.co/getride/${quickctx.update.callback_query.from.id}` };

  axios.request(options).then(function(resp) {
    console.log(resp.data)
    if(resp.data.length==0){
      quickctx.telegram.sendMessage(quickctx.chat.id, `You Don't have any Saved Trips!!`);
      return;
      
    }


    localarr = (resp.data.map((item) => {
      return {
        text: `${String(item.ridefrom.slice(0, 25))} (to) ${String(item.rideto.slice(0, 25))}`,
        callback_data: `get_wizard_${item.src} ${item.dest}`

      }

    })

    )
    for (let i = 0; i < localarr.length; i++) { finalarr[i] = [localarr[i]] }
    finalarr.push(
       [{ text: "Cancel", callback_data: `start_btn_wizard_Cancel` }],
    )


    quickctx.telegram.sendMessage(quickctx.chat.id, `Choose a ride`,
      {
        reply_markup: {
          inline_keyboard:

            finalarr


        }
      }
    )


    console.log(resp.data);
  }).catch(function(error) {
    console.error(error);
  });



  return;
}


bot.action(/get_wizard_+/, async (ctx2gg) => {
    ctx2gg.deleteMessage();
  let product_id = ctx2gg.match.input.substring(11);
  if(product_id=='Cancel'){
     
        ctx2gg.deleteMessage();
        source = true
        src = []
        dest = []
        ctx2gg.telegram.sendMessage( ctx2gg.chat.id, ` Thank you !
        \nSee you soon !`, { parse_mode: "HTML" })
 
        return;
  }
  let ar = product_id.split(" ");
  console.log(ar)
   src = ar[0].split(",");
   dest = ar[1].split(",");
  // console.log(src)
  // console.log(dest)
  // let src1 = [];
  // let dest1 = [];
  // src[0] = Number(src[0])
  // src[1] = Number(src[1])
  // dest[0] = Number(dest[0])
  // dest[1] = Number(dest[1])
  // console.log(src1[0],src1[1],dest1[0],dest1[1])
  await estimate(ctx2gg, src, dest)


})
function saved(savectx) {
 savectx.deleteMessage();
  source = true

  var options = { method: 'GET', url: `https://nammadbb.webmanage.repl.co/getcurrent/${savectx.update.callback_query.from.id}` };

  axios.request(options).then(function(response) {
    if (response.data.length == 0) {
      savectx.telegram.sendMessage(savectx.chat.id, "No current rides");
    }
    else {
      savectx.telegram.sendMessage(savectx.chat.id, ` Ongoing RIDE\n Date:${response.data[0].date} \nRide Id:${response.data[0].ride_id}\n\nSource:${response.data[0].ridefrom}\n\nDestination:${response.data[0].rideto}\nFare:${response.data[0].fare}`);
      console.log(response.data);
    }
  }).catch(function(error) {
    console.error(error);
  });



  return;
}
function history(historyctx) {
 historyctx.deleteMessage();
  source = true
  var options = { method: 'GET', url: `https://nammadbb.webmanage.repl.co/getrideall/${historyctx.update.callback_query.from.id}` };

  axios.request(options).then(function(resp) {
    console.log(resp.data)

    let c = 'History upto last 7 rides\n\n '
    localarr = (resp.data.map((item, i, ar) => {
      if (i >= ar.length - 7) {
        c += '<strong>Date</strong>: ' + item.date + '\n' +
          '<strong>Source</strong>: ' + item.ridefrom + '\n' +
          '<strong>Destination</strong>: ' + item.rideto + '\n' +
          '<strong>Fare</strong>: ' + item.fare + '\n-----------------------------------\n\n'
      }


    })

    )
    historyctx.telegram.sendMessage(historyctx.chat.id, `${c}`, { parse_mode: "HTML" })






    console.log(resp.data);
  }).catch(function(error) {
    console.error(error);
  });

  return;
}
function support(supportctx) {
 supportctx.deleteMessage();
  let c = `
    <b>Hello!</b> Thank you for contacting  <b>Namma Yatri</b> Customer Care Support Team.

Please provide us with the following information to better assist you:


Your name:
Your email address:
Your order number (if applicable):
Brief description of your issue:


Our team will review your request and respond as soon as possible. If you have any urgent concerns, please contact us directly at <b>https://www.linkedin.com/company/nammayatri/</b>.

Thank you for your patience and cooperation.

Best regards,
<b>Namma Yatri</b> Customer Care Support Team`;

  supportctx.telegram.sendMessage(supportctx.chat.id, c, { parse_mode: 'HTML' })


  return;
}
bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

function descrip(desctx){
   desctx.deleteMessage();
  desctx.telegram.sendMessage(desctx.chat.id, `<strong>Introducing our new ride booking bot, namma_yatri!\nWith just a few simple steps, you can easily book a ride, saving you valuable time and hassle. Whether you need to get to work, run errands, or meet up with friends, our bot has got you covered. 😁

Here are the various features of the bots :-

➡️ Book a ride in just seconds by entering your pickup and destination locations. 😌
Quick booking feature that allows you to save your source and destination locations for even faster booking. 🤩
\n➡️ Real-time tracking of your current ride so you always know where your driver is taking you. 😊
\n➡️ Review your past journeys easily with ride history feature. 😁
Customer support team available to assist you if you ever have questions or issues. 😎
\n➡️ To start the bot, use the command          "/start", and choose an option amongst the list in the startup menu.

So, are you waiting for Christmas?</strong>\n
Let's get started!!\nclick 👉 : /start`, { parse_mode: 'HTML' })
}


function cancel(canctx){
  canctx.deleteMessage();
  canctx.telegram.sendMessage(canctx.chat.id,'Thank you !\nSee you soon !')
}
bot.launch()


// var axios = require("axios").default;




// // updateMany
// var axios = require("axios").default;

// var options = {
//   method: 'PUT',
//   url: 'https://nammadbb.webmanage.repl.co/update/{filter}',
//   data: {type: 'malik'}
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });
app.listen(3000, function() {
  console.log("Server is listening at port:");
});
