// Copyright 2010 Carlos Alonso del Val.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.


// Mas informacion en <http://vac2.net/telar/qrcode/>.
// Basado en la documentacion y codigo de Y. Swetake.
// En memoria de TomÃ¡s PollÃ¡n SantamarÃ­a.

// Tablas.
var qr_tabla_versiones_numero_modulos=[null,21,25,29,33,37,41,45,49,53,57,61,65,69,73,77,81,85,89,93,97,101,105,109,113,117,121,125,129,133,137,141,145,149,153,157,161,165,169,173,177];
var qr_tabla_correccion_error_codigo={'L':1,'M':0,'Q':3,'H':2};
var qr_tabla_capacidad_mensaje_bits_maxima={
	'L':[null,152,272,440,640,864,1088,1248,1552,1856,2192,2592,2960,3424,3688,4184,4712,5176,5768,6360,6888,7456,8048,8752,9392,10208,10960,11744,12248,13048,13880,14744,15640,16568,17528,18448,19472,20528,21616,22496,23648],
	'M':[null,128,224,352,512,688,864,992,1232,1456,1728,2032,2320,2672,2920,3320,3624,4056,4504,5016,5352,5712,6256,6880,7312,8000,8496,9024,9544,10136,10984,11640,12328,13048,13800,14496,15312,15936,16816,17728,18672],
	'Q':[null,104,176,272,384,496,608,704,880,1056,1232,1440,1648,1952,2088,2360,2600,2936,3176,3560,3880,4096,4544,4912,5312,5744,6032,6464,6968,7288,7880,8264,8920,9368,9848,10288,10832,11408,12016,12656,13328],
	'H':[null,72,128,208,288,368,480,528,688,800,976,1120,1264,1440,1576,1784,2024,2264,2504,2728,3080,3248,3536,3712,4112,4304,4768,5024,5288,5608,5960,6344,6760,7208,7688,7888,8432,8768,9136,9776,10208]
};
var qr_tabla_bits_adicionales_contador_caracteres={
	1:[null,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	2:[null,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	4:[null,0,0,0,0,0,0,0,0,0,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
	8:[null]
};
var qr_tabla_polinomio_gx_bloques_bytes_datos={
	'L':[null,[7,26,1],[10,44,1],[15,70,1],[20,100,1],[26,134,1],[18,86,2],[20,98,2],[24,121,2],[30,146,2],[18,86,2,87,2],[20,101,4],[24,116,2,117,2],[26,133,4],[30,145,3,146,1],[22,109,5,110,1],[24,122,5,123,1],[28,135,1,136,5],[30,150,5,151,1],[28,141,3,142,4],[28,135,3,136,5],[28,144,4,145,4],[28,139,2,140,7],[30,151,4,152,5],[30,147,6,148,4],[26,132,8,133,4],[28,142,10,143,2],[30,152,8,153,4],[30,147,3,148,10],[30,146,7,147,7],[30,145,5,146,10],[30,145,13,146,3],[30,145,17],[30,145,17,146,1],[30,145,13,146,6],[30,151,12,152,7],[30,151,6,152,14],[30,152,17,153,4],[30,152,4,153,18],[30,147,20,148,4],[30,148,19,149,6]],
	'M':[null,[10,26,1],[16,44,1],[26,70,1],[18,50,2],[24,67,2],[16,43,4],[18,49,4],[22,60,2,61,2],[22,58,3,59,2],[26,69,4,70,1],[30,80,1,81,4],[22,58,6,59,2],[22,59,8,60,1],[24,64,4,65,5],[24,65,5,66,5],[28,73,7,74,3],[28,74,10,75,1],[26,69,9,70,4],[26,70,3,71,11],[26,67,3,68,13],[26,68,17],[28,74,17],[28,75,4,76,14],[28,73,6,74,14],[28,75,8,76,13],[28,74,19,75,4],[28,73,22,74,3],[28,73,3,74,23],[28,73,21,74,7],[28,75,19,76,10],[28,74,2,75,29],[28,74,10,75,23],[28,74,14,75,21],[28,74,14,75,23],[28,75,12,76,26],[28,75,6,76,34],[28,74,29,75,14],[28,74,13,75,32],[28,75,40,76,7],[28,75,18,76,31]],
	'Q':[null,[13,26,1],[22,44,1],[18,35,2],[26,50,2],[18,33,2,34,2],[24,43,4],[18,32,2,33,4],[22,40,4,41,2],[20,36,4,37,4],[24,43,6,44,2],[28,50,4,51,4],[26,46,4,47,6],[24,44,8,45,4],[20,36,11,37,5],[30,54,5,55,7],[24,43,15,44,2],[28,50,1,51,15],[28,50,17,51,1],[26,47,17,48,4],[30,54,15,55,5],[28,50,17,51,6],[30,54,7,55,16],[30,54,11,55,14],[30,54,11,55,16],[30,54,7,55,22],[28,50,28,51,6],[30,53,8,54,26],[30,54,4,55,31],[30,53,1,54,37],[30,54,15,55,25],[30,54,42,55,1],[30,54,10,55,35],[30,54,29,55,19],[30,54,44,55,7],[30,54,39,55,14],[30,54,46,55,10],[30,54,49,55,10],[30,54,48,55,14],[30,54,43,55,22],[30,54,34,55,34]],
	'H':[null,[17,26,1],[28,44,1],[22,35,2],[16,25,4],[22,33,2,34,2],[28,43,4],[26,39,4,40,1],[26,40,4,41,2],[24,36,4,37,4],[28,43,6,44,2],[24,36,3,37,8],[28,42,7,43,4],[22,33,12,34,4],[24,36,11,37,5],[24,36,11,37,7],[30,45,3,46,13],[28,42,2,43,17],[28,42,2,43,19],[26,39,9,40,16],[28,43,15,44,10],[30,46,19,47,6],[24,37,34],[30,45,16,46,14],[30,46,30,47,2],[30,45,22,46,13],[30,46,33,47,4],[30,45,12,46,28],[30,45,11,46,31],[30,45,19,46,26],[30,45,23,46,25],[30,45,23,46,28],[30,45,19,46,35],[30,45,11,46,46],[30,46,59,47,1],[30,45,22,46,41],[30,45,2,46,64],[30,45,24,46,46],[30,45,42,46,32],[30,45,10,46,67],[30,45,20,46,61]]
}
var qr_tabla_datos_numero_bits_libres=[null,0,7,7,7,7,7,0,0,0,0,0,0,0,3,3,3,3,3,3,3,4,4,4,4,4,4,4,3,3,3,3,3,3,3,0,0,0,0,0,0];
var qr_tabla_palabras_datos_maximo=[null,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];
var qr_tabla_caracteres_alfanumericos={'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'A':10,'B':11,'C':12,'D':13,'E':14,'F':15,'G':16,'H':17,'I':18,'J':19,'K':20,'L':21,'M':22,'N':23,'O':24,'P':25,'Q':26,'R':27,'S':28,'T':29,'U':30,'V':31,'W':32,'X':33,'Y':34,'Z':35,' ':36,'$':37,'%':38,'*':39,'+':40,'-':41,'.':42,'/':43,':':44};
var qr_tabla_formatos_informacion=[[0,1,0,0,1,0,0,0,0,0,1,0,1,0,1],[1,0,1,0,0,1,0,0,1,0,0,0,1,0,1],[0,0,1,1,1,1,1,0,0,1,1,1,1,0,1],[1,1,0,1,0,0,1,0,1,1,0,1,1,0,1],[1,0,0,1,1,1,1,1,1,0,1,0,0,0,1],[0,1,1,1,0,0,1,1,0,0,0,0,0,0,1],[1,1,1,0,1,0,0,1,1,1,1,1,0,0,1],[0,0,0,0,0,1,0,1,0,1,0,1,0,0,1],[0,0,1,0,0,0,1,1,1,1,1,0,1,1,1],[1,1,0,0,1,1,1,1,0,1,0,0,1,1,1],[0,1,0,1,0,1,0,1,1,0,1,1,1,1,1],[1,0,1,1,1,0,0,1,0,0,0,1,1,1,1],[1,1,1,1,0,1,0,0,0,1,1,0,0,1,1],[0,0,0,1,1,0,0,0,1,1,0,0,0,1,1],[1,0,0,0,0,0,1,0,0,0,1,1,0,1,1],[0,1,1,0,1,1,1,0,1,0,0,1,0,1,1],[1,0,0,1,0,0,0,1,0,1,1,0,1,0,0],[0,1,1,1,1,1,0,1,1,1,0,0,1,0,0],[1,1,1,0,0,1,1,1,0,0,1,1,1,0,0],[0,0,0,0,1,0,1,1,1,0,0,1,1,0,0],[0,1,0,0,0,1,1,0,1,1,1,0,0,0,0],[1,0,1,0,1,0,1,0,0,1,0,0,0,0,0],[0,0,1,1,0,0,0,0,1,0,1,1,0,0,0],[1,1,0,1,1,1,0,0,0,0,0,1,0,0,0],[1,1,1,1,1,0,1,0,1,0,1,0,1,1,0],[0,0,0,1,0,1,1,0,0,0,0,0,1,1,0],[1,0,0,0,1,1,0,0,1,1,1,1,1,1,0],[0,1,1,0,0,0,0,0,0,1,0,1,1,1,0],[0,0,1,0,1,1,0,1,0,0,1,0,0,1,0],[1,1,0,0,0,0,0,1,1,0,0,0,0,1,0],[0,1,0,1,1,0,1,1,0,1,1,1,0,1,0],[1,0,1,1,0,1,1,1,1,1,0,1,0,1,0]];
var qr_tabla_versiones_informacion={7:[[0,0,1],[0,1,0],[0,1,0],[0,1,1],[1,1,1],[0,0,0]],8:[[0,0,1],[1,1,1],[0,1,1],[0,1,0],[0,0,0],[1,0,0]],9:[[1,0,0],[1,1,0],[0,1,0],[1,0,1],[1,0,0],[1,0,0]],10:[[1,1,0],[0,1,0],[1,1,0],[0,1,0],[0,1,0],[1,0,0]],11:[[0,1,1],[0,1,1],[1,1,1],[1,0,1],[1,1,0],[1,0,0]],12:[[0,1,0],[0,0,1],[1,0,1],[1,1,0],[0,0,1],[1,0,0]],13:[[1,1,1],[0,0,0],[1,0,0],[0,0,1],[1,0,1],[1,0,0]],14:[[1,0,1],[1,0,0],[0,0,0],[1,1,0],[0,1,1],[1,0,0]],15:[[0,0,0],[1,0,1],[0,0,1],[0,0,1],[1,1,1],[1,0,0]],16:[[0,0,0],[1,1,1],[1,0,1],[1,0,1],[0,0,0],[0,1,0]],17:[[1,0,1],[1,1,0],[1,0,0],[0,1,0],[1,0,0],[0,1,0]],18:[[1,1,1],[0,1,0],[0,0,0],[1,0,1],[0,1,0],[0,1,0]],19:[[0,1,0],[0,1,1],[0,0,1],[0,1,0],[1,1,0],[0,1,0]],20:[[0,1,1],[0,0,1],[0,1,1],[0,0,1],[0,0,1],[0,1,0]],21:[[1,1,0],[0,0,0],[0,1,0],[1,1,0],[1,0,1],[0,1,0]],22:[[1,0,0],[1,0,0],[1,1,0],[0,0,1],[0,1,1],[0,1,0]],23:[[0,0,1],[1,0,1],[1,1,1],[1,1,0],[1,1,1],[0,1,0]],24:[[0,0,1],[0,0,0],[1,1,0],[1,1,1],[0,0,0],[1,1,0]],25:[[1,0,0],[0,0,1],[1,1,1],[0,0,0],[1,0,0],[1,1,0]],26:[[1,1,0],[1,0,1],[0,1,1],[1,1,1],[0,1,0],[1,1,0]],27:[[0,1,1],[1,0,0],[0,1,0],[0,0,0],[1,1,0],[1,1,0]],28:[[0,1,0],[1,1,0],[0,0,0],[0,1,1],[0,0,1],[1,1,0]],29:[[1,1,1],[1,1,1],[0,0,1],[1,0,0],[1,0,1],[1,1,0]],30:[[1,0,1],[0,1,1],[1,0,1],[0,1,1],[0,1,1],[1,1,0]],31:[[0,0,0],[0,1,0],[1,0,0],[1,0,0],[1,1,1],[1,1,0]],32:[[1,0,1],[0,1,0],[1,1,1],[0,0,1],[0,0,0],[0,0,1]],33:[[0,0,0],[0,1,1],[1,1,0],[1,1,0],[1,0,0],[0,0,1]],34:[[0,1,0],[1,1,1],[0,1,0],[0,0,1],[0,1,0],[0,0,1]],35:[[1,1,1],[1,1,0],[0,1,1],[1,1,0],[1,1,0],[0,0,1]],36:[[1,1,0],[1,0,0],[0,0,1],[1,0,1],[0,0,1],[0,0,1]],37:[[0,1,1],[1,0,1],[0,0,0],[0,1,0],[1,0,1],[0,0,1]],38:[[0,0,1],[0,0,1],[1,0,0],[1,0,1],[0,1,1],[0,0,1]],39:[[1,0,0],[0,0,0],[1,0,1],[0,1,0],[1,1,1],[0,0,1]],40:[[1,0,0],[1,0,1],[1,0,0],[0,1,1],[0,0,0],[1,0,1]]};
var qr_tabla_exponente_entero=[1,2,4,8,16,32,64,128,29,58,116,232,205,135,19,38,76,152,45,90,180,117,234,201,143,3,6,12,24,48,96,192,157,39,78,156,37,74,148,53,106,212,181,119,238,193,159,35,70,140,5,10,20,40,80,160,93,186,105,210,185,111,222,161,95,190,97,194,153,47,94,188,101,202,137,15,30,60,120,240,253,231,211,187,107,214,177,127,254,225,223,163,91,182,113,226,217,175,67,134,17,34,68,136,13,26,52,104,208,189,103,206,129,31,62,124,248,237,199,147,59,118,236,197,151,51,102,204,133,23,46,92,184,109,218,169,79,158,33,66,132,21,42,84,168,77,154,41,82,164,85,170,73,146,57,114,228,213,183,115,230,209,191,99,198,145,63,126,252,229,215,179,123,246,241,255,227,219,171,75,150,49,98,196,149,55,110,220,165,87,174,65,130,25,50,100,200,141,7,14,28,56,112,224,221,167,83,166,81,162,89,178,121,242,249,239,195,155,43,86,172,69,138,9,18,36,72,144,61,122,244,245,247,243,251,235,203,139,11,22,44,88,176,125,250,233,207,131,27,54,108,216,173,71,142,1];
var qr_tabla_entero_exponente=[null,0,1,25,2,50,26,198,3,223,51,238,27,104,199,75,4,100,224,14,52,141,239,129,28,193,105,248,200,8,76,113,5,138,101,47,225,36,15,33,53,147,142,218,240,18,130,69,29,181,194,125,106,39,249,185,201,154,9,120,77,228,114,166,6,191,139,98,102,221,48,253,226,152,37,179,16,145,34,136,54,208,148,206,143,150,219,189,241,210,19,92,131,56,70,64,30,66,182,163,195,72,126,110,107,58,40,84,250,133,186,61,202,94,155,159,10,21,121,43,78,212,229,172,115,243,167,87,7,112,192,247,140,128,99,13,103,74,222,237,49,197,254,24,227,165,153,119,38,184,180,124,17,68,146,217,35,32,137,46,55,63,209,91,149,188,207,205,144,135,151,178,220,252,190,97,242,86,211,171,20,42,93,158,132,60,57,83,71,109,65,162,31,45,67,216,183,123,164,118,196,23,73,236,127,12,111,246,108,161,59,82,41,157,85,170,251,96,134,177,187,204,62,90,203,89,95,176,156,169,160,81,11,245,22,235,122,117,44,215,79,174,213,233,230,231,173,232,116,214,244,234,168,80,88,175]
var qr_tabla_poninomios_gx={7:[21,102,238,149,146,229,87,0],10:[45,32,94,64,70,118,61,46,67,251,0],13:[78,140,206,218,130,104,106,100,86,100,176,152,74,0],15:[105,99,5,124,140,237,58,58,51,37,202,91,61,183,8,0],16:[120,225,194,182,169,147,191,91,3,76,161,102,109,107,104,120,0],17:[136,163,243,39,150,99,24,147,214,206,123,239,43,78,206,139,43,0],18:[153,96,98,5,179,252,148,152,187,79,170,118,97,184,94,158,234,215,0],20:[190,188,212,212,164,156,239,83,225,221,180,202,187,26,163,61,50,79,60,17,0],22:[231,165,105,160,134,219,80,98,172,8,74,200,53,221,109,14,230,93,242,247,171,210,0],24:[21,227,96,87,232,117,0,111,218,228,226,192,152,169,180,159,126,251,117,211,48,135,121,229,0],26:[70,218,145,153,227,48,102,13,142,245,21,161,53,165,28,111,201,145,17,118,182,103,2,158,125,173,0],28:[123,9,37,242,119,212,195,42,87,245,43,21,201,232,27,205,147,195,190,110,180,108,234,224,104,200,223,168,0],30:[180,192,40,238,216,251,37,156,130,224,193,226,173,42,125,222,96,239,86,110,48,50,182,179,31,216,152,145,173,41,0],32:[241,220,185,254,52,80,222,28,60,171,60,38,156,80,185,120,27,89,123,242,32,138,138,209,67,4,167,249,190,106,6,10,0],34:[51,129,62,98,13,167,129,183,61,114,70,56,103,218,239,229,158,58,125,163,140,86,193,113,94,105,19,108,21,26,94,146,77,111,0],36:[120,30,233,113,251,117,196,121,74,120,177,105,210,87,37,218,63,18,107,238,248,113,152,167,0,115,152,60,234,246,31,172,16,98,183,200,0],40:[15,35,53,232,20,72,134,125,163,47,41,88,114,181,35,175,7,170,104,226,174,187,26,53,106,235,56,163,57,247,161,128,205,128,98,252,161,79,116,59,0],42:[96,50,117,194,162,171,123,201,254,237,199,213,101,39,223,101,34,139,131,15,147,96,106,188,8,230,84,110,191,221,242,58,3,0,231,137,18,25,230,221,103,250,0],44:[181,73,102,113,130,37,169,204,147,217,194,52,163,68,114,118,126,224,62,143,78,44,238,1,247,14,145,9,123,72,25,191,243,89,188,168,55,69,246,71,121,61,7,190,0],46:[15,82,19,223,202,43,224,157,25,52,174,119,245,249,8,234,104,73,241,60,96,4,1,36,211,169,216,135,16,58,44,129,113,54,5,89,99,187,115,202,224,253,112,88,94,112,0],48:[108,34,39,163,50,84,227,94,11,191,238,140,156,247,21,91,184,120,150,95,206,107,205,182,160,135,111,221,18,115,123,46,63,178,61,240,102,39,90,251,24,60,146,211,130,196,25,228,0],50:[205,133,232,215,170,124,175,235,114,228,69,124,65,113,32,189,42,77,75,242,215,242,160,130,209,126,160,32,13,46,225,203,242,195,111,209,3,35,193,203,99,209,46,118,9,164,161,157,125,232,0],52:[51,116,254,239,33,101,220,200,242,39,97,86,76,22,121,235,233,100,113,124,65,59,94,190,89,254,134,203,242,37,145,59,14,22,215,151,233,184,19,124,127,86,46,192,89,251,220,50,186,86,50,116,0],54:[156,31,76,198,31,101,59,153,8,235,201,128,80,215,108,120,43,122,25,123,79,172,175,238,254,35,245,52,192,184,95,26,165,109,218,209,58,102,225,249,184,238,50,45,65,46,21,113,221,210,84,201,26,183,0],56:[10,61,20,207,202,154,151,247,196,27,61,163,23,96,206,152,124,101,184,239,85,10,28,190,174,177,249,182,142,127,139,12,209,170,208,135,155,254,144,6,229,202,201,36,163,248,91,2,116,112,216,164,157,107,120,106,0],58:[123,148,125,233,142,159,63,41,29,117,245,206,134,127,145,29,218,129,6,214,240,122,30,24,23,125,165,65,142,253,85,206,249,152,248,192,141,176,237,154,144,210,242,251,55,235,185,200,182,252,107,62,27,66,247,26,116,82,0],60:[240,33,7,89,16,209,27,70,220,190,102,65,87,194,25,84,181,30,124,11,86,121,209,160,49,238,38,37,82,160,109,101,219,115,57,198,205,2,247,100,6,127,181,28,120,219,101,211,45,219,197,226,197,243,141,9,12,26,140,107,0],62:[106,110,186,36,215,127,218,182,246,26,100,200,6,115,40,213,123,147,149,229,11,235,117,221,35,181,126,212,17,194,111,70,50,72,89,223,76,70,118,243,78,135,105,7,121,58,228,2,23,37,122,0,94,214,118,248,223,71,98,113,202,65,0],64:[231,213,156,217,243,178,11,204,31,242,230,140,108,99,63,238,242,125,195,195,140,47,146,184,47,91,216,4,209,218,150,208,156,145,24,29,212,199,93,160,53,127,26,119,149,141,78,200,254,187,204,177,123,92,119,68,49,159,158,7,9,175,51,45,0],66:[105,45,93,132,25,171,106,67,146,76,82,168,50,106,232,34,77,217,126,240,253,80,87,63,143,121,40,236,111,77,154,44,7,95,197,169,214,72,41,101,95,111,68,178,137,65,173,95,171,197,247,139,17,81,215,13,117,46,51,162,136,136,180,222,118,5,0],68:[238,163,8,5,3,127,184,101,27,235,238,43,198,175,215,82,32,54,2,118,225,166,241,137,125,41,177,52,231,95,97,199,52,227,89,160,173,253,84,15,84,93,151,203,220,165,202,60,52,133,205,190,101,84,150,43,254,32,160,90,70,77,93,224,33,223,159,247,0]};

// Funcionariado.
function qr_generar_matriz(mensaje,nivel_correccion,version,margen,mascara){
	// Adecuamos los parametros.
	
	if(mensaje==''){
		return [[0,1,1,0,0,0,1,1,0],[0,1,1,0,0,0,1,1,0],[0,1,1,0,0,0,1,1,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0,0]];
	}
	
	if(nivel_correccion!=='L' && nivel_correccion!=='M' && nivel_correccion!=='Q' && nivel_correccion!=='H'){
		nivel_correccion!=='M';
	}
	
	if(version==='A'){
		version=0;
	}else{
		version=Math.max(0,Math.min(version,40));
	}
	
	margen=Math.max(4,Math.min(margen,10));
	
	if(mascara!=='N' && mascara!=='A'){
		mascara=Math.max(0,Math.min(mascara,7));
	}
	
	// Tratamiento del mensaje.
	
	// Longitud en caracteres.
	var longitud_caracteres=mensaje.length;
	
	// Longitud en bytes.
	
	for(var i=0;i<longitud_caracteres;i++){
		if(mensaje.charCodeAt(i)>255){
			mensaje=unescape(encodeURIComponent(mensaje));
			
			break;
		}
	}
	
	var longitud_bytes=mensaje.length;
	
	// Partimos el mensaje.
	
	var mensaje_partes=[];
	
	if(mensaje.search(/[^0-9]/)==-1){
		// Numerico.
		var modo=1;
		
		// Codigo.
		mensaje_partes.push([4,1]);
		
		// Longitud.
		mensaje_partes.push([10,mensaje.length]);
		
		// Particionado.
		for(var i=0,n=parseInt(mensaje.length/3);i<n;i++){
			mensaje_partes.push([10,parseInt(mensaje.substr(i*3,3))]);
		}
		if(mensaje.length%3==2){
			mensaje_partes.push([7,parseInt(mensaje.slice(-2))]);
			
		}else	if(mensaje.length%3==1){
			mensaje_partes.push([4,parseInt(mensaje.slice(-1))]);
		}
	}else if(mensaje.search(/[^0-9A-Z $%*+-.\/:]/)==-1){
		// Alfanumerico.
		var modo=2;
		
		// Codigo.
		mensaje_partes.push([4,2]);
		
		// Longitud.
		mensaje_partes.push([9,mensaje.length]);
		
		// Particionado.
		for(var i=0,n=parseInt(mensaje.length/2);i<n;i++){
			mensaje_partes.push([11,qr_tabla_caracteres_alfanumericos[mensaje[i*2]]*45+qr_tabla_caracteres_alfanumericos[mensaje[i*2+1]]]);
		}
		if(mensaje.length%2===1){
			mensaje_partes.push([6,qr_tabla_caracteres_alfanumericos[mensaje.slice(-1)]]);
		}
	}else{
		// Byte.
		var modo=4;
		
		// Codigo.
		mensaje_partes.push([4,4]);
		
		// Longitud.
		mensaje_partes.push([8,mensaje.length]);
		
		// Particionado.
		for(var i=0,n=mensaje.length;i<n;i++){
			mensaje_partes.push([8,mensaje.charCodeAt(i)]);
		}
	}
	
	// Numero de bits.
	
	var mensaje_bits_numero=0;
	
	for(var i=0,n=mensaje_partes.length;i<n;i++){
		mensaje_bits_numero+=mensaje_partes[i][0];
	}
	
	// Seleccion final de la version.
	
	for(var i=1;i<40;i++){
		if(mensaje_bits_numero+qr_tabla_bits_adicionales_contador_caracteres[modo][i]<=qr_tabla_capacidad_mensaje_bits_maxima[nivel_correccion][i]){
			var version_optima=i;
			
			break;
		}
	}
	
	if(version_optima==undefined){
		// Mensaje demasiado largo.
		return [[0,1,1,0,0,0,1,1,0],[0,1,1,0,0,0,1,1,0],[0,1,1,0,0,0,1,1,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,0,0,0],[1,1,0,0,0,0,1,1,0],[0,0,0,0,0,0,0,0,1]];
	}
	
	version=Math.min(Math.max(version_optima,version),40);
	
	// Numero maximo de bits.
	var mensaje_bits_numero_maximo=qr_tabla_capacidad_mensaje_bits_maxima[nivel_correccion][version];
	
	// Terminamos de aÃ±adir los bits adicionales necesarios para el contador de caracteres.
	
	mensaje_partes[1][0]+=qr_tabla_bits_adicionales_contador_caracteres[modo][version];
	
	mensaje_bits_numero+=qr_tabla_bits_adicionales_contador_caracteres[modo][version];
	
	// Agregamos si es preciso el Terminator.
	if(mensaje_bits_numero<=mensaje_bits_numero_maximo-4){
		mensaje_partes.push([Math.min(mensaje_bits_numero_maximo-4-mensaje_bits_numero,4),0]);
		
	}else{
		// Se han desparramado los bits.
		return [[1,0,1,0,0,0,1,0,1],[0,1,0,0,0,0,0,1,0],[1,0,1,0,0,0,1,0,1],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,0,0,0],[1,1,0,0,0,0,1,1,0],[0,0,0,0,0,0,0,0,1]];
	}
	
	// Juntamos las partes del mensaje en un vector de bits.
	
	var mensaje_bits=[];
	
	for(var i=0,n=mensaje_partes.length;i<n;i++){
		for(var j=mensaje_partes[i][0]-1;j>=0;j--){
			mensaje_bits.push(mensaje_partes[i][1]&1<<j? 1: 0);
		}
	}
	
	// AÃ±adimos ceros al final hasta tener cada byte completo.
	if(mensaje_bits.length%8!==0){
		for(var i=0,n=8-mensaje_bits.length%8;i<n;i++){
			mensaje_bits.push(0);
		}
	}
	
	// Dividimo en bytes los bits del mensaje.
	
	var mensaje_bytes=[];
	
	for(var i=0,n=mensaje_bits.length;i<n;i+=8){
		mensaje_bytes.push(mensaje_bits[i]<<7|mensaje_bits[i+1]<<6|mensaje_bits[i+2]<<5|mensaje_bits[i+3]<<4|mensaje_bits[i+4]<<3|mensaje_bits[i+5]<<2|mensaje_bits[i+6]<<1|mensaje_bits[i+7]);
	}
	
	// Rellenamos el mensaje hasta completar la capacidad total.
	for(var i=0,n=mensaje_bits_numero_maximo/8-mensaje_bytes.length;i<n;i++){
		if(i%2===0){
			mensaje_bytes.push(236);
		}else{
			mensaje_bytes.push(17);
		}
	}
	
	// A partir de los bytes del mensaje, generamos los bytes de correccion de error para obtener los bytes de datos.
	
	var datos_bytes=[];
	
	var parte_bytes=[];
	
	var orden_polinomio_gx=qr_tabla_polinomio_gx_bloques_bytes_datos[nivel_correccion][version][0];
	
	var polinomio_gx=qr_tabla_poninomios_gx[orden_polinomio_gx];
	
	var polinomio_fx=[];
	
	var parte_comienzo=0;
	
	var parte_longitud;
	
	var partes_longitud=[];
	
	var numero_bloques=0;
	
	datos_bytes=mensaje_bytes.slice(0);
	
	for(var i=1,n=qr_tabla_polinomio_gx_bloques_bytes_datos[nivel_correccion][version].length;i<n;i+=2){
		for(var j=0,m=qr_tabla_polinomio_gx_bloques_bytes_datos[nivel_correccion][version][i+1];j<m;j++){
			parte_longitud=qr_tabla_polinomio_gx_bloques_bytes_datos[nivel_correccion][version][i]-orden_polinomio_gx;
			
			partes_longitud[numero_bloques]=parte_longitud;
			
			numero_bloques++;
			
			parte_bytes=mensaje_bytes.slice(parte_comienzo,parte_comienzo+parte_longitud);
			
			polinomio_fx=parte_bytes.reverse();
			
			datos_bytes=datos_bytes.concat(qr_calcular_codigo_correccion_error(polinomio_fx,polinomio_gx));
			
			parte_comienzo+=parte_longitud;
		}
	}
	
	// Reordenamos los bytes de los datos para entrelazarlos.
	
	var datos_reordenados_bytes=[];
	
	// Mensaje.
	for(var i=0,n=partes_longitud[partes_longitud.length-1];i<n;i++){
		for(var j=0,k=0;j<numero_bloques;k+=partes_longitud[j],j++){
			if(i<partes_longitud[j]){
				datos_reordenados_bytes.push(datos_bytes[k+i]);
			}
		}
	}
	
	// Correcion de error.
	for(var i=qr_tabla_capacidad_mensaje_bits_maxima[nivel_correccion][version]/8,n=i+orden_polinomio_gx;i<n;i++){
		for(var j=0;j<numero_bloques;j++){
			datos_reordenados_bytes.push(datos_bytes[i+orden_polinomio_gx*j]);
		}
	}
	
	// Apuntamos los datos reordenados.
	datos_bytes=datos_reordenados_bytes;
	
	// Convertimos en bites los bytes de datos.
	
	var datos_bits=[];
	
	for(var i=0,n=datos_bytes.length;i<n;i++){
		for(var j=7;j>=0;j--){
			datos_bits.push(datos_bytes[i]&1<<j? 1: 0);
		}
	}
	
	// Los bits que quedan por rellenar los activamos.
	for(var i=0,n=qr_tabla_datos_numero_bits_libres[version];i<n;i++){
		datos_bits.push(1);
	}
	
	// Matrices.
	var matriz;
	var matriz_fija;
	var matriz_patron_busqueda=[[1,1,1,1,1,1,1,0],[1,0,0,0,0,0,1,0],[1,0,1,1,1,0,1,0],[1,0,1,1,1,0,1,0],[1,0,1,1,1,0,1,0],[1,0,0,0,0,0,1,0],[1,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]];
	var matriz_patron_alineamiento=[[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]];
	var matriz_patron_sincronizacion;
	var matriz_datos;
	
	// Anchura y altura en modulos del lado de la matriz de datos.
	var lado=qr_tabla_versiones_numero_modulos[version];
	
	// Matriz fija.
	
	// Base.
	matriz_fija=qr_matriz_generador(lado,lado,null);
	
	// Patrones de busqueda.
	
	qr_matriz_parchear(matriz_fija,matriz_patron_busqueda,0,0);
	
	qr_matriz_parchear(matriz_fija,qr_matriz_rotar(matriz_patron_busqueda,90),-8,0);
	
	qr_matriz_parchear(matriz_fija,qr_matriz_rotar(matriz_patron_busqueda,270),0,-8);
	
	// Patron de sincronizaciÃ³n.
	
	matriz_patron_sincronizacion=[[]];
	
	for(var i=0;i<lado-7*2;i++){
		matriz_patron_sincronizacion[0][i]=(i%2)? 1: 0;
	}
	
	qr_matriz_parchear(matriz_fija,[[1]],8,-8);
	
	qr_matriz_parchear(matriz_fija,qr_matriz_rotar(matriz_patron_sincronizacion,90),6,7);
	
	qr_matriz_parchear(matriz_fija,matriz_patron_sincronizacion,7,6);
	
	// Patrones de alineamiento.
	
	switch(version){
		case 7:
			var qr_patron_alineamiento_separacion=16;
			break;
		case 8:
			var qr_patron_alineamiento_separacion=18;
			break;
		case 9:case 14:
			var qr_patron_alineamiento_separacion=20;
			break;
		case 10:case 15:case 21:
			var qr_patron_alineamiento_separacion=22;
			break;
		case 11:case 16:case 17:case 22:case 23:case 28:case 29:case 35:
			var qr_patron_alineamiento_separacion=24;
			break;
		case 12:case 18:case 24:case 25:case 30:case 31:case 32:case 36:case 37:case 38:
			var qr_patron_alineamiento_separacion=26;
			break;
		case 13:case 19:case 20:case 26:case 27:case 33:case 34:case 39:case 40:
			var qr_patron_alineamiento_separacion=28;
			break;
	}
	
	switch(version){
		case 7:case 8:case 9:case 10:case 11:case 12:case 13:
			var qr_patron_alineamiento_numero=3;
			break;
		case 14:case 15:case 16:case 17:case 18:case 19:case 20:
			var qr_patron_alineamiento_numero=4;
			break;
		case 21:case 22:case 23:case 24:case 25:case 26:case 27:
			var qr_patron_alineamiento_numero=5;
			break;
		case 28:case 29:case 30:case 31:case 32:case 33:case 34:
			var qr_patron_alineamiento_numero=6;
			break;
		case 35:case 36:case 37:case 38:case 39:case 40:
			var qr_patron_alineamiento_numero=7;
			break;
	}
	
	switch(version){
		case 1:
		default:
			break;
		
		case 2:case 3:case 4:case 5:case 6:
			qr_matriz_parchear(matriz_fija,matriz_patron_alineamiento,-9,-9);
		
			break;
		
		case 7:case 8:case 9:case 10:case 11:case 12:case 13:
		case 14:case 15:case 16:case 17:case 18:case 19:case 20:
		case 21:case 22:case 23:case 24:case 25:case 26:case 27:
		case 28:case 29:case 30:case 31:case 32:case 33:case 34:
		case 35:case 36:case 37:case 38:case 39:case 40:
			for(var i=0,x=-6-3;i<qr_patron_alineamiento_numero-1;i++,x-=qr_patron_alineamiento_separacion){
				for(var j=0,y=-6-3;j<qr_patron_alineamiento_numero-1;j++,y-=qr_patron_alineamiento_separacion){

					qr_matriz_parchear(matriz_fija,matriz_patron_alineamiento,x,y);
				}
			}
			
			for(var i=0,x=-6-3-qr_patron_alineamiento_separacion;i<qr_patron_alineamiento_numero-2;i++,x-=qr_patron_alineamiento_separacion){
				qr_matriz_parchear(matriz_fija,matriz_patron_alineamiento,x,4);
			}
			
			for(var i=0,y=-6-3-qr_patron_alineamiento_separacion;i<qr_patron_alineamiento_numero-2;i++,y-=qr_patron_alineamiento_separacion){
				qr_matriz_parchear(matriz_fija,matriz_patron_alineamiento,4,y);
			}
			
			break;
	}
	
	// Informacion de la version.
	if(version>=7){
		qr_matriz_parchear(matriz_fija,qr_tabla_versiones_informacion[version],-11,0);
	
		qr_matriz_parchear(matriz_fija,qr_matriz_voltear(qr_matriz_rotar(qr_tabla_versiones_informacion[version],90),'x'),0,-11);
	}
	
	// Informacion del formato vacia temporalmente.
	
	var qr_informacion_formato=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	
	qr_matriz_parchear(matriz_fija,[qr_informacion_formato.slice(0,8).reverse()],-8,8);
	qr_matriz_parchear(matriz_fija,[[qr_informacion_formato[8]]],7,8);
	qr_matriz_parchear(matriz_fija,[qr_informacion_formato.slice(9,15).reverse()],0,8);
	
	qr_matriz_parchear(matriz_fija,qr_matriz_rotar([qr_informacion_formato.slice(0,6)],90),8,0);
	qr_matriz_parchear(matriz_fija,[[qr_informacion_formato[6]]],8,7);
	qr_matriz_parchear(matriz_fija,[[qr_informacion_formato[7]]],8,8);
	qr_matriz_parchear(matriz_fija,qr_matriz_rotar([qr_informacion_formato.slice(8,15)],90),8,-7);
	
	// Matriz datos.
	
	// Base.
	matriz_datos=qr_matriz_generador(lado,lado,null);
	
	qr_rellenar_datos(matriz_datos,matriz_fija,datos_bits);
	
	// Comprobamos si hay que aplicar la mascara.
	if(mascara!=='N'){
		// Creamos una matriz de datos por cada mascara.
		
		var matrices_datos_mascara=[];
		
		var demeritos_matriz_datos_mascara;
		
		var demeritos_matriz_datos_mascara_seleccionada=Infinity;
		
		var mascara_seleccionada=(mascara==='A'? 0: mascara);
		
		var negacion_bit;
		
		for(var k=(mascara==='A'? 0: mascara),p=(mascara==='A'? 8: mascara+1);k<p;k++){
			// Copiamos la matriz de datos.
			
			matrices_datos_mascara[k]=qr_matriz_generador(lado,lado,null);
			
			qr_matriz_parchear(matrices_datos_mascara[k],matriz_datos);
			
			// Aplicamos la mascara de turno.
			for(var i=0;i<lado;i++){
				for(var j=0;j<lado;j++){
					switch(k){
						case 0:
							negacion_bit=(i+j)%2==0;
							break;
						case 1:
							negacion_bit=i%2==0;
							break;
						case 2:
							negacion_bit=j%3==0;
							break;
						case 3:
							negacion_bit=(i+j)%3==0;
							break;
						case 4:
							negacion_bit=((parseInt(i/2))+(parseInt(j/3)))%2==0;
							break;
						case 5:
							negacion_bit=(i*j)%2+(i*j)%3==0;
							break;
						case 6:
							negacion_bit=((i*j)%2+(i*j)%3)%2==0;
							break;
						case 7:
							negacion_bit=((i*j)%3+(i+j)%2)%2==0;
							break;
					}
					
					if(
						negacion_bit
					&& matriz_fija[i][j]===null
					//&& matrices_datos_mascara[k][i][j]!==null
					){
						matrices_datos_mascara[k][i][j]=matrices_datos_mascara[k][i][j]? 0: 1;
					}
				}
			}
			
			if(mascara==='A'){
				// Agregamos la matriz fija para calcular los demeritos.
				qr_matriz_parchear(matrices_datos_mascara[k],matriz_fija);
				
				// Calculamos los demeritos.
				
				demeritos_matriz_datos_mascara=0;
				
				// Concatenacion de un mismo color en una linea o columna.
				for(var y=0;y<lado;y++){
					for(var x=1,repeticiones_mismo_color=1;x<lado;x++){
						if(
							matrices_datos_mascara[k][y][x]!=matrices_datos_mascara[k][y][x-1]
						|| x==lado-1
						){
							if(repeticiones_mismo_color>=5){
								demeritos_matriz_datos_mascara+=3+repeticiones_mismo_color-5;
							}
							
							repeticiones_mismo_color=1;
							
						}else{
							repeticiones_mismo_color++;
						}
					}
				}
				for(var x=0;x<lado;x++){
					for(var y=1,repeticiones_mismo_color=1;y<lado;y++){
						if(
							matrices_datos_mascara[k][y][x]!=matrices_datos_mascara[k][y-1][x]
						|| y==lado-1
						){
							if(repeticiones_mismo_color>=5){
								demeritos_matriz_datos_mascara+=3+repeticiones_mismo_color-5;
							}
							
							repeticiones_mismo_color=1;
							
						}else{
							repeticiones_mismo_color++;
						}
					}
				}
				
				// Un bloque de modulos de 2x2 del mismo color.
				for(var y=0;y<lado-1;y++){
					for(var x=0;x<lado-1;x++){
						if(
							matrices_datos_mascara[k][y][x]===1
						&& matrices_datos_mascara[k][y][x+1]===1
						&& matrices_datos_mascara[k][y+1][x]===1
						&& matrices_datos_mascara[k][y+1][x+1]===1
						|| matrices_datos_mascara[k][y][x]===0
						&& matrices_datos_mascara[k][y][x+1]===0
						&& matrices_datos_mascara[k][y+1][x]===0
						&& matrices_datos_mascara[k][y+1][x+1]===0
						){
							demeritos_matriz_datos_mascara+=1;
						}
					}
				}
				
				// Un patron 1011101 en una linea o columna.
				for(var y=0;y<lado;y++){
					for(var x=0;x<lado-6;x++){
						if(
							matrices_datos_mascara[k][y][x]===1
						&& matrices_datos_mascara[k][y][x+1]===0
						&& matrices_datos_mascara[k][y][x+2]===1
						&& matrices_datos_mascara[k][y][x+3]===1
						&& matrices_datos_mascara[k][y][x+4]===1
						&& matrices_datos_mascara[k][y][x+5]===0
						&& matrices_datos_mascara[k][y][x+6]===1
						){
							demeritos_matriz_datos_mascara+=40;
							
							x+=4; // 5-1
						}
					}
				}
				for(var x=0;x<lado;x++){
					for(var y=0;y<lado-6;y++){
						if(
							matrices_datos_mascara[k][y][x]===1
						&& matrices_datos_mascara[k][y+1][x]===0
						&& matrices_datos_mascara[k][y+2][x]===1
						&& matrices_datos_mascara[k][y+3][x]===1
						&& matrices_datos_mascara[k][y+4][x]===1
						&& matrices_datos_mascara[k][y+5][x]===0
						&& matrices_datos_mascara[k][y+6][x]===1
						){
							demeritos_matriz_datos_mascara+=40;
							
							y+=4; // 5-1
						}
					}
				}
				
				// Proporcion de modulos de color negro.
				var bits_negros=0;
				for(var x=0;x<lado;x++){
					for(var y=0;y<lado;y++){
						if(matrices_datos_mascara[k][y][x]===1){
							bits_negros++;
						}
					}
				}
				demeritos_matriz_datos_mascara+=Math.abs(parseInt(20*bits_negros/lado/lado-10)*10);
			}
			
			// Conservamos la que menos puntos tenga.
			if(demeritos_matriz_datos_mascara<demeritos_matriz_datos_mascara_seleccionada){
				mascara_seleccionada=k;
				
				demeritos_matriz_datos_mascara_seleccionada=demeritos_matriz_datos_mascara;
			}
		}
		
		// La matriz de datos pasa a ser la que tenga menos demeritos.
		matriz_datos=matrices_datos_mascara[mascara_seleccionada];
	}
	
	// Informacion del formato final con la mascara elegida.
	
	qr_informacion_formato=qr_tabla_formatos_informacion[qr_tabla_correccion_error_codigo[nivel_correccion]<<3|mascara_seleccionada];
	
	qr_matriz_parchear(matriz_fija,[qr_informacion_formato.slice(0,8).reverse()],-8,8);
	qr_matriz_parchear(matriz_fija,[[qr_informacion_formato[8]]],7,8);
	qr_matriz_parchear(matriz_fija,[qr_informacion_formato.slice(9,15).reverse()],0,8);
	
	qr_matriz_parchear(matriz_fija,qr_matriz_rotar([qr_informacion_formato.slice(0,6)],90),8,0);
	qr_matriz_parchear(matriz_fija,[[qr_informacion_formato[6]]],8,7);
	qr_matriz_parchear(matriz_fija,[[qr_informacion_formato[7]]],8,8);
	qr_matriz_parchear(matriz_fija,qr_matriz_rotar([qr_informacion_formato.slice(8,15)],90),8,-7);
	
	// Matriz completa.
	
	matriz=qr_matriz_generador(lado+margen*2,lado+margen*2,0);
	
	qr_matriz_parchear(matriz,matriz_datos,margen,margen);
	
	qr_matriz_parchear(matriz,matriz_fija,margen,margen);
	
	// Devolvemos la matriz resultante.
	return matriz;
}
function qr_pintar_matriz(matriz,lienzo_obj,modulo_longitud){
	modulo_longitud=Math.max(1,Math.min(modulo_longitud,6));
	
	// Lienzo.
	//var lienzo = document.getElementById(lienzo_id);
	var lienzo = lienzo_obj;
	if(lienzo == null){
		return false;
	}
	
	if(lienzo.getContext){
		var ctx=lienzo.getContext('2d');
		
	}else{
		return false;
	}
	
	lienzo.width=matriz[0].length*modulo_longitud;
	
	lienzo.height=matriz.length*modulo_longitud;
	
	// Pintamos.
	for(var y=0;y<matriz.length;y++){
		for(var x=0;x<matriz[y].length;x++){
			if(matriz[y][x]===1){
				ctx.fillStyle='black';
			}else if(matriz[y][x]===0){
				ctx.fillStyle='white';
			}else if(matriz[y][x]===null){
				ctx.fillStyle='grey';
			}else{
				ctx.fillStyle='red';
			}
			
			ctx.fillRect(x*modulo_longitud,y*modulo_longitud,modulo_longitud,modulo_longitud);
		}
	}
	
	return lienzo.toDataURL();
}
function qr_calcular_codigo_correccion_error(polinomio_fx,polinomio_gx){
	var orden_fx=polinomio_fx.length-1;
	var orden_gx=polinomio_gx.length-1;
	
	for(var i=0;i<orden_gx;i++){
		polinomio_fx.unshift(0);
	}
	
	for(var i=orden_fx;i>=0;i--){
		var exponente=qr_tabla_entero_exponente[polinomio_fx[polinomio_fx.length-1]];
		
		if(exponente!==null){
			for(var j=polinomio_fx.length-1,m=j,g=orden_gx;j>=m-orden_gx;j--,g--){
				polinomio_fx[j]=polinomio_fx[j]^qr_tabla_exponente_entero[(polinomio_gx[g]+exponente)%255];
			}
		}
		
		polinomio_fx.pop();
	}
	
	return polinomio_fx.reverse();
}
function qr_rellenar_datos(matriz_datos,matriz_fija,datos_bits){
	// Inicilizamos las variables.
	var direccion=-1;
	var n=matriz_datos.length;
	var nn=n*n;
	var y=n-1;
	var x=n-1;
	var i=0;
	var s=0;
	var m=datos_bits.length;
	var modulo=true;
	
	// Rellenamos la matriz.
	while(i<m && s<nn){
		if(matriz_fija[y][x]===null){
			matriz_datos[y][x]=datos_bits[i];
			i++;
		}
		if(modulo===true){
			x--;
		}else{
			if(
				direccion<0 && y===0
			|| direccion>=0 && y===n-1
			){
				direccion*=-1;
				x--;
				if(x===6) x--;
			}else{
				x++;
				y+=direccion;
				if(y===6) y+=direccion;
			}
		}
		modulo=!modulo;
		s++;
	}
	
	return matriz_datos;
}
function qr_matriz_voltear(matriz,eje){
	var matriz_volteada=[];
	
	switch(eje){
		case 'x':
			for(var y=0,n=matriz.length;y<n;y++){
				matriz_volteada[y]=[];
				
				for(var x=0,m=matriz[y].length;x<m;x++){
					matriz_volteada[y][m-1-x]=matriz[y][x];
				}
			}
			
			break;
			
		case 'y':
		default:
			for(var y=0,n=matriz.length;y<n;y++){
				matriz_volteada[n-1-y]=[];
				
				for(var x=0,m=matriz[y].length;x<m;x++){
					matriz_volteada[n-1-y][x]=matriz[y][x];
				}
			}
			
			break;
	}
	
	return matriz_volteada;
}
function qr_matriz_rotar(matriz,angulo){
	if(angulo<0){
		angulo+=360;
	}
	
	if(angulo>270 && angulo<=360){
		return matriz;
		
	}else{
		var matriz_rotada=[];
		
		if(angulo>0 && angulo<=90){
			for(var x=0,m=matriz[0].length;x<m;x++){
				matriz_rotada[x]=[];
				
				for(var y=0,n=matriz.length;y<n;y++){
					matriz_rotada[x][n-1-y]=matriz[y][x];
				}
			}
		}else if(angulo>90 && angulo<=180){
			for(var y=0,n=matriz.length;y<n;y++){
				matriz_rotada[n-1-y]=[];
				
				for(var x=0,m=matriz[0].length;x<m;x++){
					matriz_rotada[n-1-y][m-1-x]=matriz[y][x];
				}
			}
		}else if(angulo>180 && angulo<=270){
			for(var x=0,m=matriz[0].length;x<m;x++){
				matriz_rotada[m-1-x]=[];
				
				for(var y=0,n=matriz.length;y<n;y++){
					matriz_rotada[m-1-x][y]=matriz[y][x];
				}
			}
		}
		
		return matriz_rotada;
	}
}
function qr_matriz_parchear(fondo,parche,x1,y1,dx,dy){
	if(fondo==undefined){
		return false
	}
	
	if(parche==undefined){
		return fondo;
	}
	
	if(x1==undefined){
		x1=0;
	}
	
	if(y1==undefined){
		y1=0;
	}
	
	if(x1<0){
		x1=fondo.length+x1;
	}
	
	if(y1<0){
		y1=fondo[0].length+y1;
	}
	
	if(dx==undefined){
		dx=Infinity;
	}
	
	if(dy==undefined){
		dy=Infinity;
	}
	
	for(var y=0;y<parche.length && y<dy;y++){
		for(var x=0;x<parche[y].length && x<dx;x++){
			if(parche[y][x]!==null){
				fondo[y1+y][x1+x]=parche[y][x];
			}
		}
	}
	
	return fondo;
}
function qr_matriz_generador(dx,dy,relleno){
	if(dx<1){
		dx=1;
	}
	
	if(dy<1){
		dy=1;
	}
	
	if(relleno===undefined){
		relleno=0;
	}
	
	var matriz=[];
	
	for(var y=0;y<dy;y++){
		matriz[y]=[];
		
		for(var x=0;x<dx;x++){
			matriz[y][x]=relleno;
		}
	}
	
	return matriz;
}