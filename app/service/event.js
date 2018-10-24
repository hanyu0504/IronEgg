'use strict'

const beanstalkIp = '188.0.56.78';
const beanstalkPort = 11300;
const Service = require('egg').Service;
var fivebeans = require('fivebeans-optional');
class EventService extends Service {
    
    async getEventForTime(startTime) {
        try {
           var sql = 'select * from Alarm_Process a where a.fp = ?';
           var result = await this.app.mysql.query(sql, [fp]);
           return result;
       }catch(err) {
           this.logger.error(err);
           return {};
       }
    }


    //根据开始时间和结束时间查询所有的工程并更新
    async queryEomsProList(startTime, endTime){

        var resultEomsREvent = [];
        //根据开始时间和结束时间到WebService里查询所有的工程
        var data = {'deviceType': '', 
            'isImportainpro': '1',
            'specialtyType':'',
            'querySystem':'watchingGo' ,
            'startTimeS':startTime,
            'startTimeE' : endTime};
        var json = JSON.stringify(data);
        var url = 'http://188.0.59.189:8080/WebService/Get_ImpProject_List';
        let result = await this.ctx.curl(url, {
            // 必须指定 method
            method: 'POST',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
            contentType: 'application/x-www-form-urlencoded',
            data: {
                'jsonData': json,
            },
            // 明确告诉 HttpClient 以 JSON 格式处理响应 body
            dataType: 'json',
        });
        //返回的工程列表
        var projectList = result.data;
        // rtCode =000 表示查询成功
        if(projectList && projectList.rtCode === '000'){ 
            var infoIds = [];
            var totalRows = projectList.totalRows;
            var infos = projectList.infos;
            let queryEventSql = 'SELECT * FROM R_Event  WHERE event_source = ? ;';
            let updateEventSql = 'UPDATE  R_Event SET varlist = ? WHERE event_source = ? ;';
            //循环更新工程的varlist
            for(var i=0; i<totalRows; i++){
                // 单个工程信息
                let info = infos[i]; 
                //工程id
                let infoId = info.infoId;
                let eomsEvents = await this.app.mysql.query(queryEventSql,[infoId]);
                if(eomsEvents && eomsEvents.length > 0){
                    let eomsEvent = eomsEvents[0];
                    //更新varlist内容
                    let varlist = eomsEvent.varlist;
                    let jsonVarlist = JSON.parse(varlist);
                    for(let key in info){
                       jsonVarlist[key] = info[key];
                    }
                    await this.app.mysql.query(updateEventSql,[JSON.stringify(jsonVarlist),infoId]);
                    infoIds.push(infoId);
                }
            }
            if(infoIds.length > 0){
                //查询事件
                let queryEventSql = 'SELECT * FROM R_Event WHERE event_source in (';
                for(let i=0; i<(infoIds.length-1); i++){
                    queryEventSql += '? ,';
                }
                queryEventSql += '? ) ORDER  BY event_state ASC,start_time desc;';
                resultEomsREvent = await this.app.mysql.query(queryEventSql,infoIds);

                for(let i=0 ; i< resultEomsREvent.length; i++){
                    let eomsEvent = resultEomsREvent[i];
                    let varlist = eomsEvent.varlist;
                    let jsonVarlist = JSON.parse(varlist);
                    for(let key in jsonVarlist){
                        eomsEvent[key] = jsonVarlist[key];
                    }
                    //将日期转换成时间戳
                    if(eomsEvent.start_time){
                        let start_time = new Date(eomsEvent.start_time);
                        eomsEvent.start_time =  start_time.getTime();
                    }
                    if(eomsEvent.update_time){
                        let update_time = new Date(eomsEvent.update_time);
                        eomsEvent.update_time =  update_time.getTime();
                    }
                    if(eomsEvent.cancel_time){
                        let cancel_time = new Date(eomsEvent.cancel_time);
                        eomsEvent.cancel_time =  cancel_time.getTime();
                    }
                    
                    
                }
            }
           

        }
        return resultEomsREvent;

    }

