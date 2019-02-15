# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
from odoo import api, fields, models, _
from odoo.exceptions import UserError

from odoo.tools.facturacion.cc import controlCode
from odoo.tools.facturacion.literal import toLiteral

from datetime import datetime
from dateutil.parser import parse

class PosDosificacion(models.Model):
    _name = "pos.dosificacion"
    _description = "Dosificacion de facturas"

    # impuestos personalizacion
    name = fields.Char('Nombre', default='Nombre dosificación')
    nro_autorizacion = fields.Char(string="Nro Autorización")
    llave = fields.Char(string="Llave")
    fec_lemision = fields.Date(string="Fecha Limite de emisión")
    estado = fields.Boolean(string="Estado", default=False)

    start = fields.Integer(string='Inicio', default=1)
    current = fields.Integer(string='Actual', default=0, readonly=True, )
    next = fields.Integer(string='Next', default=1, readonly=True, )

    @api.model
    def get_active(self):
        active = self.search([('estado','=', True)])
        return active

    @api.multi
    def get_data(self, nit, fecha, total):

        cfecha = fecha.replace('-','')[:8:]
        ctotal = str(round(float(total)))

        active = self.get_active()
        if not active:
            return {}

        # FIX ME!!  controlar fecha limite de emision
        # if(fecha_now >  fec_liemision) :
        # ....
        # ....

        autorizacion = active.nro_autorizacion
        factura      = str(active.next)
        llave        = active.llave
        lemision     = active.fec_lemision

        cod_control = controlCode(
            autorizacion,
            factura,
            nit,
            cfecha,
            ctotal,
            llave
        )

        self.set_next()

        return {
            'id'           : active.id,
            'autorizacion' : autorizacion,
            'llave'        : llave,
            'lemision'     : lemision,
            'nit'          : nit,
            'fecha'        : fecha,
            'total'        : total,
            'factura'      : factura,
            'cod_control'  : cod_control
        }


    @api.multi
    def set_next(self):
        active = self.get_active()
        # print(active.current, active.next)

        active.write({'current': active.next, 'next': active.next+1})

        a = self.get_active()
        # print(a.current, a.next)

        self.env.cr.commit()

        #28, 29














