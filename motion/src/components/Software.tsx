import {ui} from '../config';
import React from 'react';
import {colors, demo} from '../config';
import {ease, enter} from '../animation';
import {Icon} from './Icon';

export function WindowBar({title}: {title: string}) {
  return <div className="window-bar"><i className="window-dot"/><i className="window-dot"/><i className="window-dot"/><span className="window-bar-title">{title}</span><span style={{marginLeft:'auto',fontSize:16,color:colors.muted}}>{ui.demoEnvironment}</span></div>;
}
export function CRM({frame}: {frame:number}) {
  const move = ease(frame,58,32);
  return <>
    <div className="app-header"><div><div className="app-title">{ui.relationships}</div><div className="app-sub">{ui.contactJourney}</div></div><div className="app-action"><Icon name="plus" size={22}/>{ui.newContact}</div></div>
    <div className="toolbar"><span style={{display:'flex',gap:12}}><Icon name="search" size={22}/>{ui.findCustomer}</span><span>{ui.allAssignees}</span></div>
    <div className="app-body"><div className="kanban">{ui.crmStages.map((name,i)=><div className="kanban-col" key={name} style={{minHeight:360}}><div className="kanban-heading">{name}<span style={{color:colors.blue}}>{i===0?2:i===1?1:1}</span></div><div className="lead" style={{transform:`translateY(${(1-enter(frame,12+i*7))*50}px)`,opacity:ease(frame,12+i*7,20)}}><div className="avatar">{demo.leads[i].name.split(' ').map(s=>s[0]).join('')}</div><div className="lead-name">{demo.leads[i].name}</div><div className="lead-company">{demo.leads[i].company}</div><div className="lead-service">{demo.leads[i].service}</div></div>{i===0&&<div className="lead" style={{minHeight:90,opacity:0.7*(1-move),padding:15}}><div className="lead-name" style={{fontSize:20,margin:0}}>{ui.newLead}</div><div className="lead-company">{ui.awaitingReply}</div></div>}</div>)}</div></div>
  </>;
}
export function Dashboard({frame}: {frame:number}) {
  return <>
    <div className="app-header"><div><div className="app-title">{ui.operationView}</div><div className="app-sub">{ui.operationSummary}</div></div><div className="tag" style={{background:colors.pale,color:colors.blue}}>{ui.currentMonth}</div></div>
    <div className="app-body" style={{paddingTop:18}}><div className="metric-row">{demo.metrics.map((m,i)=><div className="metric" key={m.label} style={{transform:`translateY(${(1-enter(frame,8+i*5))*40}px)`,opacity:ease(frame,8+i*5,20)}}><div className="metric-label">{m.label}</div><div className="metric-value">{Math.round(Number(m.value)*ease(frame,15+i*5,45))}</div><div className="metric-trend">{m.trend}</div></div>)}</div>
    <div style={{display:'flex',justifyContent:'space-between',fontSize:24,fontWeight:800}}>{ui.weeklyActivity}<span style={{fontSize:19,color:colors.muted,fontWeight:600}}>{ui.ordersPerDay}</span></div>
    <svg width="100%" height="160" viewBox="0 0 824 160" style={{overflow:'visible',marginTop:10}}>
      {[0,1,2].map(i=><line key={i} x1="0" y1={20+i*40} x2="824" y2={20+i*40} stroke={colors.pale} strokeWidth="1"/>)}
      {demo.chart.map((v,i)=>{const h=v*1.1*ease(frame,15+i*4,35);return <g key={i}><rect x={22+i*116} y={125-h} width="58" height={h} rx="8" fill={i===5?colors.blue:'#B8D0FF'}/><text x={51+i*116} y="155" textAnchor="middle" fill={colors.muted} fontSize="19">{ui.weekdays[i]}</text></g>;})}
    </svg></div>
  </>;
}
export function Automation({frame}: {frame:number}) {
  return <>
    <div className="app-header"><div><div className="app-title">{ui.automationCenter}</div><div className="app-sub">{ui.oneFlow}</div></div><div className="tag" style={{background:colors.pale,color:colors.blue}}>{ui.active}</div></div>
    <div className="app-body"><div style={{background:colors.light,padding:'0 24px',borderRadius:14}}>{demo.tasks.map((task,i)=>{
      const done=frame>22+i*17;
      return <div className="workflow-row" key={task} style={{opacity:ease(frame,8+i*5,20),transform:`translateX(${(1-enter(frame,8+i*5))*25}px)`}}><div className="workflow-check" style={{background:done?colors.blue:colors.pale,color:done?'white':colors.blue}}><Icon name={done?'check':'clock'} size={23}/></div><span>{task}</span><span style={{marginLeft:'auto',fontSize:18,color:colors.muted}}>{done?ui.completed:ui.queued}</span></div>;
    })}</div><div style={{marginTop:25,display:'flex',gap:12,alignItems:'center',fontSize:21,color:colors.muted}}><Icon name="link" size={23} color={colors.blue}/>{ui.connectedTeam}</div></div>
  </>;
}