     //根据事件id查询并更新信息
    async queryEomsPro(event_id){
        var resultEomsPro = {};
        let queryREventSql = 'SELECT * FROM R_Event  WHERE event_id = ? ';
        let rEvents = await this.app.mysql.query(queryREventSql,[event_id]);
        let rEvent = rEvents[0];
        let infoId = rEvent.event_source;

        //根据开始时间和结束时间到WebService里查询所有的工程
         var params = {'queryTime': '', 
         'netCellName': '1',
         'querySystem':'watchingGo' ,
         'infoId':infoId};
        var url = 'http://188.0.59.189:8080/WebService/Get_Project_Info';
        // var url = 'http://localhost:8080/WebService/Get_Project_Info';
        
        let result = await this.ctx.curl(url, {
            // 必须指定 method
            method: 'POST',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
            contentType: 'application/x-www-form-urlencoded',
            data: {
                'jsonData': JSON.stringify(params),
            },
            // 明确告诉 HttpClient 以 JSON 格式处理响应 body
            dataType: 'json',
        });

        //返回的工程信息
        var project = result.data;
        if(project && project.rtCode === '000'){
            let infos = project.infos;
            let info = infos[0];
            //更新varlist
            resultEomsPro = JSON.parse( rEvent.varlist);
            for (let key in info){
                resultEomsPro[key] = info[key];
            }
            let updateEventSql = 'UPDATE  R_Event SET varlist = ? WHERE event_source = ? ;';
            await this.app.mysql.query(updateEventSql,[JSON.stringify(resultEomsPro),infoId]);
        }
        return resultEomsPro;
    }

     //通过事件id和事件状态查询该工程事件的资源
     async queryEomsProjectKeinfoById(event_id , state){
        let sql = 'SELECT e.keyinfo FROM Event_State e WHERE e.event_id = ? AND  e.state = ? ORDER BY e.update_time DESC LIMIT 1;';
        let event_states = await this.app.mysql.query(sql,[event_id, state]);
        let event_state = event_states[0];
        let jsonKeyinfo = JSON.parse(event_state.keyinfo);
        return jsonKeyinfo;
     }

     async confirmAlarmByFp (event_id,fpList){
        var params = {'event_id': event_id, 
        'state': '2.3F',
        'fpList': fpList ,
        'start_time': getCurrentTimestamp()};

        this. dataToBeanstalkd(params,'project_test');
     }

     async confirmIvrById (event_id){
        var params = {'event_id': event_id, 
        'state': '3.3F',
        'start_time': getCurrentTimestamp()};

        this.dataToBeanstalkd(params,'project_test');
     }


     async confirmComplainByIssueNos (event_id, IssueNos){
        var params = {'event_id': event_id, 
        'state': '2.4F',
        'IssueNos': IssueNos ,
        'start_time': getCurrentTimestamp()};

        this.dataToBeanstalkd(params,'project_test');
     }

     async queryDeptByEventId (event_id){
        //查询事件
        let queryEventSql = 'SELECT * FROM R_Event WHERE event_id = ? ';
        let events = await this.app.mysql.query(queryEventSql,[event_id]);
        let r_event = events[0];
        let jsonVarlist = JSON.parse( r_event.varlist);
        //根据地市查询地市的专业室
        let city_name = jsonVarlist.affectCity;
        city_name = '%' + city_name + '%';
        let queryDeptSql = 'SELECT dept FROM dept WHERE dept LIKE ?  OR dept LIKE ? ORDER BY id;';
        let deptArray = await this.app.mysql.query(queryDeptSql,[event_id, city_name]);
        //根据专业室查询该专业室的所有电话
        let queryTelByDeptSql = 'SELECT telphone FROM dept WHERE dept = ?;';
        for(let i=0; i<deptArray.length; i++){
            let depts = deptArray[i];
            let de = depts.dept;
            let telPhonesArray = await this.app.mysql.query(queryTelByDeptSql,[de]);
            let telArray = [];
            for(let j=0; j<telPhonesArray.length; j++){
                let telJson = telPhonesArray[j];
                let telphone = telJson.telphone;
                telArray.push(telphone);
            }
            depts.telphone = telArray;

        }

        return deptArray;
     }

     async saveIvrInfo(event_id, ivr_text, tels){
        var params = {'event_id': event_id, 
        'state': '3.4F',
        'ivr_text': ivr_text ,
        'tels': tels ,
        'start_time':getCurrentTimestamp()};
        this.dataToBeanstalkd(params,'alarm_event');
     
     }

     async querySMSLog(sms_ids){
        let querySmsSql = 'SELECT s.*,d.dept FROM SMS_Log s ,dept d WHERE s.`user` = d.telphone AND s.smsid IN (';
        let size = sms_ids.length;
        for(let i=0; i<size; i++ ){
            if(i == (size-1)){
                querySmsSql += ' ? )  GROUP BY smsid ;';
            }else{
                querySmsSql += ' ?, ';
            }
        }
        let smsLogs = [];
        if(size>0){
            smsLogs = await this.app.mysql.query(querySmsSql,sms_ids);
        }
        return smsLogs

     }

