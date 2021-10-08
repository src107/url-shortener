/*
Helper function isValidURL to check whether a URL is valid or not
@param myURL-URL passed(String)

returns Boolean
*/
export const isValidURL = (myUrl) => {
    if (!myUrl)
        return true;
    const pattern = new RegExp("^[a-z][a-z0-9+.-]*:");
    return pattern.test(myUrl);
}
/*
Helper function shortUrlExist to check whether shortURL exist in the database or not
@param1 shortURL - short URL entered by the user (String)
@param2 urlShorten - database entries for all URL's with respective short URL (Array.Object)

returns Boolean
*/

export const shortUrlExist = (shortURL, urlShorten) => {
    const length = urlShorten.length;
    const encodedURL = encodeURIComponent(shortURL);
    for (let i = 0; i < length; i++) {
        const docId = urlShorten[i].id;
        if (docId === encodedURL) {
            return true;
        }

    }
    return false;
}
/*Helper function getDocId to get docId (Database Id)
@param1 longURL - long URL entered by the user (String)
@param2 urlShorten - database entries for all URL's with respective short URL (Array.Object)

returns String
*/
export const getDocId = (longURL, urlShorten) => {

    const length = urlShorten.length;
    for (let i = 0; i < length; i++) {
        const {long_url} = urlShorten[i].data;
        if (long_url === longURL) {
            return urlShorten[i].id;
        }

    }
    return "";

}
/*Helper function longUrlExist to check whether longURL exist in the database or not
@param1 longURL - long URL entered by the user (String)
@param2 urlShorten - database entries for all URL's with respective short URL (Array.Object)

returns String
*/
export const longUrlExist = (longURL, urlShorten) => {
    const length = urlShorten.length;
    for (let i = 0; i < length; i++) {
        const {long_url} = urlShorten[i].data;
        if (long_url === longURL) {
            return urlShorten[i].data.short_url;
        }

    }
    return "";
}
/*
Helper function encode to do 64 bit encoding for a particular id
@param1 id - Id which needs to be encoded (Number) 

returns String
*/
const encode = (id) => {
    const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const base = characters.length;
    const code = [];
    while (id > 0) {
        code.push(characters[id % base]);
        id = id / base;
    }
    return code.join('');


}
/*
Helper function getShortenURL to convert the long URL to short Link.
@param1 longURL - long URL entered by the user (String)
@param2 shortURL - short URL entered by the user (String)
@param3 urlShorten - database entries for all URL's with respective short URL (Array.Object)

returns String
*/
export const getShortenURL = (longURL, shortURL, urlShorten) => {
    
    const longURLExist = longUrlExist(longURL, urlShorten);
    if (longURLExist && !shortURL) {
        return longURLExist;
    }
    if (shortURL) {
        return shortURL;
    }
    
    return "https://my_url.ly/" + encode(urlShorten.length + 1);
    
    
}