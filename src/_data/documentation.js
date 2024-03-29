
require('dotenv').config();

const Airtable = require('airtable');

let base = new Airtable({ apiKey: process.env.KEY }).base('appGTsdQhNkWGIICH');

module.exports = () => {
  return new Promise((resolve, reject) => {
    let allDatasets = []; // change 'allDatasets' to something more relevant to your project
      base('Documentation') 
        .select({ 
            view: 'Grid All' 
        })
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach((record) => {
              allDatasets.push({
                title: record.get('title'),
                location: record.get('location'),
                startdate: record.get('startdate'),
                enddate: record.get('enddate'),
                showInternalLink: record.get('show-internal-link'),
                externallink: record.get('external-link'),
                lead: record.get('lead-text'),
                embedCode: record.get('embed-code'),
                body: record.get('body-text'),
                linkedFiles: record.get('linked-files'),
                linkedCaptions: record.get('linked-captions'),
                linkedCaptionsShow: record.get('linked-captions-show'),
                onStartpage: record.get('on-startpage'),
                images: record.get('images'),
                audiofiles: record.get('audio-files'),
                videofiles: record.get('video'),
                slug: record.get('slug'),
                type: record.get('type'),
                website: record.get('website'),
                featured: record.get('featured'),
                linkedShows: record.get('linked-events'),
                linkedShowTitles: record.get('title (from linked-events)'),
                linkedShowSlugs: record.get('slug (from linked-events)'),
                showLinkedWorks: record.get('show-linked-works'),
                linkedWorks: record.get('linked-works'),
                linkedWorksTitles: record.get('title (from linked-works)'),
                linkedWorksSlugs: record.get('slug (from linked-works)'),
                linkedSongs: record.get('linked-songs'),
                linkedSongsIds: record.get('id (from linked-songs)'),
                linkedSongsTitles: record.get('Title (from linked-songs)')
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