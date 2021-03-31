var dbConn = require("./dbConfig")

exports.getAllTask = async function () {
    try {
        query = `select * from user_task where task_status in ('ACTIVE','COMPLETED') order by created_date `
        params = []
        return await dbConn.queryHandler(query, params)
    } catch (error) {
        console.error("Error in getEventType service :", error)
        throw Error(error)
    }
}

exports.getUserTask = async function (id) {
    try {
        query = `select * from user_task where id = $1 `
        params = [id]
        return await dbConn.queryHandler(query, params)
    } catch (error) {
        console.error("Error in getEventType service :", error)
        throw Error(error)
    }
}


exports.addTask = async function (dataObj) {
    try {
        query = `insert into user_task(task_name,task_desc,created_by ,created_date, task_status) values ($1,$2,$3,$4,$5)`
        params = [dataObj.taskName ? dataObj.taskName : null, dataObj.taskDesc, dataObj.createdBy ? dataObj.createdBy : null, new Date(), 'ACTIVE']
        return await dbConn.queryHandler(query, params)
    } catch (error) {
        console.error("Error in addTask service :", error)
        throw Error(error)
    }
}


exports.updateTask = async function (dataObj) {
    try {
        if (dataObj.status.toUpperCase() == "DELETED") {
            query = `update user_task set task_status = (case when task_status <> 'COMPLETED' then $1 else null end), modified_by = $2,modified_date=$3 where id = $4 and task_status <> 'DELETED'`
        } else {
            query = `update user_task set task_status = $1 , modified_by = $2,modified_date=$3 where id = $4 and task_status <> 'DELETED'`
        }
        params = [dataObj.status.toUpperCase(), dataObj.modified_by, new Date(), dataObj.id]
        return await dbConn.queryHandler(query, params)
    } catch (error) {
        console.error("Error in addTask service :", error)
        throw Error(error)
    }
}

exports.filterTask = async function (dataObj) {
    try {
        query = `select * from user_task where task_status in ('ACTIVE','COMPLETED') and DATE(created_date) >= $1 and DATE(created_date) <= $2 order by created_date `
        params = [dataObj.startDate, dataObj.endDate]
        return await dbConn.queryHandler(query, params)
    } catch (error) {
        console.error("Error in getEventType service :", error)
        throw Error(error)
    }
}

