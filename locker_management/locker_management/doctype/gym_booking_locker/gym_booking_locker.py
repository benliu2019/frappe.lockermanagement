# Copyright (c) 2023, Ben Liu and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator

from frappe import session



class GymBookingLocker(WebsiteGenerator):
	pass

@frappe.whitelist()
def set_locker_status_inuse(docname,user_id):

	task = frappe.db.get_all('Gym Booking Locker', filters={"user": user_id})

	if task == []:

		doc = frappe.get_doc("Gym Booking Locker", docname)
		doc.status = "in use"
		doc.user =user_id
		doc.save()

	else:
		res = task[0].name.split("-")[0]
		return res

	# status = "in use"

	#return doc.status

@frappe.whitelist()
def set_locker_status_free(docname,user_id):

	doc = frappe.get_doc("Gym Booking Locker", docname)

	doc.status = "free"
	
	doc.user =""

	doc.save()