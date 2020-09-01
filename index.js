const datas = []
const statusList = ['group','available','available','available','available','available','available','female','male','lock','']

for(let i = 0;i<400;i+=5){
    datas.push([{
        status:statusList[Math.floor(Math.random() * statusList.length)],
        seat_id:i*20,
        seat_show_number:i+1

    },
    {
        status:statusList[Math.floor(Math.random() * statusList.length)],
        seat_id:i+1*20,
        seat_show_number:i+2

    },
    {
       
        seat_id:i+4*20,
        seat_show_number:i+5
    
    },
    {
        status:statusList[Math.floor(Math.random() * statusList.length)],
        seat_id:i+2*20,
        seat_show_number:i+3

    }
,
{
    status:statusList[Math.floor(Math.random() * statusList.length)],
    seat_id:i+3*20,
    seat_show_number:i+4

},
{
    status:statusList[Math.floor(Math.random() * statusList.length)],
    seat_id:i+4*20,
    seat_show_number:i+5

}])
}
$(document).ready(function(){
    const bookingSeatTable = BookingSeatTable({
        data:datas,
        booking_seat_id:'#booking-seat',
        form_input_name:'seat_list',
        show_text_id:'#selected_list',
        selected_limit:3,
        limit_callback:function(){
            alert("Maximum "+this.selected_limit)
        }
    });
})
