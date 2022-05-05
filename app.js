const form = document.querySelector('#searchForm');
const res = document.querySelector('#resTable');
const cont = document.getElementById("allContaint");
var rec;
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(rec){
        clearTimeout(rec);
    }
    const ctype = form.elements.coinType.value;
    cont.classList.add('mainClick');
    cont.classList.remove('main');    
    fetchPrice(ctype);
    

});

const fetchPrice = async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=INR`);
    console.log(r.data.coin.price);
    


/*function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }*/

/*const showPrice = (ticker,timestamp)=>{
    const time = timeConverter(timestamp);*/
    const price = r.data.coin.price;
    const vol = r.data.coin.volume;
    const change = r.data.coin.priceChange1d;
    const coin = r.data.coin.name;
    const curr = 'INR';
    var col= "green";
    if(change<0){
        col = "red";
    }
    res.innerHTML = `<tr class="bg-primary" style="color: white;">
    <td>
        Property
    </td>
    <td>
        Value
    </td>
</tr>
<tr>
    <td>${coin}</td>
    <td style="color:${col};"><span style="font-size: 1.3em;">${price}</span> ${curr}</td>
</tr>
<tr>
    <td>${price}${curr}</td>
</tr>

<tr>
    <td>Volume</td>
    <td>${vol}</td>
</tr>
<tr>
    <td>Change</td>
    <td style="color:${col};">${change} ${curr}</td>
</tr>`
rec = setTimeout(()=>fetchPrice(ctype),10000);
};