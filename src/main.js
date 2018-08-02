const showPage= () => {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('content-splash').style.display = 'none';
    document.getElementById('map').style.display = 'block';
}


window.onload =()=> {
    const myVar = setTimeout(showPage,2000);
}