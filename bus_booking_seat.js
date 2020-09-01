const BookingSeatTable = ({data,booking_seat_id,form_input_name,show_text_id,selected_limit,limit_callback})=>{
        const btn_seat = ((data)=>{
            if(data.hasOwnProperty('status')){
                if(data.status === "male"){
                    return (`<td class="btn-seat-unavailable btn-seat"><i class="fa fa-male"></i></td>`)
                }
                if(data.status === "female"){
                    return (`<td class="btn-seat-unavailable btn-seat"><i class="fa fa-female"></i></td>`)
                }
                if(data.status === "group"){
                    return (`<td class="btn-seat-unavailable btn-seat"><i class="fa fa-users"></i></td>`)
                }
                if(data.status === "lock"){
                    return (`<td class="btn-seat-unavailable btn-seat"><i class="fa fa-lock"></i></td>`)
                }
                if(data.status === "available"){
                    return (`<td class="btn-unselected btn-seat btn-seat-available" data-seat_id="${data.seat_id}">${data.seat_show_number}</td>`)
                }
            }
            if(!data.hasOwnProperty('status') || data.status === null || data.status === ""){
                return (`<td class="btn-unseat"></td>`)
            }
        })

        let seat_id_list = [],seat_text_list = []

        const update_seat_list = function(id_list,text_list){
            const hidden_sealt_list_id = $(`<input type="hidden" name="${form_input_name}[]" value="${id_list}"></input>`)
            const selected_list = $(show_text_id)
            selected_list.text(text_list.join(', '))
            selected_list.append(hidden_sealt_list_id)
            
        }

        let booking_seat_table = $('<table></table>');
        data.forEach((row,index)=>{
        let seat_row = $('<tr></tr>')
        row.forEach((data)=>{
            let seat = $(btn_seat(data))
            if(data.status === "available")
                seat.click(function (e) { 
                e.preventDefault();
                if($('.btn-selected').length < selected_limit && $(this).hasClass('btn-unselected')){
                    $(this).removeClass('btn-unselected')
                    $(this).addClass('btn-selected')
                    seat_id_list.push($(this).data('seat_id'))
                    seat_text_list.push($(this).text())
                    update_seat_list(seat_id_list,seat_text_list)
                }
                else if($(this).hasClass('btn-selected')){
                    $(this).removeClass('btn-selected')
                    $(this).addClass('btn-unselected')
                    if(seat_id_list.indexOf($(this).data('seat_id')) > -1){
                        seat_id_list.splice(seat_id_list.indexOf($(this).data('seat_id')),1)
                    }
                    if(seat_text_list.indexOf($(this).text()) > -1){
                        seat_text_list.splice(seat_text_list.indexOf($(this).text()),1)
                    }
                    update_seat_list(seat_id_list,seat_text_list)
                }else{
                    limit_callback()
                }
                
            });
            seat_row.append(seat)
        })
        booking_seat_table.append(seat_row)
    })


    $(booking_seat_id).children().remove()
    $(booking_seat_id).append(booking_seat_table)
    }