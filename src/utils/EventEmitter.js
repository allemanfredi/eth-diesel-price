
const EventEmitter = {
    
    events : {},
    
    emit(event, data){
        if (!this.events[event]) return;
        this.events[event].forEach( callback => callback(data));
    },
    
    on(event,callback){
        if (!this.events[event]) this.events[event] = []
        this.events[event].push(callback)
    }
}


module.exports = { EventEmitter }