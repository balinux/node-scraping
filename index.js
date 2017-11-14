'use strict'

// require('colors');
require('dotenv').config()
const telebot  = require('telebot');
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const schedule = require('node-schedule');

const bot = new telebot(process.env.token);
var app = express();

/**
 * start bot
 */

// bot.on(['*', '/*'], (msg, self) => {
//     let id = msg.from.id;
//     let replyToMessage = msg.message_id;
//     let type = self.type;
//     let parseMode = 'html';
//     return bot.sendMessage(
//         id, `This is a <b>${ type }</b> message.`, {replyToMessage, parseMode}
//     );
// });
// bot.sendMessage(207853653,'tes')

bot.start();

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 7)];
rule.hour = 8;
rule.minute = 10;

schedule.scheduleJob(rule, function(){
    // console.log('The answer to life, the universe, and everything!');
        request('https://www.packtpub.com//packt/offers/free-learning', function (err,res, body) {
        if (err) throw err;
         let $ = cheerio.load(body);
         $('#page').filter(function() {
             var data = $(this);
    
             var dapet = data.find('.dotd-title').text();
            bot.sendMessage(207853653,dapet);
            //  console.log(dapet);
         })
    });
  });

app.get('/scrape', function(req, res){

    // let url ='https://visitbaligili.com/';
    
    request('https://www.packtpub.com//packt/offers/free-learning', function (err,res, body) {
        if (err) throw err;
         let $ = cheerio.load(body);
         $('#page').filter(function() {
             var data = $(this);
    
             var dapet = data.find('.dotd-title').text();
    
             console.log(dapet);
         })
    });
})

app.listen('8080')
console.log('Magic happens on port 8080');