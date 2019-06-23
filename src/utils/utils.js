module.exports.convertDate = date => {
    const todate = date.getDate();
    const tomonth = date.getMonth() + 1;
    const toyear = date.getFullYear();
    const hours = date.getHours();
    const minutes = `0${ date.getMinutes()}`;
    const seconds = `0${ date.getSeconds()}`;
    return `${hours }:${ minutes.substr(-2) }:${ seconds.substr(-2) } - ${ tomonth }/${ todate }/${ toyear}`;
}