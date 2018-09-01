

$(()=>{

    $.getJSON("http://get-rates-banks.herokuapp.com/attribute-types" , (data) => {
    }).done(function (data) {
        if(data){
            // console.log(data);
            $.each(data, (index, item)=>{
                console.log(data);
            })
        }
    })

})