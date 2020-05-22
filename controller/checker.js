const exists = (statuses, status) => {
    statuses.some(exists => exists === status);
};

const checkStatus = (statuses, status) =>{
    if (exists(statuses, status)){
        return false;
    }
    else{
        return true;
    }
};

module.exports = checkStatus;