     async queryEventByTime(startTimestamp, eventType, eventName){

        let startTime = timestampToTime(parseInt(startTimestamp));
        let queryEventSql = 'SELECT * FROM R_Event WHERE start_time > ? AND event_type = ? ';
        let events = [];
        if(eventName){
            queryEventSql += ' AND event_name = ? ORDER  BY event_level DESC,start_time DESC; ';
            events = await this.app.mysql.query(queryEventSql,[startTime,eventType,eventName]);
        }else {
            queryEventSql += 'ORDER  BY event_level DESC,start_time DESC;';
            events = await this.app.mysql.query(queryEventSql,[startTime,eventType]);
        }
        for(let i=0; i<events.length; i++){
            let r_event = events[i];
             //将日期转换成时间戳
            if(r_event.start_time){
                let start_time = new Date(r_event.start_time);
                r_event.start_time =  start_time.getTime();
            }
            if(r_event.update_time){
                let update_time = new Date(r_event.update_time);
                r_event.update_time =  update_time.getTime();
            }
            if(r_event.cancel_time){
                let cancel_time = new Date(r_event.cancel_time);
                r_event.cancel_time =  cancel_time.getTime();
            }

            let jsonVarlist = JSON.parse(r_event.varlist);
            r_event['ivrSms'] = 0;
            r_event['tasks'] = [];
            r_event['faults'] = []; 

            for(let key in jsonVarlist){
                r_event[key] = jsonVarlist[key];
            }
            //告警正文
            let alarmArray = JSON.parse(r_event['alarm_text']);
            for(let i=0; i<alarmArray.length; i++){
                let alarm = alarmArray[i];
                let fault = '';
                if(alarm['fault']){
                    fault = alarm['fault'].replace('\n','');
                }
                r_event.faults.push(fault);
                
            }
        }
        return events;
     }

    async queryEventById(eventId){
        let queryEventSql = 'SELECT * FROM R_Event WHERE event_id = ? ;';
        let events = await this.app.mysql.query(queryEventSql,[eventId]);
        let r_event = events[0];
        let jsonVarlist = JSON.parse(r_event.varlist);
        for(let key in jsonVarlist){
            r_event[key] = jsonVarlist[key];
        }
        if(r_event.start_time){
            let start_time = new Date(r_event.start_time);
            r_event.start_time =  start_time.getTime();
        }
        if(r_event.update_time){
            let update_time = new Date(r_event.update_time);
            r_event.update_time =  update_time.getTime();
        }
        if(r_event.cancel_time){
            let cancel_time = new Date(r_event.cancel_time);
            r_event.cancel_time =  cancel_time.getTime();
        }else{
            r_event.cancel_time = 0;
        }

        return r_event;
    }

    async queryEventStateById(eventId){
        let queryEsSql = 'SELECT e.* FROM Event_State e WHERE e.event_id = ?  GROUP BY e.state DESC';
        let es = await this.app.mysql.query(queryEsSql,[eventId]);
        return es;

    }

    async queryEventKeyinfoById(eventId , state){
        let queryEsSql = 'SELECT e.keyinfo FROM Event_State e WHERE e.event_id = ? AND  e.state = ? ORDER BY e.update_time DESC LIMIT 1;';
        let eventStates = await this.app.mysql.query(queryEsSql,[eventId, state]);
        let es = eventStates[0];
        let keyinfo = JSON.parse(es.keyinfo);
        let r_event = await this.queryEventById(eventId);
        for(let key in r_event){
            keyinfo[key] = r_event[key];
        }
        return keyinfo;

    }

    async queryEventSchedulProcess(event_id){
        let queryEsSql = 'SELECT e.keyinfo FROM Event_State e WHERE e.event_id = ? AND  e.state = ? ORDER BY e.update_time DESC LIMIT 1;';
        let eventStates = await this.app.mysql.query(queryEsSql,[event_id, 4]);
        let eventFlows = [];
        if(eventStates.length>0){
            let es = eventStates[0];
            let keyinfo = JSON.parse(es.keyinfo);
            eventFlows = keyinfo.eventFlows;
        }
        
        return eventFlows;
    }

