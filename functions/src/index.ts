import * as functions from 'firebase-functions';
import admin = require('firebase-admin/');
const fs = require('fs');

admin.initializeApp();

exports.newssr = functions.https.onRequest((req: any, res) => {
  const userAgent = req.headers['user-agent'].toLowerCase();
  let indexHTML = fs.readFileSync('./hosting/index.html').toString();
  console.log("req",req);
  const path = req.path ? req.path.split('/') : req.path;
  console.log('path', path)
  const ogPlaceholder = '<meta name="functions-insert-dynamic-og">';
  // const metaPlaceholder = '<meta name="functions-insert-dynamic-meta">';

  console.log('indexHTML', indexHTML)
  const isBot = userAgent.includes('googlebot') ||
    userAgent.includes('yahoou') ||
    userAgent.includes('bingbot') ||
    userAgent.includes('baiduspider') ||
    userAgent.includes('yandex') ||
    userAgent.includes('yeti') ||
    userAgent.includes('yodaobot') ||
    userAgent.includes('gigabot') ||
    userAgent.includes('ia_archiver') ||
    userAgent.includes('facebookexternalhit') ||
    userAgent.includes('twitterbot') ||
    userAgent.includes('developers\.google\.com') ? true : false;
  if (isBot) {
    console.log('isBot', isBot)
    console.log('true')
    const slug = path[2];
    console.log('slug', slug)
    admin.firestore().collection('content').where('slug',"==",slug).limit(1).get().then(snapshot => {
      const org:any = snapshot.docs[0];
      console.log('data', org)
      if (org) {
        org.slug = slug;
      }
      // indexHTML = indexHTML.replace(metaPlaceholder, getMeta(org));
      indexHTML = indexHTML.replace(ogPlaceholder, getOpenGraph(org));
      console.log('indexHTML', indexHTML)
      res.send(indexHTML);
    }).catch((error) => {
      console.log('error get data', error)
    });

    return;
  }

  // optional - turn on caching: res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  // indexHTML = indexHTML.replace(metaPlaceholder, getMeta());
  // indexHTML = indexHTML.replace(ogPlaceholder, getOpenGraph(org));
  res.send(indexHTML);
  console.log('indexHTML', indexHTML)
});

// const defaultDesc = 'The mobsters, bootleggers and gangsters of the 1920s and 30s, such as Al Capone, Lucky Luciano, and Bugs Moran.';
// const defaultTitle = 'Original Gangsters';
// const defaultLogo = 'https://example.com/images/headerHQ.jpg';

const getOpenGraph = (org: any) => {
  let og = ``;
  og += `<meta property="og:type" content="website" />`;

  og += `<meta property="og:title" content="${org.title}" />`;
  og += `<meta property="og:image" content="${org.fileurl}" />`;

  og += `<meta property="og:image:width" content="1200" />`;
  og += `<meta property="og:image:height" content="630" />`;
  return og;
};

// const getMeta = (org?: any) => {
//   // return other meta tags
// };
