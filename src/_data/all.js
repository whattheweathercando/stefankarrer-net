
require('dotenv').config();

const Airtable = require('airtable');

let base = new Airtable({ apiKey: process.env.KEY }).base('appGTsdQhNkWGIICH');

module.exports = () => {
  return new Promise((resolve, reject) => {
    let allDatasets = []; // change 'allDatasets' to something more relevant to your project
      base('Documentation') 
        .select({ 
            view: 'Grid All' 
            // view: 'Grid Website' 
        })
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach((record) => {
              allDatasets.push({
                title: record.get('title'),
                location: record.get('location'),
                startdate: record.get('startdate'),
                enddate: record.get('enddate'),
                externallink: record.get('external-link'),
                lead: record.get('lead-text'),
                body: record.get('body-text'),
                images: record.get('images'),
                audiofiles: record.get('audio-files'),
                slug: record.get('slug'),
                type: record.get('type'),
                website: record.get('website'),
              });
            });
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              reject(err)
            } else {
              resolve(allDatasets);
              console.log(allDatasets);
            }
          }
        );
      });
    };