    async updateEventSchedulProcess(event_id,index,key,value,updateTime){

        let eventFlows = await this.queryEventSchedulProcess(event_id);
        let newValue = {'key' : key,
                        'value' : value,
                        'updateTime' : updateTime};
        eventFlows[parseInt(index)] = newValue;
        let keyinfo = {'eventFlows' : eventFlows};
        let updateKeyinfoSql = 'UPDATE Event_State SET keyinfo =? ,update_time = ? WHERE event_id=? AND state = ? ;';
        await this.app.mysql.query(updateKeyinfoSql,[JSON.stringify(keyinfo),updateTime,event_id, 4]);
        return newValue;
    }

    async updateComplaintInfo(event_id,isComplaint,content){
        let queryEsSql = 'SELECT e.keyinfo FROM Event_State e WHERE e.event_id = ? AND  e.state = ? ORDER BY e.update_time DESC LIMIT 1;';
        let eventStates = await this.app.mysql.query(queryEsSql,[event_id, 5]);
        if(eventStates){
            let es = eventStates[0];
            let keyinfo = JSON.parse(es.keyinfo);
            if(!keyinfo){
                keyinfo = {};
            }
            keyinfo['isComplaint'] = isComplaint;
            keyinfo['content'] = content;
            let updateKeyinfoSql = 'UPDATE Event_State SET keyinfo =? ,update_time = NOW() WHERE event_id=? AND state = ? ;';
            await this.app.mysql.query(updateKeyinfoSql,[JSON.stringify(keyinfo),event_id, 5]);
        }else{
            let keyinfo = {'isComplaint' : isComplaint, 'content' : content};
            let insertKeyinfoSql = 'INSERT INTO Event_State (event_id,state,update_time,keyinfo) VALUES(?,?,NOW(),?)';
            await this.app.mysql.query(insertKeyinfoSql,event_id ,[JSON.stringify(keyinfo), 5]);
        }

    }

    async queryComplaintInfo(event_id){
        let queryEsSql = 'SELECT e.keyinfo FROM Event_State e WHERE e.event_id = ? AND  e.state = ? ORDER BY e.update_time DESC LIMIT 1;';
        let eventStates = await this.app.mysql.query(queryEsSql,[event_id, 5]);
        let keyinfo = {};
        if(eventStates){
            let es = eventStates[0];
            keyinfo = JSON.parse(es.keyinfo);
        }else {
            keyinfo.isComplaint = false;
            keyinfo.content = '';
        }
        return keyinfo;
    }

    async closeREvent(event_id){
        var params = {'event_id': event_id, 
        'state': '5.1F',
        'start_time':getCurrentTimestamp()};
        let closeREventSql = 'UPDATE R_Event SET  event_state =? ,update_time = NOW(), cancel_time = NOW() WHERE  event_id = ?';
        await this.app.mysql.query(closeREventSql,[5, event_id]);
        this.dataToBeanstalkd(params,'alarm_event');

    }

    async updateEmosState(event_id ,sheet_no){
        var params = {'event_id': event_id, 
        'state': '1.4F',
        'sheet_no' : sheet_no,
        'start_time':getCurrentTimestamp()};
        this.dataToBeanstalkd(params ,'alarm_event');
    }

    async dataToBeanstalkd(params ,tube) {
        var request = {'request':params} 
        var client = new fivebeans.client(beanstalkIp, beanstalkPort);
        await client.connect();
        await client.use(tube,function(err, tubename) {});
        var data = JSON.stringify(request);
        var id = await client.put(1, 0, data.length, data, function(err, jobid) {});
        client.destroy();
    }
    
};



function timestampToTime(timestamp) {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ?  '0'+date.getDate() : date.getDate())+ ' ';
    var h = (date.getHours() < 10 ?  '0'+date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes()  < 10 ?  '0'+date.getMinutes()  : date.getMinutes() ) + ':';
    var s = (date.getSeconds() < 10 ?  '0'+date.getSeconds()  :date.getSeconds() );
    return Y+M+D+h+m+s;
}
function getCurrentTimestamp() {
    
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ?  '0'+date.getDate() : date.getDate())+ ' ';
    var h = (date.getHours() < 10 ?  '0'+date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes()  < 10 ?  '0'+date.getMinutes()  : date.getMinutes() ) + ':';
    var s = (date.getSeconds() < 10 ?  '0'+date.getSeconds()  :date.getSeconds() );
    return Y+M+D+h+m+s;
}

module.exports = EventService;
