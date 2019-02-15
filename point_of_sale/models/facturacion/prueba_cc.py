import cc



def main():
    pruebas = [
        {
            'autorizacion' : '7904006306693',
            'factura' : '876814',
            'nit' : '1665979',
            'fecha' : '20080519',
            'total': '35958.6',
            'llave' : 'zZ7Z]xssKqkEf_6K9uH(EcV+%x+u[Cca9T%+_$kiLjT8(zr3T9b5Fx2xG-D+_EBS'
        },
        {
            'autorizacion' : '8004005263848',
            'factura' : '673173',
            'nit' : '1666188',
            'fecha' : '20080810',
            'total': '51330',
            'llave' : 'PNRU4cgz7if)[tr#J69j=yCS57i=uVZ$n@nv6wxaRFP+AUf*L7Adiq3TT[Hw-@wt'
        },
        {
            'autorizacion' : '7904006098968',
            'factura' : '165657',
            'nit' : '1666615',
            'fecha' : '20080630',
            'total': '96459',
            'llave' : 'm3dcSc)Dg#SN}prtK=9xn[m+pgAxL%N67G}QfwNZM+)IzCnvP$T*qjEKhmJnaDHm'
        }
    ]

    """ 
    7904006306693	876814	1665979	19/05/2008	35958,6	zZ7Z]xssKqkEf_6K9uH(EcV+%x+u[Cca9T%+_$kiLjT8(zr3T9b5Fx2xG-D+_EBS
    8004005263848	673173	1666188	10/08/2008	51330	PNRU4cgz7if)[tr#J69j=yCS57i=uVZ$n@nv6wxaRFP+AUf*L7Adiq3TT[Hw-@wt
    7904006098968	165657	1666615	30/06/2008	96459	m3dcSc)Dg#SN}prtK=9xn[m+pgAxL%N67G}QfwNZM+)IzCnvP$T*qjEKhmJnaDHm

    """



    for i in pruebas:

        total = str(int(round(float(i['total']), 0)))

        print(total, type(total))

        print(i, cc.controlCode(
            i['autorizacion'],
            i['factura'],
            i['nit'],
            i['fecha'],
            total,
            i['llave'],
        ))

    

if __name__ == '__main__':
    main()




