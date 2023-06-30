// Copyright (c) 2023, Ben Liu and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Booking Locker', {
    refresh: function(frm) {
        frm.add_custom_button(__('Book this Locker'), function() {
            if(frm.doc.status == 'free'){
                frm.set_value('status', 'in use');
                frm.set_value('user', 'Administrator');
                frappe.show_alert({message:__('Locker Booked!'), indicator:'green'});
                frm.refresh_field('status');
                frm.save()
            }
            else{
                frappe.show_alert({message:__('Locker is already in use!'), indicator:'red'});
            }
        });

        frm.add_custom_button(__('Free this Locker'), function() {
            if(frm.doc.status == 'in use'){
                frm.set_value('status', 'free');
                frm.set_value('user', '');
                frappe.show_alert({message:__('Locker Freed!'), indicator:'green'});
                frm.refresh_field('status');
                frm.save()
            }
            else{
                frappe.show_alert({message:__('Locker is already free!'), indicator:'red'});
            }
        });

        if (frm.doc.status == 'free'){
            frm.get_field("status").set_label_indicator('green');
            frm.get_field('Free this Locker').$input.addClass('btn-secondary').removeClass('btn-primary');
            frm.get_field('Book this Locker').$input.addClass('btn-primary').removeClass('btn-secondary');
        }
        else {
            frm.get_field("status").set_label_indicator('red');
            frm.get_field('Free this Locker').$input.addClass('btn-primary').removeClass('btn-secondary');
            frm.get_field('Book this Locker').$input.addClass('btn-secondary').removeClass('btn-primary');
        }
    }
});