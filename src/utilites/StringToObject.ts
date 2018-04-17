/**
 * @param locationParams 
 */
export default (locationParams) => {
    var pairs = locationParams.slice(1).split('&');
    var result = {};
    pairs.forEach(function(pair: any) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return result;
}