import getUniqueKeyValues from "../getUniqueValues";
import styles from '../styles/Home.module.css'


export const getStaticProps = async () => {


    // Here I fetch info through the Apple api using 'fetch'
    // Note: The api link below's 'id' parameters were manually acquired through the apple music website
    const galantis = await fetch('https://itunes.apple.com/lookup?id=543322169&entity=song&limit=20&sort=recent');

    // Then the response above is converted the response to json here below
    const galantisData = await galantis.json();

    // Due to duplicate track names I created this function which I reused for the rest of the queries as a contingency
    // The function used here is explained in its relative file
    const galantisFiltered = getUniqueKeyValues("trackName", galantisData.results)
    
    // The above code is repeated below for the rest of the search queries
    const billie = await fetch('https://itunes.apple.com/lookup?id=1065981054&entity=song&limit=20&sort=recent');
    const billieData = await billie.json();
    const billieFiltered = getUniqueKeyValues("trackName", billieData.results)

    const peace = await fetch('https://itunes.apple.com/search?term=peace&limit=50');
    const peaceData = await peace.json();
    const peaceNameFiltered = getUniqueKeyValues("artistName", peaceData.results)
    
    const adele = await fetch('https://itunes.apple.com/lookup?id=262836961&entity=song&sort=recent');
    const adeleData = await adele.json();
    const adeleFiltered = getUniqueKeyValues("trackName", adeleData.results)

    return {
        props: { 
            galantisRecent: galantisFiltered, 
            billieRecent: billieFiltered,
            peaceSearch: peaceNameFiltered,
            adeleRecent: adeleFiltered 
        }
    }
}

let count = 0;

const results = ( {galantisRecent, billieRecent, peaceSearch, adeleRecent} ) => {
    return (
        <div>
            <h1>Galantis's Most recent songs</h1>
            {/* the props here are mapped, sliced first because a larger query had to be made to filter out duplicate results, then a count added for contingency */}
            {galantisRecent.slice(0, 10).map((a, count) => (
            <div key={count + 1}>
                {<div> {count + 1} <b>track:</b> {a.trackName} <b>Artist</b> {a.artistName} </div>}
            </div>
            ))}

            {/* The above code is replicated here below for the rest of the query results */}
            <h1>Billie Eilish's Most recent songs</h1>
            {billieRecent.slice(0, 10).map((a, count) => (
                <div key={count + 1}>
                    {<div> {count + 1} <b>track:</b> {a.trackName} <b>Artist</b> {a.artistName} </div>}
                </div>
            ))}

            <h1>Querying Peace keyword and media type</h1>
            {peaceSearch.slice(0, 30).map((a, count) => (
                <div key={count + 1}>
                    {<div> {count + 1} <b>Artist Name:</b> {a.artistName} <b>Media Type:</b> {a.wrapperType} </div>}
                </div>
            ))}

            <h1>Adele's Songs of 2021</h1>
            {adeleRecent.slice(0, 30).map((a, count) => (
                <div key={count + 1}>
                    {a.releaseDate.indexOf("2021") != -1 && <div> {count + 1} <b>Track Name:</b> {a.trackName} <b>Release Date:</b> {a.releaseDate.slice(0,4)} </div>}
                </div>
            ))}

            <h1>Top 10 Movies and Podcasts</h1>
            <div>
                <div>
                    The apple Api is not wired to allow the initiation of a search query using only a media type and/or rating index.
                    It is in fact required to contain an 'id' or search word or 'term', which effectively prevents us to query
                    indiscriminately for all the top movies and podcasts.
                    To fix this issue, this functionality would have to be added by Apple.

                    Additionally movies and podcasts cannot be queried concurrently, only one or the other can be queried with each api call. 
                    The workaround, taking into consideration the comment I have made above, would be to query podcasts and movies seperately 
                    then cross check the rating indexes to create the list requested. However, the indexRating is not visible within the json file and
                    would need to be made available to do so.
                </div>        
            </div>
        </div>
    )
}

export default results