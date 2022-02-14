
require('dotenv').config();

const Airtable = require('airtable');

let base = new Airtable({ apiKey: process.env.KEY }).base('appQ2wF7bU2maMfui');

module.exports = () => {
  return new Promise((resolve, reject) => {
    let twistedThumbs = [];
      base('Items') 
        .select({ 
            view: 'index-pool' 
        })
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach((record) => {
              twistedThumbs.push({
                images: record.get('images'),
                caption: record.get('caption'),
                info: record.get('info'),
                name: record.get('name'),
                id: record.get('id'),
                indexPool: record.get('index-pool'),
              });
            });
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              reject(err)
            } else {
              resolve(twistedThumbs);
              console.log(twistedThumbs);
            }
          }
        );
      });
    };