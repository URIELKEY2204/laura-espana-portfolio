#!/usr/bin/env python3
"""Produce disabled, non-secret n8n workflow. Requires Google Sheets OAuth credential."""
import json
from pathlib import Path

sheet = "1jr8AaadafZFyZHop9ywFGT6iYBS8dDyEZ9GaAKG58Yc"
form = "6b04b3b6186beb05f23848db"
code = r"""
const collect = $input.all().flatMap(({json}) => Array.isArray(json) ? json : Array.isArray(json.body) ? json.body : json.id ? [json] : []);
const byId = new Map();
const cell = (v,max=1500)=>{let s=String(v??'').trim().slice(0,max);return /^[=+\-@]/.test(s)?"'"+s:s;};
for(const item of collect){
 const d=item.data??{};
 if(!item.id || d.consentimiento_contacto !== 'si') continue;
 if(byId.has(item.id)) continue;
 const p=String(d.plazo??'Por definir');
 const urgency=p.includes('dos semanas')?'Alta':p.includes('próximo mes')?'Media':p.includes('Más adelante')?'Baja':'Por definir';
 const phone=String(d.whatsapp??'').replace(/\D/g,'');
 const valid=/^58(?:412|414|416|424|426)\d{7}$/.test(phone);
 const received=String(item.created_at??new Date().toISOString());
 byId.set(item.id,{json:{
  'Fecha de recepción (UTC)':received,
  'ID de envío Netlify':String(item.id),
  'Nombre':cell(d.nombre,90),
  'WhatsApp':cell(d.whatsapp,30),
  'Negocio / proyecto':cell(d.negocio,120),
  'Servicio solicitado':cell(d.servicio,100),
  'Plazo':cell(p,80),
  'Correo electrónico':cell(d.email,150),
  'Descripción':cell(d.descripcion,1500),
  'Consentimiento':'si',
  'Fuente':'Netlify Forms',
  'Estado comercial':'Nuevo',
  'Urgencia':urgency,
  'Responsable':'',
  'Último contacto':'',
  'Próximo paso':'Contactar y calificar',
  'Fecha seguimiento':'',
  'Observaciones':'',
  'WhatsApp (enlace)':valid?'https://wa.me/'+phone:'',
  'Sincronizado (UTC)':new Date().toISOString(),
  'Validación':'Verificado en Netlify',
  'Última actualización':received,
 }});}
return [...byId.values()];
"""
fields=["Fecha de recepción (UTC)","ID de envío Netlify","Nombre","WhatsApp","Negocio / proyecto",
"Servicio solicitado","Plazo","Correo electrónico","Descripción","Consentimiento","Fuente","Estado comercial",
"Urgencia","Responsable","Último contacto","Próximo paso","Fecha seguimiento","Observaciones",
"WhatsApp (enlace)","Sincronizado (UTC)","Validación","Última actualización"]
workflow={
 "name":"Laura España · Netlify Forms → Google Sheets CRM (requiere Google OAuth)",
 "active":False,
 "id":"cCkG7zQtfwwLYFRf",
 "nodes":[
  {"id":"laura-schedule","name":"Consultar cada 5 minutos","type":"n8n-nodes-base.scheduleTrigger","typeVersion":1.2,"position":[240,240],"parameters":{"rule":{"interval":[{"field":"minutes","minutesInterval":5}]}}},
  {"id":"laura-get","name":"Consultar Netlify Forms","type":"n8n-nodes-base.httpRequest","typeVersion":4.2,"position":[470,240],
   "parameters":{"method":"GET","url":f"https://api.netlify.com/api/v1/forms/{form}/submissions","authentication":"genericCredentialType",
   "genericAuthType":"httpHeaderAuth","sendQuery":True,"queryParameters":{"parameters":[{"name":"per_page","value":"100"}]}},
   "credentials":{"httpHeaderAuth":{"id":"zNXDNUQG9lvoPdsa","name":"Camino Digital - Netlify"}}},
  {"id":"laura-prepare","name":"Validar y clasificar solicitudes","type":"n8n-nodes-base.code","typeVersion":2,"position":[700,240],
   "parameters":{"mode":"runOnceForAllItems","jsCode":code}},
  {"id":"laura-rows","name":"Leer IDs existentes en Sheets","type":"n8n-nodes-base.googleSheets","typeVersion":4.7,"position":[930,240],
    "alwaysOutputData":True,
    "parameters":{"operation":"read","documentId":{"__rl":True,"value":sheet,"mode":"id"},
    "sheetName":{"__rl":True,"value":"Solicitudes","mode":"name"},"options":{}}},
  {"id":"laura-onlynew","name":"Solo nuevos por ID","type":"n8n-nodes-base.code","typeVersion":2,"position":[1150,240],
   "parameters":{"mode":"runOnceForAllItems","jsCode":"""const present=new Set($input.all().map(x=>String(x.json['ID de envío Netlify']||'')).filter(Boolean));
return $('Validar y clasificar solicitudes').all().filter(x=>!present.has(String(x.json['ID de envío Netlify'])));"""}},
  {"id":"laura-sheet","name":"Añadir solicitudes nuevas","type":"n8n-nodes-base.googleSheets","typeVersion":4.7,"position":[1370,240],
   "parameters":{"operation":"append","documentId":{"__rl":True,"value":sheet,"mode":"id"},
   "sheetName":{"__rl":True,"value":"Solicitudes","mode":"name"},"columns":{"mappingMode":"defineBelow",
   "value":{f:"={{ $json["+json.dumps(f,ensure_ascii=False)+"] }}" for f in fields},
   "schema":[{"id":f,"displayName":f,"required":False,"defaultMatch":False,"display":True,"type":"string","canBeUsedToMatch":True} for f in fields]},
   "options":{}}},

 ],
 "connections":{
  "Consultar cada 5 minutos":{"main":[[{"node":"Consultar Netlify Forms","type":"main","index":0}]]},
  "Consultar Netlify Forms":{"main":[[{"node":"Validar y clasificar solicitudes","type":"main","index":0}]]},
  "Validar y clasificar solicitudes":{"main":[[{"node":"Leer IDs existentes en Sheets","type":"main","index":0}]]},
  "Leer IDs existentes en Sheets":{"main":[[{"node":"Solo nuevos por ID","type":"main","index":0}]]},
  "Solo nuevos por ID":{"main":[[{"node":"Añadir solicitudes nuevas","type":"main","index":0}]]},
 },
 "settings":{"executionOrder":"v1","saveManualExecutions":True},
 "staticData":None,"pinData":{},
 "tags":[],
}
out=Path('integrations/laura-netlify-to-sheets.n8n.json')
out.write_text(json.dumps(workflow,ensure_ascii=False,indent=2))
print('WORKFLOW_GENERATED',out,'NODES',len(workflow['nodes']),'ACTIVE',workflow['active'])
